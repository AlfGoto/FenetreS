<?php

namespace MyApp;



use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

$arr = [];

class WebSocketApp implements MessageComponentInterface
{
    private $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }



    public function onOpen(ConnectionInterface $conn)
    {
        global $arr;
        $this->clients->attach($conn);
        $this->clients->page;

        if (!isset($arr[$conn->remoteAddress])) {
            $temp[1] = ['y' => 0, 'x' => 0];
            $arr[$conn->remoteAddress] = $temp;
            $this->clients->page = 1;
            
            $msg = array(
                'name' => count($temp)
            );
            $conn->send(json_encode($msg));
        } else {
            $temp = $arr[$conn->remoteAddress];
            $temp[count($temp) + 1] = ['y' => 0, 'x' => 0];
            $arr[$conn->remoteAddress] = $temp;
            
            $msg = array(
                'name' => count($temp)
            );
            $conn->send(json_encode($msg));
        }
        
        print_r($arr);
        
        // echo "New connection! ({$conn->resourceId})\n";
        
        echo "New User\n";
    }
    
    
    public function onMessage(ConnectionInterface $from, $msg)
    {
        $msg = json_decode($msg, true);
        
        if ($msg['request'] == 'size') {
            $y = $msg['y'];
            $x = $msg['x'];
            echo "New Size = Y: $y / X: $x\n";
        }
        // print_r($msg);
        echo $this->clients->page;
    }


    public function onClose(ConnectionInterface $conn)
    {
        global $arr;
        echo "Deconnected\n";
        // unset($arr[$conn->remoteAddress]);
    }


    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
