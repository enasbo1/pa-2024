<?php
namespace message;
use Exception;
require_once 'MessageRepository.php';

class MessageController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2= null): void
    {
        global $_TOKEN;
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new MessageRepository();
                if ($id == null) {
                    $message = $request->getAll();
                    echo json_encode($message);
                } else {
                    try {
                        if ($id =="service_used"){
                            $message = $request->findByService_used($id2);
                            echo json_encode($message);
                        }else if($id =="reservation"){
                            $message = $request->findByReservation($id2);
                            echo json_encode($message);
                        }else if($id =="ticket"){
                            $message = $request->findByTicket($id2);
                            echo json_encode($message);
                        }else{
                            $message = $request->findById($id);
                            echo json_encode($message);
                        }
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new MessageRepository();

                try {
                    $params->id_utilisateur = $_TOKEN->user_id;
                    $request->save($params);
                    http_response_code(201);
                    echo('{"message" : "message créé avec succès"}');
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new MessageRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new MessageRepository();
                $request->delete($id);
                break;
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
