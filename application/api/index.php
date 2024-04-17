<?php

require_once 'apartment/ApartmentController.php';
require_once 'Reservation/ReservationController.php';
require_once 'users/UsersController.php';
// require_once 'Adress/AdressController.php';

header("Content-Type: application/json; charset=utf8");
header("Access-Control-Allow-Origin: *");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );


switch ($uri[2]) {
    case 'apartments':
        $apartmentController = new ApartmentController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $apartmentController->routes($id);
        break;
    case 'reservation':
        $reservationController = new ReservationController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $reservationController->routes($id);
        break;
    case 'users':
        $userController = new UsersController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $userController->routes($id);
        break;
        case 'adress':
            $AdressController = new AdressController();
            $id = null;
            if (isset($uri[4])) {
                $id = $uri[4];
            }
            $AdressController->routes($id);
            break;
    default:
        // Page non trouvée
        http_response_code(404);
        echo "Page not found";
        echo $uri;
        break;
}
