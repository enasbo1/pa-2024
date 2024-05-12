<?php
namespace connection;

use Exception;
use shared\ModelType;
use shared\Verif;
use token\Token;
use users\UsersRepository;
use users\UsersService;

include_once('users/UsersService.php');

class ConnectionService implements ModelType {

    /**
     * @throws Exception
     */
    public function connect(object $params) : string {
        $params = $this->isValidType($params);
        $user = new UsersRepository();
        $values = $user->connect($params["mail"], UsersService::hash_password($params["password"]));
        if (count($values) != 0){
            $value = $values[0];
            return Token::createToken(
                $value["id"],
                $value["prenom"],
                $value["nom"],
                $value["role"]
            );
        }
        throw new Exception("bad identifiants", 401);
    }

    public function get_connection(object $params, bool $required = false) : array{
        if (isset($params->token)){
            return Token::decodeToken($params->token);
        }else{
            if ($required){
                throw new Exception("Bad Request : no tocken provided", 404);
            }else{
                return [
                    "header" => null,
                    "payload" => [
                        'user_id' => null,
                        'user_firstname' => null,
                        'user_lastname' => null,
                        'user_role' => 0
                    ]
                ];
            }
        }
    }


    public function isValidType(object $params) : array
    {
        $arr_params = $this->toArray($params);
        $valid = Verif::verification($arr_params,[
			"mail" => "r !email",
			"password" => "r"
        ]);
        if (
            $valid != "validated"
        ) {
            throw new Exception(json_encode($valid), 400);
        }

        return $arr_params;
    }

    /**
     * @throws Exception
     */
    public function toArray(object $params): array
    {
        return array_filter([
			"mail" => isset($params->mail)?$params->mail:null,
			"password" => isset($params->password)?$params->password:null
        ]);
    }
}

