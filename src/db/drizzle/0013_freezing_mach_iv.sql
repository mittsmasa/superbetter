ALTER TABLE `villainHistory` DROP FOREIGN KEY `villainHistory_villainId_quest_id_fk`;
--> statement-breakpoint
ALTER TABLE `villainHistory` ADD CONSTRAINT `villainHistory_villainId_villain_id_fk` FOREIGN KEY (`villainId`) REFERENCES `villain`(`id`) ON DELETE cascade ON UPDATE no action;