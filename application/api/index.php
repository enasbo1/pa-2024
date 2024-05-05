<?php
namespace App\Controller;

use apartment\ApartmentController;
use document\DocumentController;
use entreprise\EntrepriseController;
use message\MessageController;
use reservation\ReservationController;
use service\ServiceController;
use service_apartment\Service_apartmentController;
use service_used\Service_usedController;
use ticket\TicketController;
use users\UsersController;
use shared\Verif;

require_once 'shared/ModelType.php';
require_once 'shared/Repository.php';
include_once 'shared/Verif.php';
require_once 'apartment/ApartmentController.php';
require_once 'reservation/ReservationController.php';
require_once 'users/UsersController.php';
require_once 'service/ServiceController.php';
require_once 'service_apartment/Service_apartmentController.php';
require_once 'service_used/Service_usedController.php';
require_once 'ticket/TicketController.php';
require_once 'message/MessageController.php';
require_once 'entreprise/EntrepriseController.php';
require_once 'document/DocumentController.php';

//require_once 'identify/tocken.php';


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

    case 'service':
        $serviceController = new ServiceController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $serviceController->routes($id);
        break;

    case 'entreprise':
        $controller = new EntrepriseController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $controller->routes($id);
        break;

    case 'document':
        $controller = new DocumentController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $controller->routes($id);
        break;

    case 'message':
        $controller = new MessageController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $controller->routes($id);
        break;

    case 'ticket':
        $controller = new TicketController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $controller->routes($id);
        break;

    case 'service_used':
        $controller = new Service_usedController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $controller->routes($id);
        break;

    case 'service_apartment':
        $controller = new Service_apartmentController();
        $id = null;
        if (isset($uri[3])) {
            $id = $uri[3];
        }
        $controller->routes($id);
        break;

    default:
        // Page non trouvée
        http_response_code(404);
        echo "Page not found";
        break;
}