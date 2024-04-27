<?php
namespace reservation;
use Exception;
require_once 'ReservationRepository.php';

class ReservationController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new ReservationRepository();
                if ($id == null) {
                    $reservation = $request->getAll();
                    echo json_encode($reservation);
                } else {
                    try {
                        $reservation = $request->findById($id);
                        echo json_encode($reservation);
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
                    $request->save($params);
                    http_response_code(201);
                    echo("reservation créé avec succès");
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
        }
    }
}
