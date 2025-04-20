CREATE TYPE "public"."financial_plan_type" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TYPE "public"."reference_months_status" AS ENUM('PLANNING', 'OPENED', 'CLOSED');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('PLANNING', 'SCHEDULED', 'PAID');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128) NOT NULL,
	"description" varchar(2048),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "cost_centers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128) NOT NULL,
	"owner_user_id" integer NOT NULL,
	"description" varchar(2048),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "un_cost_centers_title_owner_user_id" UNIQUE("title","owner_user_id")
);
--> statement-breakpoint
CREATE TABLE "financial_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"title" varchar(128) NOT NULL,
	"description" varchar(2048),
	"type" "financial_plan_type" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "financial_plans_title_unique" UNIQUE("title")
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
CREATE TABLE "reference_months" (
	"id" serial PRIMARY KEY NOT NULL,
	"cost_center_id" integer NOT NULL,
	"status" "reference_months_status" NOT NULL,
	"expenses_total_value" numeric(12, 2) DEFAULT '0',
	"incomes_total_value" numeric(12, 2) DEFAULT '0',
	"balance" numeric(12, 2) GENERATED ALWAYS AS (incomes_total_value - expenses_total_value) STORED,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"notes" varchar(8000),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "un_reference_months_cost_center_id_month_year" UNIQUE("cost_center_id","month","year"),
	CONSTRAINT "month_range_check" CHECK (month >= 1 AND month <= 12)
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128) NOT NULL,
	"description" varchar(2048),
	"can_create" boolean DEFAULT false,
	"can_edit" boolean DEFAULT false,
	"can_read" boolean DEFAULT false,
	"can_remove" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_title_unique" UNIQUE("title"),
	CONSTRAINT "un_roles_title_ccreate_cedit_cread_cremove" UNIQUE("can_create","can_edit","can_read","can_remove")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference_month_id" integer NOT NULL,
	"financial_plan_id" integer NOT NULL,
	"status" "transaction_status" NOT NULL,
	"estimated_value" numeric(9, 2) DEFAULT '0',
	"value" numeric(9, 2) DEFAULT '0',
	"payment_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "financial_plans" ADD CONSTRAINT "financial_plans_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managements" ADD CONSTRAINT "managements_cost_center_id_cost_centers_id_fk" FOREIGN KEY ("cost_center_id") REFERENCES "public"."cost_centers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managements" ADD CONSTRAINT "managements_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reference_months" ADD CONSTRAINT "reference_months_cost_center_id_cost_centers_id_fk" FOREIGN KEY ("cost_center_id") REFERENCES "public"."cost_centers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_reference_month_id_reference_months_id_fk" FOREIGN KEY ("reference_month_id") REFERENCES "public"."reference_months"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_financial_plan_id_financial_plans_id_fk" FOREIGN KEY ("financial_plan_id") REFERENCES "public"."financial_plans"("id") ON DELETE cascade ON UPDATE no action;