<?php
namespace service_used;
use Exception;
require_once 'Service_usedRepository.php';

class Service_usedController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2=null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new Service_usedRepository();
                if ($id == null) {
                    $service_used = $request->getAll();
                    echo json_encode($service_used);
                } else {
                    try {                    
                        if ($id =="service"){
                            $entreprise = $request->findByService($id2);
                            echo json_encode($entreprise);
                        }else if($id =="location"){
                            $service = $request->findByLocation($id2);
                            echo json_encode($service);
                        }else  {
                            $service_used = $request->findById($id);
                            echo json_encode($service_used);
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
                $request = new Service_usedRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("service_used créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new Service_usedRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new Service_usedRepository();
                $request->delete($id);
                break;
            default:
                http_response_code(404);
        }
    }
}
