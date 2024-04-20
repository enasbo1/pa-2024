<?php
namespace reservation;
use Exception;

require_once 'ReservationRepository.php';

class ReservationController {
    
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                if ($id === null) {
                    try {
                        $repository = new ReservationRepository();
                        $reservations = $repository->getAll();
                        echo json_encode($reservations);
                    } catch (Exception $e) {
                        http_response_code(500);
                        echo $e->getMessage();
                    }
                } else {
                    try {
                        $repository = new ReservationRepository();
                        $reservation = $repository->findById($id);
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
                $repository = new ReservationRepository();

                try {
                    $repository->save($params);
                    http_response_code(201);
                    echo "Reservation created successfully.";
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $repository = new ReservationRepository();
                
                try {
                    $repository->update($params);
                    http_response_code(200);
                    echo "Reservation updated successfully.";
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $repository = new ReservationRepository();

                try {
                    $repository->delete($id);
                    http_response_code(200);
                    echo "Reservation deleted successfully.";
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            default:
                http_response_code(405);
                echo "Method Not Allowed";
        }
    }
}
