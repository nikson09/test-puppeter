<?php

require_once __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Process\Process;

error_reporting(E_ALL);
ini_set('display_errors', '1');

class ParseBlock {

    public function getBlock()
    {
        $url = 'https://dev.amidstyle.com';
        $process = new Process(['node', __DIR__.'/parse_block.js', '-u', $url]);
        $process->setTimeout(36000);
        $process->run();
        $data = json_decode($process->getOutput(), true);

        return $data['sign'];
    }
}

print (new ParseBlock())->getBlock();