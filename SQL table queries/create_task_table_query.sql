CREATE TABLE IF NOT EXISTS `kanban_web_app`.`task` (
  `task_id` VARCHAR(50) NOT NULL,
  `task_name` VARCHAR(45) NULL DEFAULT NULL,
  `task_description` TEXT NULL DEFAULT NULL,
  `task_notes` TEXT NULL DEFAULT NULL,
  `task_app_acronym` CHAR(50) NULL DEFAULT NULL,
  `task_state` VARCHAR(45) NULL DEFAULT NULL,
  `task_creator` VARCHAR(45) NULL DEFAULT NULL,
  `task_owner` VARCHAR(45) NULL DEFAULT NULL,
  `task_createDate` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`task_id`))
ENGINE = InnoDB