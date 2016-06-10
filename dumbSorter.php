<?php

$currentChar = 'A';
$prevIndex = 0;
$currIndex = -1;
$lastIndex = count($nameArr) - 1;

while ($currIndex < $lastIndex) {
    foreach ($nameArr as $key => $name) {
        if (strtoupper($name[0]) === $currentChar) {
            $sortedArr[] = $name;
            unset($nameArr[$key]);
        }
    }

    $currIndex = count($sortedArr) - 1;

    for ($prevIndex; $prevIndex < $currIndex; $prevIndex++) {
        $i = $prevIndex + 1;

        while($i < $currIndex) {
            $c = 1;
            while (true) {
                if (!isset($sortedArr[$prevIndex][$c])) {
                    break;
                } elseif (!isset($sortedArr[$i][$c])) {
                    $temp = $sortedArr[$i];
                    $sortedArr[$i] = $sortedArr[$prevIndex];
                    $sortedArr[$prevIndex] = $temp;
                    break;
                } elseif (strtoupper($sortedArr[$prevIndex][$c]) === strtoupper($sortedArr[$i][$c])) {
                    $c++;
                } elseif (strtoupper($sortedArr[$prevIndex][$c]) > strtoupper($sortedArr[$i][$c])) {
                    $temp = $sortedArr[$i];
                    $sortedArr[$i] = $sortedArr[$prevIndex];
                    $sortedArr[$prevIndex] = $temp;
                    break;
                } elseif (strtoupper($sortedArr[$prevIndex][$c]) < strtoupper($sortedArr[$i][$c])) {
                    break;
                } else {
                    die('ODOTTAMATON TILA');
                }
            }
            $i++;
        }
    }

    $prevIndex++;
    $currentChar++;
}
