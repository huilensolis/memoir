ALTER TABLE "entry" ADD COLUMN "data" text NOT NULL;--> statement-breakpoint
ALTER TABLE "entry" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "entry" DROP COLUMN IF EXISTS "word_count";--> statement-breakpoint
ALTER TABLE "entry" DROP COLUMN IF EXISTS "content";