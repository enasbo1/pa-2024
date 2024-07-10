<?php
namespace reservation;
use Exception;
use token\Privilege;

require_once 'ReservationRepository.php';

class ReservationController {

    /**
     * @throws Exception
     */
    public function routes($id = null, $id2=null): void
    {
        global $_TOKEN;
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new ReservationRepository();
                if ($id == null) {
                    $reservation = $request->getAll();
                    echo json_encode($reservation);
                } else {
                    try {
                        if ($id == 'voy'){
                            Privilege::allowed();

                            if ($id2==null){
                                $reservation = $request->findFromVoyageur($_TOKEN->user_id);
                            }else{
                                $reservation = $request->findByIdFromVoy($_TOKEN->user_id, $id);
                            }
                            echo json_encode($reservation);
                        }else{
                            Privilege::admin();
                            $reservation = $request->findById($id);
                            echo json_encode($reservation);
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
                $request = new ReservationRepository();

                try {
                    if ($id == null){
                        Privilege::admin();
                        $request->save($params);
                        http_response_code(201);
                        echo('{"message":"reservation créé avec succès"}');
                    }else{
                        Privilege::allowed();
                        $request->rent($params, $_TOKEN->user_id);
                        http_response_code(201);
                        echo('{"message":"reservation créé avec succès"}');
                    }
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new ReservationRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new ReservationRepository();
                $request->delete($id);
                break;
            case "OPTIONS":
                break;
            default:
                http_response_code(404);
        }
    }
}
