<?php
namespace banissement;
use Exception;
require_once 'BanissementRepository.php';

class BanissementController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new BanissementRepository();
                if ($id == null) {
                    $banissement = $request->getAll();
                    echo json_encode($banissement);
                } else {
                    try {
                        $banissement = $request->findById($id);
                        echo json_encode($banissement);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new BanissementRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("banissement créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new BanissementRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new BanissementRepository();
                $request->delete($id);
                break;
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
