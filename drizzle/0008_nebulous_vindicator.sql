ALTER TABLE "events" ADD COLUMN "updated_at" timestamp DEFAULT 'now()';--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "created_at";