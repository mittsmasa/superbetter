ALTER TABLE `epicwin` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `epicwin` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `missionCondition` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `missionCondition` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `mission` MODIFY COLUMN `deadline` datetime(3);--> statement-breakpoint
ALTER TABLE `mission` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `mission` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `powerupHistory` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `powerupHistory` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `powerup` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `powerup` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `quest` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `quest` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `villain` MODIFY COLUMN `createdAt` datetime(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `villain` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL;