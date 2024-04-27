<?php
namespace entrepise;
use Exception;
require_once 'EntrepiseRepository.php';

class EntrepiseController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new EntrepiseRepository();
                if ($id == null) {
                    $entrepise = $request->getAll();
                    echo json_encode($entrepise);
                } else {
                    try {
                        $entrepise = $request->findById($id);
                        echo json_encode($entrepise);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new EntrepiseRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("entrepise créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new EntrepiseRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new EntrepiseRepository();
                $request->delete($id);
                break;
        }
    }
}
