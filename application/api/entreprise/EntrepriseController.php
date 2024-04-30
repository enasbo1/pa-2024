<?php
namespace entreprise;
use Exception;
require_once 'EntrepriseRepository.php';

class EntrepriseController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new EntrepriseRepository();
                if ($id == null) {
                    $entreprise = $request->getAll();
                    echo json_encode($entreprise);
                } else {
                    try {
                        $entreprise = $request->findById($id);
                        echo json_encode($entreprise);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new EntrepriseRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("entreprise créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new EntrepriseRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new EntrepriseRepository();
                $request->delete($id);
                break;
            default:
                http_response_code(404);
        }
    }
}
