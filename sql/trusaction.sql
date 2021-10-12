DROP TABLE IF EXISTS `u1489690_flowers_app`.`transaction`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`transaction` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_owner` VARCHAR(255) NOT NULL COMMENT 'Идентификатор счета организатора',
  `value` DECIMAL(20,2) SIGNED NOT NULL COMMENT 'Сумма',
  `description` VARCHAR(3000) NULL COMMENT 'Комментарий к транзакции',
  `purchase_member/id` INT UNSIGNED DEFAULT NULL COMMENT 'Идентификатор записи таблицы Участники закупки',
  `client/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор клиента из client',
  `client_account` DECIMAL(20,2) SIGNED NOT NULL COMMENT 'Баланс клиента после транзакции',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Участники закупки'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
  

-- ALTER TABLE `u1489690_flowers_app`.`transaction`
  -- add `client_account` DECIMAL(20,2) SIGNED NOT NULL COMMENT 'Баланс клиента после транзакции';


drop procedure if exists addTransaction;
DELIMITER $$
create procedure addTransaction(
	in accountOwner varchar(255),
    in transactionValue DECIMAL(20,2),
    in purchase_member_id int,
    in description varchar(3000),
    in client_id int
)
begin
	declare oldClientAccount DECIMAL(20,2); # Значение баланса клиента до операции
	declare newClientAccount DECIMAL(20,2); # Значение баланса клиента после операции
    
    set oldClientAccount = (select `account` from `client` where `client`.`id` = client_id);
    set newClientAccount = oldClientAccount + transactionValue;
    
    update `client`
		set `client`.`account` = newClientAccount
        where `client`.`id` = client_id;
	
    insert into `transaction`
		(
			`account_owner`,
            `value`,
            `purchase_member/id`,
            `description`,
            `client/id`,
            `client_account`
        )
        values (
			accountOwner,
            transactionValue,
            purchase_member_id,
            description,
            client_id,
            newClientAccount
        );
end$$
DELIMITER ;