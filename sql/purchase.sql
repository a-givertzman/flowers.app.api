DROP TABLE IF EXISTS `u1489690_flowers_app`.`purchase`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`purchase` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL COMMENT 'Нименование закупки',
  `details` VARCHAR(255) NULL COMMENT 'Детали',
  `status` VARCHAR(20) NOT NULL COMMENT 'Статус',
  `date_of_start` DATE NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата объявления',
  `date_of_end` DATE NULL DEFAULT NULL COMMENT 'Дата закрытия',
  `description` VARCHAR(3000) NULL COMMENT 'Описание закупки',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Список закупок'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;