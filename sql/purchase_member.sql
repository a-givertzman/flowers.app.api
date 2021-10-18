-- DROP TABLE IF EXISTS `u1489690_flowers_app`.`purchase_member`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`purchase_member` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchase/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор закупки из purchase',
  `client/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор клиента из client',
  `purchase_content/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор позиции из purchase_content',
  `product/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор товара из product',
  `count` INT UNSIGNED NOT NULL COMMENT 'Количество заказал участник',
  `distributed` INT UNSIGNED NOT NULL COMMENT 'Количество получил участник',
  #`cost` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Отпускная стоимость заказа',
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
    
ALTER TABLE `u1489690_flowers_app`.`purchase_member`
  MODIFY `cost` DECIMAL(20,2)
  GENERATED ALWAYS as (purchaseMemberCost(`purchase_member`.`purchase/id`, `purchase_member`.`purchase_content/id`, `purchase_member`.`count`))
  COMMENT 'Отпускная стоимость заказа';


create or replace
	view purchaseMemberView as 
		SELECT
			`purchase_member`.`id`,
			`purchase_member`.`count`,
			`purchase_member`.`distributed`,
			`purchase_member`.`paid`,
			`purchase_member`.`torefound`,
			`purchase_member`.`refounded`,
			`purchase_member`.`purchase/id`,
            `purchase_member`.`purchase_content/id`,
			`client`.`id` as 'client/id',
			`client`.`group` as 'client/group',
			`client`.`name` as 'client/name',
			`client`.`phone` as 'client/phone',
			`client`.`account` as 'client/account',
			`product`.`id` as 'product/id',
			`product`.`group` as 'product/group',
			`product`.`name` as 'product/name',
			`product`.`primary_price` as 'product/primary_price',
			`product`.`primary_currency` as 'product/primary_currency',
			`product`.`order_quantity` as 'product/order_quantity',
			`purchase_content`.`sale_price` as 'purchase_content/sale_price',
			`purchase_content`.`sale_currency` as 'purchase_content/sale_currency',
			`purchase_content`.`shipping` as 'purchase_content/shipping',
			getPurchaseMemberCost(`purchase_member`.`purchase/id`, `purchase_member`.`purchase_content/id`, `purchase_member`.`count`) as `cost`
		FROM `purchase_member`
		LEFT JOIN  `client` ON `purchase_member`.`client/id` = `client`.`id`
		LEFT JOIN  `purchase_content` ON `purchase_member`.`purchase_content/id` = `purchase_content`.`id`
		LEFT JOIN  `product` ON `purchase_member`.`product/id` = `product`.`id`
		#where `purchase_member`.`purchase/id` like '1'
		ORDER BY `purchase_member`.`id` ASC;

select * from purchaseMemberView where `purchase/id` = 1;
select getPurchaseMemberCost(1, 24, 11);



drop function if exists getPurchaseMemberCost;
DELIMITER $$
create function getPurchaseMemberCost(
	purchase_id int,
	purchase_content_id int,
    count int
)
returns DECIMAL(20,2) deterministic
begin            
	declare cost DECIMAL(20,2);
    declare purchase_content_price DECIMAL(20,2);	#purchase_content.sale_price
    declare purchase_content_shipping DECIMAL(20,2);	#purchase_content.shipping
    set purchase_content_price = (select `purchase_content`.`sale_price` from `purchase_content` where `purchase_content`.`id` = purchase_content_id);
    set purchase_content_shipping = (select `purchase_content`.`shipping` from `purchase_content` where `purchase_content`.`id` = purchase_content_id);
	set cost = count * (purchase_content_price + purchase_content_shipping);
	return coast;
end$$
DELIMITER ;
