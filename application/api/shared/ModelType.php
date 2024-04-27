<?php
namespace shared;

interface ModelType{
    public function isValidType(object $params):object;

    public function toArray(object $params):array;
}