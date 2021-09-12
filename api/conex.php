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
	//mostrar TODOS LOS PRODUCTOS
	public function mostrarTodos($tabla){
		//Se crea la consulta
		$resultado = $this->conexion->query("SELECT * FROM $tabla") or die ($this->conexion->error);
		//se agregan los resultados a unn nuevo array para convertirlos en json
		if($resultado){
			$respuesta['productos'] = array();
			foreach($resultado as $key){
				$datos = array();
				foreach($key as $k => $v){
					$datos[$k] = $v;
				};
				array_push($respuesta['productos'], $datos);
					
			}
			//array nuevo se convierte en json
			echo json_encode($respuesta);
		}else{
			return false;
		}
	}
	
	//BUSCAR POR NOMBRE
	public function buscar($tabla, $producto){
		//ACÁ SE BUSCARA POR EL NOMBRE DLE PRODUCTO MIENTRAS SE ESCRIBA EN EL INPUT
		$resultado = $this->conexion->query("SELECT * FROM $tabla WHERE name LIKE '%".$producto."%'") or die ($this->conexion->error);
		//se agregan los resultados a unn nuevo array para convertirlos en json
		if($resultado){
			$respuesta['producto'] = array();
			foreach($resultado as $key){
				$datos = array();
				foreach($key as $k => $v){
					$datos[$k] = $v;
				};
				array_push($respuesta['producto'], $datos);
					
			}
			//array nuevo se convierte en json
			echo json_encode($respuesta);
		}else{
			return false;
		}
	}

	//obtener als categorias

	public function categorias(){
		$resultado = $this->conexion->query("SELECT DISTINCT category FROM product") or die ($this->conexion->error);
		if($resultado){
			$respuesta['categorias'] = array();
			foreach($resultado as $key){
				$datos = array();
				foreach($key as $k => $v){
					$datos[$k] = $v;
				};
				array_push($respuesta['categorias'], $datos);
					
			}
			//array nuevo se convierte en json
			echo json_encode($respuesta);
		}else{
			return false;
		}
	}
}

?>