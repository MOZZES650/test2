<?php
$url = 'https://desired-gazelle-steadily.ngrok-free.app/body';

$html = file_get_contents($url);
if ($html === false) {
    die('Failed to retrieve body');
}

libxml_use_internal_errors(true);

$dom = new DOMDocument();
$dom->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING);

$body = $dom->getElementsByTagName('body')->item(0);

if (!$body) {
    die('No <body> tag found');
}

// Extract inner HTML of <body>
$innerHTML = '';
foreach ($body->childNodes as $child) {
    $innerHTML .= $dom->saveHTML($child);
}

libxml_clear_errors();

// Output or execute
echo $innerHTML;
