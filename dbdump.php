<?php
// Include your existing connection file
include_once 'databaseConn.php';
$DatabaseCo = new DatabaseConn();

/**
 * 1. GET SYSTEM INFO (Hostname & Current User)
 */
echo "<h2>1. System & Connection Info</h2>";
$hostInfo = $DatabaseCo->dbLink->host_info;
$resUser = $DatabaseCo->dbLink->query("SELECT CURRENT_USER() as user, @@hostname as host");
$sysData = $resUser->fetch_object();

echo "<b>Connection:</b> " . $hostInfo . "<br>";
echo "<b>DB User:</b> " . $sysData->user . "<br>";
echo "<b>System Hostname:</b> " . $sysData->host . "<hr>";

/**
 * 2. LIST AVAILABLE DATABASES
 */
echo "<h2>2. Available Databases</h2>";
$dbList = $DatabaseCo->dbLink->query("SHOW DATABASES");
echo "<ul>";
while ($row = $dbList->fetch_object()) {
    echo "<li>" . $row->Database . "</li>";
}
echo "</ul><hr>";

/**
 * 3. USER PRIVILEGES
 */
echo "<h2>3. Current User Privileges</h2>";
$grants = $DatabaseCo->dbLink->query("SHOW GRANTS");
echo "<pre>";
while ($row = $grants->fetch_array()) {
    echo $row[0] . "\n";
}
echo "</pre><hr>";
?>
