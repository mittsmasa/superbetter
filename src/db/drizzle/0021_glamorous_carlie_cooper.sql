ALTER TABLE `user` ADD `createdAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `updatedAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL;