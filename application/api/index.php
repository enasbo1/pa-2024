<?php
namespace App\Controller;

use apartment\ApartmentController;
use banissement\BanissementController;
use connection\ConnectionController;
use document\DocumentController;
use entreprise\EntrepriseController;
use Exception;
use message\MessageController;
use reservation\ReservationController;
use service\ServiceController;
use service_apartment\Service_apartmentController;
use service_entreprise\Service_entrepriseController;
use service_used\Service_usedController;
use ticket\TicketController;
use users\UsersController;
use token\Token;

require_once 'shared/ModelType.php';
require_once 'shared/Repository.php';
include_once 'shared/Verif.php';
include_once 'shared/Formater.php';
require_once 'apartment/ApartmentController.php';
require_once 'reservation/ReservationController.php';
require_once 'users/UsersController.php';
require_once 'service/ServiceController.php';
require_once 'service_apartment/Service_apartmentController.php';
require_once 'service_entreprise/Service_entrepriseController.php';
require_once 'service_used/Service_usedController.php';
require_once 'ticket/TicketController.php';
require_once 'message/MessageController.php';
require_once 'entreprise/EntrepriseController.php';
require_once 'document/DocumentController.php';
require_once 'connection/ConnectionController.php';
require_once 'banissement/BanissementController.php';

require_once 'token/token.php';
require_once 'token/Privilege.php';

header('Access-Control-Allow-Methods: GET, POST,  PATCH, PUT, DELETE, OPTIONS');
header("Content-Type: application/json; charset=utf8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: TOKEN");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

if (isset($_SERVER["HTTP_TOKEN"]) && (strlen($_SERVER["HTTP_TOKEN"])>20)){
    try{
        $_TOKEN = Token::decodeToken($_SERVER["HTTP_TOKEN"])['payload'];
    }catch (Exception $e){
        http_response_code($e->getCode());
        echo $e->getMessage();
        exit;
    }
}else{
    $_TOKEN = json_decode(json_encode([
        'user_id' => 0,
        'user_firstname' => '',
        'user_lastname' => '',
        'user_role' => 0,
        'user_enterprise' => 0
    ]));
};
if ($_SERVER['REQUEST_METHOD']=="OPTIONS"){
    echo('{"options":"coucou"}');
}
else
{
    switch ($uri[2]) {
        case 'connection':
            $controller = new ConnectionController();
            $controller->routes();
            break;
        case 'apartment':
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
            $controller->routes($id, isset($uri[4])?$uri[4]:null);
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
            $controller->routes($id, isset($uri[4])?$uri[4]:null);
            break;

        case 'service_apartment':
            $controller = new Service_apartmentController();
            $id = null;
            if (isset($uri[3])) {
                $id = $uri[3];
            }
            $controller->routes($id);
            break;

        case 'service_entreprise':
            $controller = new Service_entrepriseController();
            $id = null;
            if (isset($uri[3])) {
                $id = $uri[3];
            }
            $controller->routes($id, isset($uri[4])?$uri[4]:null);
            break;
        case 'banissement':
            $controller = new BanissementController();
            $id = null;
            if (isset($uri[3])) {
                $id = $uri[3];
            }
            $controller->routes($id, isset($uri[4])?$uri[4]:null);
            break;

        default:
            // Page non trouvée
            http_response_code(404);
            echo "Page not found";
            break;
    }
}