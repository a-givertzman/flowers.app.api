<?php

if ($GET('url') == 'payment') {
    require_once './payment.php';
}

if ($GET('url') == '') {
    require_once './clientOverview.php';
}
