<?php
$filname = $_GET['fileName'];
$filecontents = $_GET['fileContents'];

$file = fopen("test.txt","w");
echo fwrite($file, $filecontents);
fclose($file);
?>
