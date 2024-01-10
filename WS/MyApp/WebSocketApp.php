<?php

namespace MyApp;



use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketApp implements MessageComponentInterface
{
    // protected $clients;

    public function __construct()
    {
        echo "\n Object constructed \n";
        // $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // $this->clients->attach($conn);

        // echo "New connection! ({$conn->resourceId})\n";
        echo "New User\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        echo "New Message = " . $msg;
        $from->send('reponse du WebSocket');
    }

    public function onClose(ConnectionInterface $conn)
    {
        echo "Deconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
