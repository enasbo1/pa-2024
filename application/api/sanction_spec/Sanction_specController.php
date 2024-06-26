<?php
namespace sanction_spec;
use Exception;
require_once 'Sanction_specRepository.php';

class Sanction_specController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2= null): void
    {
        global $_TOKEN;
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new Sanction_specRepository();
                if ($id == null) {
                    $sanction_spec = $request->getAll();
                    echo json_encode($sanction_spec);
                } else {
                    try {
                        $sanction_spec = $request->findById($id);
                        echo json_encode($sanction_spec);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new Sanction_specRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo('{"message" : "sanction_spec créé avec succès"}');
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new Sanction_specRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new Sanction_specRepository();
                $request->delete($id);
                break;
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
