ALTER TABLE `session` MODIFY COLUMN `expires` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `account` ADD `id` varchar(36);--> statement-breakpoint
ALTER TABLE `account` ADD `refreshTokenExpiresAt` timestamp(3);--> statement-breakpoint
ALTER TABLE `account` ADD `password` text;--> statement-breakpoint
ALTER TABLE `account` ADD `createdAt` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `account` ADD `updatedAt` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `id` varchar(36);--> statement-breakpoint
ALTER TABLE `session` ADD `createdAt` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `updatedAt` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `ipAddress` text;--> statement-breakpoint
ALTER TABLE `session` ADD `userAgent` text;--> statement-breakpoint
ALTER TABLE `user` ADD `emailVerifiedTemp` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `verificationToken` ADD `id` varchar(36);--> statement-breakpoint
ALTER TABLE `verificationToken` ADD `createdAt` timestamp(3) DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `verificationToken` ADD `updatedAt` timestamp(3) DEFAULT (now()) NOT NULL;