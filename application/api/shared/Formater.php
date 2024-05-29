<?php

namespace shared;

use Exception;

class Formater
{
    /**
     * @throws Exception
     */
    public static function prepareGet(array $values):array{
        $val = [];
        foreach($values as $col=>$value){
            $i = explode("__",$col);
            if(count($i)==1){
                $val[$i[0]] = $value;
            }else{
                $val[$i[0]][$i[1]] = $value;
            }
        }
        return $val;
    }
}