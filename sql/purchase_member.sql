-- DROP TABLE IF EXISTS `u1489690_flowers_app`.`purchase_member`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`purchase_member` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchase/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор закупки из purchase',
  `client/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор клиента из client',
  `purchase_content/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор позиции из purchase_content',
  `product/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор товара из product',
  `count` INT UNSIGNED NOT NULL COMMENT 'Количество заказал участник',
  `distributed` INT UNSIGNED NOT NULL COMMENT 'Количество получил участник',
  `cost` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Отпускная стоимость заказа',
  `paid` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Орплачено заказчиком',
  `torefound` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Сумма к возврату по заказу',
  `refounded` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Возвращено по заказу',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Участники закупки'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
  
-- ALTER TABLE `u1489690_flowers_app`.`purchase_member`
--   ADD `purchase_content/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор позиции из purchase_content'
--     AFTER contact_id;
    
-- ALTER TABLE `u1489690_flowers_app`.`purchase_content`
--   MODIFY `cost` INT 
--   as ((`count`, `purchase/id`, `id`))
--   COMMENT 'Остаток единиц товара';

drop procedure if exists updateCost;
DELIMITER $$
create procedure updateCost(in purchase_member_id int, in purchase_content_id int)
begin
	declare pmCount int;	#purchase_member.count
	declare pcPrice DECIMAL(20,2);	#purchase_content.sale_price
	declare pcShipping DECIMAL(20,2);	#purchase_content.shipping
	declare pmCost DECIMAL(20,2);	#purchase_member.cost
    
    select `count` 
		into pmCount 
        from `purchase_member` 
        where `purchase_member`.`id` = purchase_member_id;
    
    select `sale_price` 
		into pcPrice 
        from `purchase_content` 
        where `purchase_content`.`id` = purchase_content_id;

    select `shipping` 
		into pcShipping 
        from `purchase_content` 
        where `purchase_content`.`id` = purchase_content_id;

	set pmCost = (pmCount * (pcPrice + pcShipping));
    
    update `purchase_member`
		set `purchase_member`.`cost` = pmCost
        where `purchase_member`.`id` = purchase_member_id;
end$$
DELIMITER ;