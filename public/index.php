<?php
error_reporting(E_ALL);

require_once './libPHP/plog.php';
plog("-> router.php");
// plog('_REQUEST: ', $_REQUEST);
// plog('_SERVER: ', $_SERVER);
// plog("url:", $_GET['url']);
// plog("url:", $_POST['url']);

$query = trim($_SERVER['QUERY_STRING'], '/');
plog('query:', $query);

if ($query == '') {
    $routePath = './report_for_client.php';

} else if ($query == 'admin-client-report') {
    $routePath = './report_for_client.php';

} else if ($query == 'payment') {
    $routePath = './payment.php';

} else if ($query == 'get-data') {
    $routePath = './api/get_data.php';

} else if ($query == 'get-join-data') {
    $routePath = './api/get_join_data.php';

} else if ($query == 'get-view') {
    $routePath = './api/get_view.php';

} else if ($query == 'set-data') {
    $routePath = './api/set_data.php';
    
} else if ($query == 'call-procedure') {
    $routePath = './api/call_procedure.php';

} else if ($query == 'add-transaction') {
    $routePath = './api/add_transaction.php';

} else if ($query == 'get-max-id') {
    $routePath = './api/get_max_id.php';

} else if ($query == 'add-order') {
    $routePath = './api/add_order.php';

} else if ($query == 'remove-order') {
    $routePath = './api/remove_order.php';

} else if ($query == 'get-notice-list') {
    $routePath = './api/get_notice_list.php';

} else if ($query == 'get-client') {
    $routePath = './api/get_client.php';

} else if ($query == 'set-client') {
    $routePath = './api/add_client.php';

} else if ($query == 'get-purchase-product') {
    $routePath = './api/get_purchase_product.php';

} else if ($query == 'main-menu') {
    $routePath = './main_menu.php';

} else if ($query == 'auth') {
    $routePath = './auth.php';

} else {
    $routePath = './report_for_client.php';
}

plog('route to: ', $routePath);
require_once $routePath;

plog("router.php ->");
