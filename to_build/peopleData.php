<?php
    /*
    Arguments from index file
    */
    $sheetId = $_POST['sheetId']; // "1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY"; //
    $sheet = $_POST['sheet']; //"People"; //


    // Local Testing
    /* $python_file_name = "gread.py ";
    $python_execution = "python ".$python_file_name .$sheetId .'sheetname' .$sheet;
    $output = shell_exec($python_execution);
    echo $output; */

    // For Server
    $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$sheetId .'sheetname' .$sheet);
    $com_output = shell_exec($py_command);
    echo $com_output;
?>