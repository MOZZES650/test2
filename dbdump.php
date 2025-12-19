<?php
// Include your existing connection file
include_once 'databaseConn.php';
$DatabaseCo = new DatabaseConn();

/**
 * 1. GET SYSTEM INFO (Hostname & Current User)
 */
echo "<h2>1. System & Connection Info</h2>";
$hostInfo = $DatabaseCo->dbLink->host_info;
$resUser = $DatabaseCo->dbLink->query("SELECT CURRENT_USER() as user");
$sysData = $resUser->fetch_object();

echo "<b>Connection:</b> " . $hostInfo . "<br>";
echo "<b>DB User:</b> " . $sysData->user . "<br>";
?>
