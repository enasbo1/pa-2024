<?php
namespace service_entreprise;
use Exception;
require_once 'Service_entrepriseRepository.php';

class Service_entrepriseController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2=null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new Service_entrepriseRepository();
                if ($id == null) {
                    $service_entreprise = $request->getAll();
                    echo json_encode($service_entreprise);
                } else {
                    try {
                        if ($id =="service"){
                            $entreprise = $request->findByService($id2);
                            echo json_encode($entreprise);
                        }else if($id =="entreprise"){
                            $service = $request->findByEntreprise($id2);
                            echo json_encode($service);
                        }else{
                            $service_entreprise = $request->findById($id);
                            echo json_encode($service_entreprise);
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
                $request = new Service_entrepriseRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("service_entreprise créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new Service_entrepriseRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new Service_entrepriseRepository();
                $request->delete($id);
                break;
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
