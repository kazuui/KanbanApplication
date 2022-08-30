CREATE TABLE IF NOT EXISTS `kanban_web_app`.`plan` (
  `plan_MVP_name` VARCHAR(45) NOT NULL,
  `plan_startDate` DATE NULL DEFAULT NULL,
  `plan_endDate` DATE NULL DEFAULT NULL,
  `plan_app_acronym` CHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`plan_MVP_name`))
ENGINE = InnoDB