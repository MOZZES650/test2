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

/**
 * 4. DATABASE DUMP (Logic for Tables & Data)
 */
echo "<h2>4. Database Content Dump</h2>";
$tables = [];
$result = $DatabaseCo->dbLink->query("SHOW TABLES");

while ($row = $result->fetch_row()) {
    $tables[] = $row[0];
}

$dumpOutput = "-- Database Dump generated on " . date('Y-m-d H:i:s') . "\n\n";

foreach ($tables as $table) {
    // Get Table Structure
    $resStruct = $DatabaseCo->dbLink->query("SHOW CREATE TABLE `$table` ");
    $rowStruct = $resStruct->fetch_row();
    $dumpOutput .= "\n\n" . $rowStruct[1] . ";\n\n";

    // Get Table Data
    $resData = $DatabaseCo->dbLink->query("SELECT * FROM `$table` ");
    $numFields = $resData->field_count;

    while ($row = $resData->fetch_row()) {
        $dumpOutput .= "INSERT INTO `$table` VALUES(";
        for ($j = 0; $j < $numFields; $j++) {
            if (isset($row[$j])) {
                // Escape strings using the existing dbLink
                $val = $DatabaseCo->dbLink->real_escape_string($row[$j]);
                $dumpOutput .= '"' . $val . '"';
            } else {
                $dumpOutput .= 'NULL';
            }
            if ($j < ($numFields - 1)) { $dumpOutput .= ','; }
        }
        $dumpOutput .= ");\n";
    }
}

// Display or Save
echo "<textarea style='width:100%; height:400px;'>" . htmlspecialchars($dumpOutput) . "</textarea>";

// Optionally save to file:
// file_put_contents("db_dump_" . date('Y-m-d') . ".sql", $dumpOutput);
?>
