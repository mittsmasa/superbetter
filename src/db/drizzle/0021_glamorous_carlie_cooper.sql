ALTER TABLE `user` ADD `createdAt` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `updatedAt` timestamp(3) DEFAULT (now()) NOT NULL;