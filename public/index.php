<?php

require_once './libPHP/plog.php';
plog("-> router.php");
plog('_REQUEST: ', $_REQUEST);
plog('_SERVER: ', $_SERVER);
plog("url:", $_GET['url']);
plog("url:", $_POST['url']);

if (empty($_GET) || $_GET['url'] == '') {
    $html = require_once './clientOverview.php';
    echo $html;
    exit;
}

if ($_GET['url'] == 'payment') {
    $html = require_once './payment.php';
    echo $html;
    exit;
}

if ($_GET['url'] == 'client-report') {
    $html = require_once './reportForClient.php';
    echo $html;
    exit;
}

if ($_GET['url'] == 'get-data') {
    $html = require_once './getData.php';
    echo $html;
    exit;
}

plog("-> router.php");
