CREATE TABLE IF NOT EXISTS `kanban_web_app`.`application` (
  `app_acronym` VARCHAR(50) NOT NULL,
  `app_description` LONGTEXT NULL DEFAULT NULL,
  `app_Rnumber` INT NULL DEFAULT NULL,
  `app_startDate` DATE NULL DEFAULT NULL,
  `app_endDate` DATE NULL DEFAULT NULL,
  `app_permit_open` VARCHAR(50) NULL DEFAULT NULL,
  `app_permit_toDoList` VARCHAR(50) NULL DEFAULT NULL,
  `app_permit_doing` VARCHAR(50) NULL DEFAULT NULL,
  `app_permit_done` VARCHAR(50) NULL DEFAULT NULL,
  `app_permit_create` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`app_acronym`))
ENGINE = InnoDB