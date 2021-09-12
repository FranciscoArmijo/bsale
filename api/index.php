<?php
    include "conex.php";
    $productos = new conectarDB();

    if ($_SERVER['REQUESTE_METHOD']='GET') {
        $consulta = $_GET['consulta'];
        $nombreProducto = $_GET['nombreProducto'];
        if ($consulta == "") {
            $p = $productos->mostrarTodos("product");
            echo ($p);
        }
        if ($consulta == 'buscar') {
            $p = $productos->buscar("product",$nombreProducto);
            echo ($p);
        }
        if ($consulta == 'categorias') {
            $p = $productos->categorias();
            echo ($p);
        }
        
    }
    
?>