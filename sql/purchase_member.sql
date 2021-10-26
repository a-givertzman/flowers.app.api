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

select * from purchaseMemberView where `purchase/id` like '1';
select getPurchaseMemberCost(1, 25, 4);



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
	return cost;
end$$
DELIMITER ;



drop procedure if exists transferPurchaseMemberPayment;
DELIMITER $$
create procedure transferPurchaseMemberPayment(
	in purchase_id int,
    in purchase_content_id json	-- массив id, по которым проводим оплату
)
begin
    declare pmId, clientId, pcId int;
    declare pmCount int;
    declare clientAccount, pmCost, pmPaid, toPay, paymentValue DECIMAL(20,2); 
    declare done int default false;

    # получаем все записи из purchase_member, которые содержат purchase_content_id
    # для них проводим оплату
    declare cursorPurchaseMember cursor for
		select
			`id`,
			`client/id`,
            `purchase_content/id`,
			`count`,
			`paid`
		from `purchase_member`
        where `purchase_member`.`purchase/id` = purchase_id
		and json_contains(purchase_content_id, concat(`purchase_content/id`));

    declare continue handler for not found set done = true;

    declare exit handler for sqlexception
		begin
			get diagnostics condition 1
			@errorMessage = message_text;
			select @errorMessage;
			rollback;
		end;
    
	start transaction;
		call debug_msg('start transaction');
		open cursorPurchaseMember;
			call debug_msg('cursorPurchaseMember opened');
			loop_purchase_member_rows: loop
				call debug_msg('try to fetch cursorPurchaseMember');
				fetch cursorPurchaseMember into pmId, clientId, pcId, pmCount, pmPaid;
				if done then
					leave loop_purchase_member_rows;
				end if;
                call debug_msg(concat('cursorPurchaseMember pmId: ', pmId));
                call debug_msg(concat('cursorPurchaseMember clientId: ', clientId));
                call debug_msg(concat('cursorPurchaseMember count: ', pmCount));
                call debug_msg(concat('cursorPurchaseMember paid: ', pmPaid));

                set pmCost = (select getPurchaseMemberCost(purchase_id, pcId, pmCount));
                call debug_msg(concat('cursorPurchaseMember cost: ', pmCost));

				if pmCost > pmPaid then
					set toPay = pmCost - pmPaid;
                    call debug_msg(concat('toPya: ', toPay));
                    
                    # проверяем баланс клиента
                    set clientAccount = (select `account` from `client` where `client`.`id` = clientId);
                    call debug_msg(concat('clientAccount: ', clientAccount));
                    
                    if clientAccount > 0 then
						if clientAccount < toPay then
							set paymentValue = clientAccount;
						else 
							set paymentValue = toPay;
                        end if;

						# делаем оплату
						update `purchase_member`
							set `purchase_member`.`paid` = (`purchase_member`.`paid` + paymentValue)
							where `purchase_member`.`id` = pmId;
						
						# обновляем баланс клиента после оплаты
						update `client`
							set `client`.`account` = (`client`.`account` - toPay)
							where `client`.`id` = clientId;
						
                        # добавляем транзакцию
						insert into `transaction` (
								`account_owner`,
								`value`,
								`purchase_member/id`,
								`description`,
								`client/id`,
								`client_account`
							)
							values (
								'',
								paymentValue,
								pmId,
								concat(						# description
									'Закупка: ',
                                    (select concat('[', `id`, '] ', `name`) from `purchase` where `purchase`.`id` = purchase_id),
                                    '; Товар: ',
                                    (select concat('[', `product/id`, '] ', `product/name`, ' (', `cost`, 'x', `count`, ')') from `purchaseMemberView` where `id` = pmId)
								),			
								clientId,
								(select `account` from `client` where `client`.`id` = clientId)
							);

					end if;
				end if;
			end loop loop_purchase_member_rows;
            call debug_msg('loop finished');
		close cursorPurchaseMember;
		call debug_msg('cursor closed');
        
	commit;
	select 0;
	call debug_msg('transaction commited');
end$$
DELIMITER ;

select getPurchaseMemberCost(1, 25, 7);

select json_extract('["operator","where","field","purchase/id","cond","=","value","1"]', concat('$[',2,']'));

select json_extract('["operator","where","field","purchase/id","cond","=","value","1"]', '');

select * from `purchase_member` where json_contains("[24,25]", concat(`purchase_content/id`));


drop procedure if exists transferPurchaseMemberRefound;
DELIMITER $$
CREATE PROCEDURE transferPurchaseMemberRefound(
	in purchase_id int,
    in purchase_content_id json	-- массив id, по которым проводим оплату
)
BEGIN
    declare pmId, clientId, pcId int;
    declare clientAccount, pmToRefound, pmRefounded, refoundValue DECIMAL(20,2); 
    declare done int default false;

    # получаем все записи из purchase_member, которые содержат purchase_content_id
    # для них проводим оплату
    declare cursorPurchaseMember cursor for
		select
			`id`,
			`client/id`,
            `purchase_content/id`,
			`torefound`,
			`refounded`
		from `purchase_member`
        where `purchase_member`.`purchase/id` = purchase_id;
		#and json_contains(purchase_content_id, concat(`purchase_content/id`));

    declare continue handler for not found set done = true;

    declare exit handler for sqlexception
		begin
			get diagnostics condition 1
			@errorMessage = message_text;
			select @errorMessage;
			rollback;
		end;
    
	start transaction;
		# call debug_msg('start transaction');
		open cursorPurchaseMember;
			# call debug_msg('cursorPurchaseMember opened');
			loop_purchase_member_rows: loop
				# call debug_msg('try to fetch cursorPurchaseMember');
				fetch cursorPurchaseMember into pmId, clientId, pcId, pmToRefound, pmRefounded;
				if done then
					leave loop_purchase_member_rows;
				end if;

				# смотрим есть ли сумма к возврату
				if pmToRefound > pmRefounded then
					set refoundValue = pmToRefound - pmRefounded;
                    # call debug_msg(concat('refoundValue: ', refoundValue));
                    
                    # проверяем баланс клиента
                    set clientAccount = (select `account` from `client` where `client`.`id` = clientId);
                    # call debug_msg(concat('clientAccount: ', clientAccount));
                    
					# делаем оплату
					update `purchase_member`
						set `purchase_member`.`refounded` = (`purchase_member`.`refounded` + refoundValue)
						where `purchase_member`.`id` = pmId;
					
					# обновляем баланс клиента после оплаты
					update `client`
						set `client`.`account` = (`client`.`account` + refoundValue)
						where `client`.`id` = clientId;
					
					# добавляем транзакцию
					insert into `transaction` (
							`account_owner`,
							`value`,
							`purchase_member/id`,
							`description`,
							`client/id`,
							`client_account`
						)
						values (
							'',
							refoundValue,
							pmId,
							concat(						# description
								'ВОЗВРАТ. Закупка: ',
								(select concat('[', `id`, '] ', `name`) from `purchase` where `purchase`.`id` = purchase_id),
								'; Товар: ',
								(select concat('[', `product/id`, '] ', `product/name`, ' (', `cost`, 'x', `count`, ')') from `purchaseMemberView` where `id` = pmId)
							),			
							clientId,
							(select `account` from `client` where `client`.`id` = clientId)
						);
				end if;
			end loop loop_purchase_member_rows;
            # call debug_msg('loop finished');
		close cursorPurchaseMember;
		# call debug_msg('cursor closed');
        
	commit;
	select 0;
	# call debug_msg('transaction commited');
end$$
DELIMITER ;
