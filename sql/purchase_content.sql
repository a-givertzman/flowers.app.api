DROP TABLE IF EXISTS `u1489690_flowers_app`.`purchase_content`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`purchase_content` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchase/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор закупки из purchase_list',
  `product/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор товара из product',
  `sale_price` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Отпускная цена за единицу',
  `sale_currency`  VARCHAR(3) NOT NULL COMMENT 'Валюта продажи',
  `shipping`  VARCHAR(3) NOT NULL COMMENT 'Транспотрные расходы',
  `count` INT UNSIGNED NOT NULL COMMENT 'Количество единиц товара в закупке',
  `remains` INT UNSIGNED NOT NULL COMMENT 'Остаток единиц товара',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Список закупок'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
  
