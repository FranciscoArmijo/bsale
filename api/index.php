<?php
    include "conex.php";
    echo "<h1>Hola</h1>";
    $productos = new conectarDB();
    $respuesta = array();
    $p = $productos->buscar("product");
    var_dump($p);
?>