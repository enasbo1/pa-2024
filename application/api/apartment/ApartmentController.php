<?php
namespace apartment;
use Exception;
use token\Privilege;

require_once 'ApartmentRepository.php';

class ApartmentController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2=null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new ApartmentRepository();
                if ($id == null) {
                    $apartment = $request->getAll();
                    echo json_encode($apartment);
                } else {
                    try {
                        Privilege::allowed();
                        if ($id = 'louable'){
                            if ($id2==null){
                                $apartment = $request->findLouable();
                            }else{
                                $apartment = $request->findLouableById($id2);
                            }
                        }else{
                            $apartment = $request->findById($id);
                        }
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
                    echo("apartment créé avec succès");
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
                $request->delete($id);
                break;
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
