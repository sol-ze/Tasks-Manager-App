-- Create the new schema
CREATE SCHEMA IF NOT EXISTS `task_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Use the new schema
USE `task_manager`;

-- Create the task table
CREATE TABLE `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(250) DEFAULT NULL,
  `status` INT NOT NULL DEFAULT '0',
  `creation_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
