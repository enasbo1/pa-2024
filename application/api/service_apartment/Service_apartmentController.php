<?php
namespace service_apartment;
use Exception;
require_once 'Service_apartmentRepository.php';

class Service_apartmentController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new Service_apartmentRepository();
                if ($id == null) {
                    $service_apartment = $request->getAll();
                    echo json_encode($service_apartment);
                } else {
                    try {
                        $service_apartment = $request->findById($id);
                        echo json_encode($service_apartment);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new Service_apartmentRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("service_apartment créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new Service_apartmentRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new Service_apartmentRepository();
                $request->delete($id);
                break;
            default:
                http_response_code(404);
        }
    }
}
