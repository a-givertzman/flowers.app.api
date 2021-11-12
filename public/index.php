<?php
require_once './libPHP/plog.php';
plog("-> router.php");
// plog('_REQUEST: ', $_REQUEST);
// plog('_SERVER: ', $_SERVER);
// plog("url:", $_GET['url']);
// plog("url:", $_POST['url']);

$query = trim($_SERVER['QUERY_STRING'], '/');
plog('query:', $query);

if ($query == '') {
    $routePath = './reportForClient.php';

} else if ($query == 'admin-client-report') {
    $routePath = './reportForClient.php';

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

} else {
    $routePath = './reportForClient.php';
}

plog('route to: ', $routePath);
require_once $routePath;

plog("router.php ->");
