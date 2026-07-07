CREATE TYPE "public"."todo_list_todo_status" AS ENUM('backlog', 'in_progress', 'completed');--> statement-breakpoint
ALTER TABLE "todo_list_todo" ADD COLUMN "status" "todo_list_todo_status" DEFAULT 'backlog' NOT NULL;--> statement-breakpoint
UPDATE "todo_list_todo" SET "status" = 'completed' WHERE "isCompleted" = true;--> statement-breakpoint
CREATE INDEX "todo_status_idx" ON "todo_list_todo" USING btree ("status");
