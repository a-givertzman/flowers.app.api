CREATE DATABASE  IF NOT EXISTS `u1489690_flowers_app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `u1489690_flowers_app`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: server71.hosting.reg.ru    Database: u1489690_flowers_app
-- ------------------------------------------------------
-- Server version	5.7.27-30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(16) COLLATE utf8_bin NOT NULL COMMENT 'Признак группировки',
  `location` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '-' COMMENT 'Город или адрес',
  `name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'ФИО Участника',
  `phone` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'Номер телефона клиента',
  `account` decimal(20,2) NOT NULL COMMENT 'Остаток денег на балансе пользователя',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=878 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Участники закупок';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `clientTransactionView`
--

DROP TABLE IF EXISTS `clientTransactionView`;
/*!50001 DROP VIEW IF EXISTS `clientTransactionView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `clientTransactionView` AS SELECT 
 1 AS `id`,
 1 AS `date`,
 1 AS `account_owner`,
 1 AS `value`,
 1 AS `description`,
 1 AS `client/id`,
 1 AS `client_account`,
 1 AS `purchase_member/id`,
 1 AS `purchase_content/id`,
 1 AS `product/id`,
 1 AS `purchase/id`,
 1 AS `purchase/name`,
 1 AS `product/name`,
 1 AS `client/name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `debug_log`
--

DROP TABLE IF EXISTS `debug_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debug_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `msg` varchar(3000) COLLATE utf8_bin DEFAULT NULL COMMENT 'Комментарий',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=359 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Участники закупки';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(50) COLLATE utf8_bin NOT NULL COMMENT 'Признак группировки',
  `name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'Нименование товара',
  `detales` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT 'Комментарий',
  `primary_price` decimal(20,2) unsigned NOT NULL COMMENT 'Цена за единицу в валюте заккупки',
  `primary_currency` varchar(3) COLLATE utf8_bin NOT NULL COMMENT 'Валюта закупки',
  `primary_order_quantity` int(10) unsigned NOT NULL COMMENT 'Квант заказа у постовщика',
  `order_quantity` int(10) unsigned NOT NULL COMMENT 'Квант заказа для участников',
  `picture` varchar(2100) COLLATE utf8_bin DEFAULT NULL COMMENT 'Ссылка на изображение товара',
  `description` varchar(3000) COLLATE utf8_bin DEFAULT NULL COMMENT 'Описание товара',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1194 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Товары закупок';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'Нименование закупки',
  `details` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT 'Детали',
  `status` varchar(20) COLLATE utf8_bin NOT NULL COMMENT 'Статус',
  `date_of_start` date DEFAULT NULL,
  `date_of_end` date DEFAULT NULL,
  `description` varchar(3000) COLLATE utf8_bin DEFAULT NULL COMMENT 'Описание закупки',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Список закупок';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `purchaseContentView`
--

DROP TABLE IF EXISTS `purchaseContentView`;
/*!50001 DROP VIEW IF EXISTS `purchaseContentView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `purchaseContentView` AS SELECT 
 1 AS `purchase/id`,
 1 AS `id`,
 1 AS `sale_price`,
 1 AS `sale_currency`,
 1 AS `shipping`,
 1 AS `count`,
 1 AS `product/id`,
 1 AS `product/group`,
 1 AS `product/name`,
 1 AS `product/detales`,
 1 AS `product/primary_price`,
 1 AS `product/primary_currency`,
 1 AS `product/primary_order_quantity`,
 1 AS `product/order_quantity`,
 1 AS `remains`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `purchaseMemberView`
--

DROP TABLE IF EXISTS `purchaseMemberView`;
/*!50001 DROP VIEW IF EXISTS `purchaseMemberView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `purchaseMemberView` AS SELECT 
 1 AS `id`,
 1 AS `count`,
 1 AS `distributed`,
 1 AS `paid`,
 1 AS `torefound`,
 1 AS `refounded`,
 1 AS `purchase/id`,
 1 AS `purchase_content/id`,
 1 AS `client/id`,
 1 AS `client/group`,
 1 AS `client/name`,
 1 AS `client/phone`,
 1 AS `client/account`,
 1 AS `product/id`,
 1 AS `product/group`,
 1 AS `product/name`,
 1 AS `product/primary_price`,
 1 AS `product/primary_currency`,
 1 AS `product/order_quantity`,
 1 AS `purchase_content/sale_price`,
 1 AS `purchase_content/sale_currency`,
 1 AS `purchase_content/shipping`,
 1 AS `purchase/name`,
 1 AS `purchase/details`,
 1 AS `cost`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `purchase_content`
--

DROP TABLE IF EXISTS `purchase_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_content` (
  `id` int(10) unsigned NOT NULL,
  `purchase/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор закупки из purchase_list',
  `product/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор товара из product',
  `sale_price` decimal(20,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'Отпускная цена за единицу',
  `sale_currency` varchar(3) COLLATE utf8_bin NOT NULL DEFAULT 'RUB' COMMENT 'Валюта продажи',
  `shipping` varchar(3) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT 'Транспотрные расходы',
  `count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Количество единиц товара в закупке',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Список закупок';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase_member`
--

DROP TABLE IF EXISTS `purchase_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `purchase/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор закупки из purchase',
  `client/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор клиента из client',
  `purchase_content/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор позиции из purchase_content',
  `product/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор товара из product',
  `count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Количество заказал участник',
  `distributed` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Количество получил участник',
  `paid` decimal(20,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'Орплачено заказчиком',
  `torefound` decimal(20,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'Сумма к возврату по заказу',
  `refounded` decimal(20,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'Возвращено по заказу',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Участники закупки';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_owner` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'Идентификатор счета организатора',
  `value` decimal(20,2) NOT NULL COMMENT 'Сумма',
  `description` varchar(3000) COLLATE utf8_bin DEFAULT NULL COMMENT 'Комментарий к транзакции',
  `purchase_member/id` int(10) unsigned DEFAULT NULL COMMENT 'Идентификатор записи таблицы Участники закупки',
  `client/id` int(10) unsigned NOT NULL COMMENT 'Идентификактор клиента из client',
  `client_account` decimal(20,2) NOT NULL COMMENT 'Баланс клиента после транзакции',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Участники закупки';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'u1489690_flowers_app'
--

--
-- Dumping routines for database 'u1489690_flowers_app'
--
/*!50003 DROP FUNCTION IF EXISTS `getPurchaseMemberCost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` FUNCTION `getPurchaseMemberCost`(
	purchase_id int,
	purchase_content_id int,
    count int
) RETURNS decimal(20,2)
    DETERMINISTIC
begin            
	declare cost DECIMAL(20,2);
    declare purchase_content_price DECIMAL(20,2);	#purchase_content.sale_price
    declare purchase_content_shipping DECIMAL(20,2);	#purchase_content.shipping
    set purchase_content_price = ifnull(
		(select `purchase_content`.`sale_price` from `purchase_content` where `purchase_content`.`id` = purchase_content_id),
        0
    );
    set purchase_content_shipping = ifnull(
		(select `purchase_content`.`shipping` from `purchase_content` where `purchase_content`.`id` = purchase_content_id),
        0
	);
	set cost = ifnull(count, 0) * (purchase_content_price + purchase_content_shipping);
	return cost;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getRemains` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` FUNCTION `getRemains`(
	purchase_id int,
	purchase_content_id int,
    purchase_content_count int
) RETURNS int(11)
begin      
	declare purchase_member_count int;
    set purchase_member_count = ifnull((
		select sum(`count`)
			from `purchase_member`
			where `purchase/id` = purchase_id
			and `purchase_content/id` = purchase_content_id
	), 0);
	return purchase_content_count - purchase_member_count;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `viewParams` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` FUNCTION `viewParams`() RETURNS json
return @viewParams ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addTransaction` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` PROCEDURE `addTransaction`(
	in accountOwner varchar(255),
    in transactionValue DECIMAL(20,2),
    in purchase_member_id int,
    in description varchar(3000),
    in client_id int
)
begin
	declare oldClientAccount DECIMAL(20,2); # Значение баланса клиента до операции
	declare newClientAccount DECIMAL(20,2); # Значение баланса клиента после операции
	#declare errorMessage varchar(255);

    declare exit handler for sqlexception
    begin
		get diagnostics condition 1
		@errorMessage = message_text;
		select @errorMessage;
		rollback;
    end;
    start transaction;

		set oldClientAccount = (select `account` from `client` where `client`.`id` = client_id);
		set newClientAccount = oldClientAccount + transactionValue;
		
		update `client`
			set `client`.`account` = newClientAccount
			where `client`.`id` = client_id;
		
		insert into `transaction` (
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
		commit;
        select 0;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `debug_msg` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` PROCEDURE `debug_msg`(message VARCHAR(3000))
BEGIN
	insert into `debug_log` (`msg`) values (message);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `transferPurchaseMemberPayment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` PROCEDURE `transferPurchaseMemberPayment`(
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
		# call debug_msg('start transaction');
		open cursorPurchaseMember;
			# call debug_msg('cursorPurchaseMember opened');
			loop_purchase_member_rows: loop
				# call debug_msg('try to fetch cursorPurchaseMember');
				fetch cursorPurchaseMember into pmId, clientId, pcId, pmCount, pmPaid;
				if done then
					leave loop_purchase_member_rows;
				end if;
                # call debug_msg(concat('cursorPurchaseMember pmId: ', pmId));
                # call debug_msg(concat('cursorPurchaseMember clientId: ', clientId));
                # call debug_msg(concat('cursorPurchaseMember count: ', pmCount));
                # call debug_msg(concat('cursorPurchaseMember paid: ', pmPaid));

                set pmCost = (select getPurchaseMemberCost(purchase_id, pcId, pmCount));
                # call debug_msg(concat('cursorPurchaseMember cost: ', pmCost));

				if pmCost > pmPaid then
					set toPay = pmCost - pmPaid;
                    # call debug_msg(concat('toPya: ', toPay));
                    
                    # проверяем баланс клиента
                    set clientAccount = (select `account` from `client` where `client`.`id` = clientId);
                    # call debug_msg(concat('clientAccount: ', clientAccount));
                    
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
            # call debug_msg('loop finished');
		close cursorPurchaseMember;
		# call debug_msg('cursor closed');
        
	commit;
	select 0;
	# call debug_msg('transaction commited');
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updatePurchaseMemberCost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` PROCEDURE `updatePurchaseMemberCost`(
	in purchase_id int,
	in purchase_content_id int,
    in purchase_content_price DECIMAL(20,2),	#purchase_content.sale_price
    in purchase_content_shipping DECIMAL(20,2)	#purchase_content.shipping
)
begin                  
	update `purchase_member`
		set `purchase_member`.`cost` = `purchase_member`.`count` * (purchase_content_price + purchase_content_shipping)
        where `purchase_member`.`purchase/id` = purchase_id
        and `purchase_content/id` = purchase_content_id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateRemains` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u1489690_flapp`@`%` PROCEDURE `updateRemains`(in purchase_id int, in purchase_content_id int)
begin
	declare pCount int;	#purchase_content.count
	declare newRemains int;	#purchase_member.remains
    
    select `count` 
		into pCount 
        from `purchase_content` 
        where `purchase_content`.`id` = purchase_content_id;
    
	set newRemains = (pCount - (select sum(`count`)
	from `purchase_member`
	where `purchase/id` = purchase_id
	and `purchase_content/id` = purchase_content_id));
    
    update `purchase_content`
		set `purchase_content`.remains = newRemains
        where `purchase_content`.`id` = purchase_content_id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `clientTransactionView`
--

/*!50001 DROP VIEW IF EXISTS `clientTransactionView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u1489690_flapp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `clientTransactionView` AS select `transaction`.`id` AS `id`,`transaction`.`date` AS `date`,`transaction`.`account_owner` AS `account_owner`,`transaction`.`value` AS `value`,`transaction`.`description` AS `description`,`transaction`.`client/id` AS `client/id`,`transaction`.`client_account` AS `client_account`,`transaction`.`purchase_member/id` AS `purchase_member/id`,`purchase_member`.`purchase_content/id` AS `purchase_content/id`,`purchase_member`.`product/id` AS `product/id`,`purchase`.`id` AS `purchase/id`,`purchase`.`name` AS `purchase/name`,`product`.`name` AS `product/name`,`client`.`name` AS `client/name` from ((((`transaction` left join `purchase_member` on((`transaction`.`purchase_member/id` = `purchase_member`.`id`))) left join `purchase` on((`purchase_member`.`purchase/id` = `purchase`.`id`))) left join `product` on((`purchase_member`.`product/id` = `product`.`id`))) left join `client` on((`transaction`.`client/id` = `client`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `purchaseContentView`
--

/*!50001 DROP VIEW IF EXISTS `purchaseContentView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u1489690_flapp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `purchaseContentView` AS select `purchase_content`.`purchase/id` AS `purchase/id`,`purchase_content`.`id` AS `id`,`purchase_content`.`sale_price` AS `sale_price`,`purchase_content`.`sale_currency` AS `sale_currency`,`purchase_content`.`shipping` AS `shipping`,`purchase_content`.`count` AS `count`,`product`.`id` AS `product/id`,`product`.`group` AS `product/group`,`product`.`name` AS `product/name`,`product`.`detales` AS `product/detales`,`product`.`primary_price` AS `product/primary_price`,`product`.`primary_currency` AS `product/primary_currency`,`product`.`primary_order_quantity` AS `product/primary_order_quantity`,`product`.`order_quantity` AS `product/order_quantity`,`getRemains`(`purchase_content`.`purchase/id`,`purchase_content`.`id`,`purchase_content`.`count`) AS `remains` from (`purchase_content` left join `product` on((`purchase_content`.`product/id` = `product`.`id`))) order by `purchase_content`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `purchaseMemberView`
--

/*!50001 DROP VIEW IF EXISTS `purchaseMemberView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`u1489690_flapp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `purchaseMemberView` AS select `purchase_member`.`id` AS `id`,`purchase_member`.`count` AS `count`,`purchase_member`.`distributed` AS `distributed`,`purchase_member`.`paid` AS `paid`,`purchase_member`.`torefound` AS `torefound`,`purchase_member`.`refounded` AS `refounded`,`purchase_member`.`purchase/id` AS `purchase/id`,`purchase_member`.`purchase_content/id` AS `purchase_content/id`,`client`.`id` AS `client/id`,`client`.`group` AS `client/group`,`client`.`name` AS `client/name`,`client`.`phone` AS `client/phone`,`client`.`account` AS `client/account`,`product`.`id` AS `product/id`,`product`.`group` AS `product/group`,`product`.`name` AS `product/name`,`product`.`primary_price` AS `product/primary_price`,`product`.`primary_currency` AS `product/primary_currency`,`product`.`order_quantity` AS `product/order_quantity`,`purchase_content`.`sale_price` AS `purchase_content/sale_price`,`purchase_content`.`sale_currency` AS `purchase_content/sale_currency`,`purchase_content`.`shipping` AS `purchase_content/shipping`,`purchase`.`name` AS `purchase/name`,`purchase`.`details` AS `purchase/details`,`GETPURCHASEMEMBERCOST`(`purchase_member`.`purchase/id`,`purchase_member`.`purchase_content/id`,`purchase_member`.`count`) AS `cost` from ((((`purchase_member` left join `client` on((`purchase_member`.`client/id` = `client`.`id`))) left join `purchase_content` on((`purchase_member`.`purchase_content/id` = `purchase_content`.`id`))) left join `product` on((`purchase_member`.`product/id` = `product`.`id`))) left join `purchase` on((`purchase_member`.`purchase/id` = `purchase`.`id`))) order by `purchase_member`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-20 17:52:15
