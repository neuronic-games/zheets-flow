<?php
    /*
    Arguments from index file
    */
    $sheetId = "1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY"; //$_POST['sheetId'];
    $sheet = "Master"; //$_POST['sheet'];


    // Local Testing
    /* $python_file_name = "greadFlow.py ";
    $python_execution = "python ".$python_file_name .$sheetId .'sheetname' .$sheet;
    $output = shell_exec($python_execution);
    echo $output; */

    // For Server
    $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python greadFlow.py ' .$sheetId .'sheetname' .$sheet);
    $com_output = shell_exec($py_command);
    echo $com_output;
?>