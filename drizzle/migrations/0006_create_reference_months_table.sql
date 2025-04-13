CREATE TYPE "public"."reference_month_status" AS ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CLOSED');--> statement-breakpoint
ALTER TYPE "public"."transaction_type" RENAME TO "planned_transaction_type";--> statement-breakpoint
CREATE TABLE "reference_month" (
	"id" serial PRIMARY KEY NOT NULL,
	"cost_center_id" integer NOT NULL,
	"status" "reference_month_status" NOT NULL,
	"expenses_total_value" numeric(12, 2) DEFAULT '0',
	"incomes_total_value" numeric(12, 2) DEFAULT '0',
	"month" timestamp,
	"year" timestamp,
	"notes" varchar,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "reference_month" ADD CONSTRAINT "reference_month_cost_center_id_cost_centers_id_fk" FOREIGN KEY ("cost_center_id") REFERENCES "public"."cost_centers"("id") ON DELETE no action ON UPDATE no action;