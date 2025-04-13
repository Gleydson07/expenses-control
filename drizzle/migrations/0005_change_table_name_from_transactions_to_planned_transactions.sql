ALTER TABLE "transactions" RENAME TO "planned_transactions";--> statement-breakpoint
ALTER TABLE "planned_transactions" DROP CONSTRAINT "transactions_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "planned_transactions" ADD CONSTRAINT "planned_transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;