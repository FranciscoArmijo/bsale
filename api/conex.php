<?php

class conectarDB{
	private $host = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
	private $usuario = 'bsale_test';
	private $clave = 'bsale_test';
	private $db = 'bsale_test';
	public $conexion;
	public function __construct(){
		$this->conexion = new mysqli($this->host, $this->usuario, $this->clave, $this->db)
		or die (mysql_error());
		$this->conexion->set_charset("utf8");
	}
	//BUSCAR
	public function buscar($tabla){
		$resultado = $this->conexion->query("SELECT * FROM $tabla") or die ($this->conexion->error);
		if($resultado){
			return $resultado->fetch_all(MYSQLI_ASSOC);
		}else{
			return false;
		}
	}
}

?>