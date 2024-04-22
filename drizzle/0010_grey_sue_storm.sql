CREATE TABLE IF NOT EXISTS "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT 'uuid_generate_v4()',
	"ticketToken" varchar(255),
	"rating" numeric,
	"feedback" text,
	CONSTRAINT "ratings_uuid_unique" UNIQUE("uuid")
);
