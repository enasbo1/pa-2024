<?php

require_once 'UsersRepository.php';

class UsersController {
    
    public function routes($id = null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                if ($id === null) {
                    try {
                        $repository = new UsersRepository();
                        $users = $repository->getAll();
                        echo json_encode($users);
                    } catch (Exception $e) {
                        http_response_code(500);
                        echo $e->getMessage();
                    }
                } else {
                    try {
                        $repository = new UsersRepository();
                        $user = $repository->findById($id);
                        echo json_encode($user);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $repository = new UsersRepository();

                try {
                    $repository->save($params);
                    http_response_code(201);
                    echo "User created successfully.";
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $repository = new UsersRepository();
                
                try {
                    $repository->update($params);
                    http_response_code(200);
                    echo "User updated successfully.";
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $repository = new UsersRepository();

                try {
                    $repository->delete($id);
                    http_response_code(200);
                    echo "User deleted successfully.";
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            default:
                http_response_code(405);
                echo "Method Not Allowed";
        }
    }
}
?>
