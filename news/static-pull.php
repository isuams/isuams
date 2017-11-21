<?php
/**
 * SkyCam Static Pull Script
 * 
 * Simply forwards along requests for static images so that people outside
 * of the ISU network can still see at least the images desired.
 */

// Decide which camera to use
if( $_GET['camera'] == 1 ){
	$ip = "10.25.30.217";
} elseif( $_GET['camera'] == 2 ){
	$ip = "10.25.99.233";
} elseif( $_GET['camera'] == 3 ){
	$ip = "10.24.95.94";
} else {
	die();
}

// Assemble the query array
$queries = array(
	"resolution" => $_GET['resolution'],
	"dummy" => $_GET['dummy']
);

// Make and output the request
$remoteImage = "http://".$ip."/axis-cgi/jpg/image.cgi?".http_build_query($queries);
$imginfo = getimagesize($remoteImage);
header("Content-type: ".$imginfo['mime']);
readfile($remoteImage);