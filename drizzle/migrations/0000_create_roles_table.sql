CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128),
	"description" varchar(2048),
	"can_create" boolean,
	"can_edit" boolean,
	"can_read" boolean,
	"can_remove" boolean,
	"created_at" timestamp,
	"updated_at" timestamp
);
