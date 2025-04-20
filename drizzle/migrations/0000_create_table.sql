CREATE TYPE "public"."planned_transaction_type" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TYPE "public"."reference_months_status" AS ENUM('PLANNING', 'IN_PROGRESS', 'FINALIZED', 'CLOSED');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('PENDING', 'SCHEDULED', 'PAID', 'PARTIALLY_PAID', 'OVERDUE', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128),
	"description" varchar(2048),
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "categories_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "cost_centers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128),
	"owner_user_id" integer,
	"description" varchar(2048),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "cost_centers_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "managements" (
	"cost_center_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "managements_cost_center_id_role_id_user_id_pk" PRIMARY KEY("cost_center_id","role_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "planned_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"title" varchar(128),
	"description" varchar(2048),
	"type" "planned_transaction_type" NOT NULL,
	"estimated_value" numeric(9, 2) DEFAULT '0',
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "reference_months" (
	"id" serial PRIMARY KEY NOT NULL,
	"cost_center_id" integer NOT NULL,
	"status" "reference_months_status" NOT NULL,
	"expenses_total_value" numeric(12, 2) DEFAULT '0',
	"incomes_total_value" numeric(12, 2) DEFAULT '0',
	"balance" numeric(12, 2) GENERATED ALWAYS AS (incomes_total_value - expenses_total_value) STORED,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"notes" varchar,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "un_reference_months_cost_center_id_month_year" UNIQUE("cost_center_id","month","year"),
	CONSTRAINT "month_range_check" CHECK (month >= 1 AND month <= 12)
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128),
	"description" varchar(2048),
	"can_create" boolean,
	"can_edit" boolean,
	"can_read" boolean,
	"can_remove" boolean,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "roles_title_unique" UNIQUE("title"),
	CONSTRAINT "un_roles_title_ccreate_cedit_cread_cremove" UNIQUE("can_create","can_edit","can_read","can_remove")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference_month_id" integer NOT NULL,
	"planned_transaction_id" integer NOT NULL,
	"status" "transaction_status" NOT NULL,
	"value" numeric(9, 2) DEFAULT '0',
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "managements" ADD CONSTRAINT "managements_cost_center_id_cost_centers_id_fk" FOREIGN KEY ("cost_center_id") REFERENCES "public"."cost_centers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managements" ADD CONSTRAINT "managements_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planned_transactions" ADD CONSTRAINT "planned_transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reference_months" ADD CONSTRAINT "reference_months_cost_center_id_cost_centers_id_fk" FOREIGN KEY ("cost_center_id") REFERENCES "public"."cost_centers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_reference_month_id_reference_months_id_fk" FOREIGN KEY ("reference_month_id") REFERENCES "public"."reference_months"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_planned_transaction_id_transactions_id_fk" FOREIGN KEY ("planned_transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;