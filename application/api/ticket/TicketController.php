<?php
namespace ticket;
use Exception;
require_once 'TicketRepository.php';

class TicketController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new TicketRepository();
                if ($id == null) {
                    $ticket = $request->getAll();
                    echo json_encode($ticket);
                } else {
                    try {
                        $ticket = $request->findById($id);
                        echo json_encode($ticket);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new TicketRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("ticket créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new TicketRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new TicketRepository();
                $request->delete($id);
                break;
        }
    }
}
