<?php
namespace connection;

use users\UsersRepository;
use Exception;

include_once 'ConnectionService.php';

class ConnectionController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $service = new ConnectionService();

                try {
                    $token = $service->connect($params);
                    http_response_code(200);
                    echo($token);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
        }
    }
}
