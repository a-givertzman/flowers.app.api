<?php

if (empty($_GET) || $_GET('url') == '') {
    require_once './clientOverview.php';
    exit;
}

if ($_GET('url') == 'payment') {
    require_once './payment.php';
    exit;
}

