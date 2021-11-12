<?php

error_log("\t Before plog", 0);

require_once './libPHP/plog.php';
error_log("\t After plog", 0);
plog("-> router.php");
// plog('_REQUEST: ', $_REQUEST);
// plog('_SERVER: ', $_SERVER);
// plog("url:", $_GET['url']);
// plog("url:", $_POST['url']);

$query = trim($_SERVER['QUERY_STRING'], '/');
plog('query:', $query);

if ($query == '') {
    // $html = require_once './clientOverview.php';
    require_once './reportForClient.php';
    exit;
}

if ($query == 'payment') {
    require_once './payment.php';
    exit;
}

if ($query == 'client-report') {
    require_once './reportForClient.php';
    exit;
}

if ($query == 'get-data') {
    require_once './getData.php';
    exit;
}
if ($query == 'get-join-data') {
    require_once './getJoinData.php';
    exit;
}
if ($query == 'get-view') {
    require_once './getView.php';
    exit;
}
if ($query == 'set-data') {
    require_once './setData.php';
    exit;
}

plog("router.php ->");
