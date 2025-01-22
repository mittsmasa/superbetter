ALTER TABLE `powerupHistory` RENAME COLUMN `questId` TO `powerupId`;--> statement-breakpoint
ALTER TABLE `powerupHistory` DROP FOREIGN KEY `powerupHistory_questId_quest_id_fk`;
--> statement-breakpoint
ALTER TABLE `powerupHistory` ADD CONSTRAINT `powerupHistory_powerupId_quest_id_fk` FOREIGN KEY (`powerupId`) REFERENCES `quest`(`id`) ON DELETE cascade ON UPDATE no action;