<?php
namespace service;
use Exception;
require_once 'ServiceRepository.php';

class ServiceController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new ServiceRepository();
                if ($id == null) {
                    $service = $request->getAll();
                    echo json_encode($service);
                } else {
                    try {
                        $service = $request->findById($id);
                        echo json_encode($service);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new ServiceRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("service créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new ServiceRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new ServiceRepository();
                $request->delete($id);
                break;
        }
    }
}
