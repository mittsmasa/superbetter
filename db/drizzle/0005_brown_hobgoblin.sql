ALTER TABLE `powerupHistory` DROP FOREIGN KEY `powerupHistory_powerupId_quest_id_fk`;
--> statement-breakpoint
ALTER TABLE `powerupHistory` ADD CONSTRAINT `powerupHistory_powerupId_powerup_id_fk` FOREIGN KEY (`powerupId`) REFERENCES `powerup`(`id`) ON DELETE cascade ON UPDATE no action;