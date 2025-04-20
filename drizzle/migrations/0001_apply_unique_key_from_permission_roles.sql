ALTER TABLE "managements" DROP CONSTRAINT "managements_cost_center_id_cost_centers_id_fk";
--> statement-breakpoint
ALTER TABLE "managements" ADD CONSTRAINT "managements_cost_center_id_cost_centers_id_fk" FOREIGN KEY ("cost_center_id") REFERENCES "public"."cost_centers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "un_roles_title_ccreate_cedit_cread_cremove" UNIQUE("can_create","can_edit","can_read","can_remove");