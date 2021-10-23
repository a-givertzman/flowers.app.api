<?php

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

