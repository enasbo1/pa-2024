<?php

require_once 'ApartmentRepository.php';

class ApartmentController {
    
    public function routes($id = null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                if ($id == null) {
                    $request = new ApartmentRepository();
                    $apartments = $request->getAll();
                    echo json_encode($apartments);
                } else {
                    $request = new ApartmentRepository();
                    try {
                        $apartment = $request->findById($id);
                        echo json_encode($apartment);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new ApartmentRepository();
                
                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("appartement créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new ApartmentRepository();

                try {
                    $request->update($params); 
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new ApartmentRepository();
                $apartment = $request->delete($id);
            break;
        }
    }
}
