ALTER TABLE "eventCustomers" ADD COLUMN "hidden" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "eventCoordinates" varchar(100);