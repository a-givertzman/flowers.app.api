DROP TABLE IF EXISTS `u1489690_flowers_app`.`transaction`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`transaction` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_owner` VARCHAR(255) NOT NULL COMMENT 'Идентификатор счета организатора',
  `value` DECIMAL(20,2) SIGNED NOT NULL COMMENT 'Сумма',
  `description` VARCHAR(3000) NULL COMMENT 'Комментарий к транзакции',
  `purchase_member/id` INT UNSIGNED DEFAULT NULL COMMENT 'Идентификатор записи таблицы Участники закупки',
  `client/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор клиента из client',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Участники закупки'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;