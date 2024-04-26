<?php
namespace test;
use Exception;
require_once 'TestRepository.php';

class TestController {

    /**
     * @throws Exception
     */
    public function routes($id = null): void
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $request = new TestRepository();
                if ($id == null) {
                    $test = $request->getAll();
                    echo json_encode($test);
                } else {
                    try {
                        $test = $request->findById($id);
                        echo json_encode($test);
                    } catch (Exception $e) {
                        http_response_code($e->getCode());
                        echo $e->getMessage();
                    }
                }
                break;
            case "POST":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new TestRepository();

                try {
                    $request->save($params);
                    http_response_code(201);
                    echo("test créé avec succès");
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "PATCH":
                $body = file_get_contents("php://input");
                $params = json_decode($body);
                $request = new TestRepository();

                try {
                    $request->update($params);
                } catch (Exception $e) {
                    http_response_code($e->getCode());
                    echo $e->getMessage();
                }
                break;
            case "DELETE":
                $request = new TestRepository();
                $request->delete($id);
                break;
        }
    }
}
