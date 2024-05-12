<?php
namespace users;
use Exception;
require_once 'UsersRepository.php';

class UsersController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new UsersRepository();
                if ($id == null) {
                    $users = $request->getAll();
                    echo json_encode($users);
                } else {
                    try {
                        $users = $request->findById($id);
                        echo json_encode($users);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo json_encode(["error" => $e->getMessage()]);
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new UsersRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("users créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo json_encode(["error" => $e->getMessage()]);
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new UsersRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo json_encode(["error" => $e->getMessage()]);
                }
                break;
            case "DELETE":
                $request = new UsersRepository();
                try{
                    $request->delete($id);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo json_encode(["error" => $e->getMessage()]);
                }
                break;
            default:
                http_response_code(404);
        }
    }
}
