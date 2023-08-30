<?php
    /*
    Arguments from index file
    */
    $sheetId = $_POST['sheetId']; // "1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY"; //
    $sheet = $_POST['sheet']; //"People"; //
    $docIndex = $_POST['docIndex'];
    $sheetColName = $_POST['sheetColName'];
    $sheetColValue = $_POST['sheetColValue'];
    $updateType = $_POST['updateType'];
    $msgInfo = $_POST['msgInfo'];

    $updatedColName = str_replace(' ', '_', $sheetColName);
    $newMessageUpdate = str_replace(' ', '_', $msgInfo);

    // Local Testing
    $python_file_name = "greadUpdate.py ";
    $python_execution = "python ".$python_file_name .$sheetId . ',' .$sheet . ',' .$docIndex . ',' .$updatedColName . ',' .$sheetColValue . ',' .$updateType . ',' .$newMessageUpdate;
    $output = shell_exec($python_execution);
    echo $output;

    // For Server
    /* $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python greadUpdate.py ' .$sheetId . ',' .$sheet . ',' .$docIndex . ',' .$updatedColName . ',' .$sheetColValue . ',' .$updateType . ',' .$newMessageUpdate);
    $com_output = shell_exec($py_command);
    echo $com_output; */
?>