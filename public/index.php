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
    $html = require_once './reportForClient.php';
    echo $html;
    exit;
}

if ($query == 'payment') {
    $html = require_once './payment.php';
    echo $html;
    exit;
}

if ($query == 'client-report') {
    $html = require_once './reportForClient.php';
    echo $html;
    exit;
}

if ($query == 'get-data') {
    $html = require_once './getData.php';
    echo $html;
    exit;
}
if ($query == 'get-join-data') {
    $html = require_once './getJoinData.php';
    echo $html;
    exit;
}
if ($query == 'get-view') {
    require_once './getView.php';
    // echo $html;
    exit;
}
if ($query == 'set-data') {
    $html = require_once './setData.php';
    echo $html;
    exit;
}

plog("router.php ->");
