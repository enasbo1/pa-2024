<?php
namespace service_used;
use Exception;
use token\Privilege;
use token\Token;

require_once 'Service_usedRepository.php';

class Service_usedController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2=null): void
    {        
        global $_TOKEN;
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new Service_usedRepository();
                if ($id == null) {
                    Privilege::admin();
                    $service_used = $request->getAll();
                    echo json_encode($service_used);
                } else {
                    try {
                        switch ($id){
                            case "service":
                                Privilege::admin();
                                $service = $request->findByService($id2);
                                echo json_encode($service);
                                break;
                            case "location":
                                Privilege::admin();
                                $service = $request->findByLocation($id2);
                                echo json_encode($service);
                                break;
                            case "currentUser":
                                Privilege::allowed();
                                $service_used = $request->findByUser($_TOKEN->user_id);
                                echo json_encode($service_used);
                                break;
                            case "bailleur":
                                Privilege::allowed();
                                $service = $request->findByBailleur($_TOKEN->user_id);
                                echo json_encode($service);
                                break;
                            case "prestate":
                                Privilege::prestate($id2);
                                $service = $request->findByEnterprise($id2?? $_TOKEN->user_enterprise);
                                echo json_encode($service);
                                break;
                            default:
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
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
