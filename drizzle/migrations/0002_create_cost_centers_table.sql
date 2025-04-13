CREATE TABLE "cost_centers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128),
	"description" varchar(2048),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp,
	"updated_at" timestamp
);
