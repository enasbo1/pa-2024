<?php

class UsersService {

    public function prepareSave($params) {
        if (
            !isset($params->firstname) ||
            !isset($params->lastname) ||
            !isset($params->email) ||
            !isset($params->password) ||
            !isset($params->address) ||
            !isset($params->country) ||
            !isset($params->city) ||
            !isset($params->postal_code) ||
            !isset($params->phone_number) ||
            !isset($params->role)
        ) {
            throw new Exception("Bad Request", 400);
        }

        $params->password = password_hash($params->password, PASSWORD_BCRYPT);

        return $params;
    }

    public function prepareUpdate($params) {
        if (
            !isset($params->id) ||
            !isset($params->firstname) ||
            !isset($params->lastname) ||
            !isset($params->email) ||
            !isset($params->password) ||
            !isset($params->address) ||
            !isset($params->country) ||
            !isset($params->city) ||
            !isset($params->postal_code) ||
            !isset($params->phone_number) ||
            !isset($params->role)
        ) {
            throw new Exception("Bad Request", 400);
        }

        $params->password = password_hash($params->password, PASSWORD_BCRYPT);

        return $params;
    }
}
?>
