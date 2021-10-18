<?php

if ($_GET('url') == 'payment') {
    require_once './payment.php';
}

if ($_GET('url') == '') {
    require_once './clientOverview.php';
}
