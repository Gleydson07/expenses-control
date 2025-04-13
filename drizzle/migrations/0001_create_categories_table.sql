CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128),
	"description" varchar(2048),
	"created_at" timestamp,
	"updated_at" timestamp
);
