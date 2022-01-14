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
    $routePath = './api/getData.php';

} else if ($query == 'get-join-data') {
    $routePath = './api/getJoinData.php';

} else if ($query == 'get-view') {
    $routePath = './api/getView.php';

} else if ($query == 'set-data') {
    $routePath = './api/setData.php';
    
} else if ($query == 'call-procedure') {
    $routePath = './api/callProcedure.php';

} else if ($query == 'add-transaction') {
    $routePath = './api/addTransaction.php';

} else if ($query == 'get-max-id') {
    $routePath = './api/getMaxId.php';

} else if ($query == 'add-order') {
    $routePath = './api/addOrder.php';

} else if ($query == 'get-client') {
    $routePath = './api/getClient.php';

} else if ($query == 'set-client') {
    $routePath = './api/addClient.php';

} else if ($query == 'get-purchase-product') {
    $routePath = './api/getPurchaseProduct.php';

} else if ($query == 'main-menu') {
    $routePath = './main_menu.php';

} else {
    $routePath = './report_for_client.php';
}

plog('route to: ', $routePath);
require_once $routePath;

plog("router.php ->");
