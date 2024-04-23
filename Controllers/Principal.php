<?php

class Principal extends Controller
{
    public function __construct() {
        parent::__construct();
        session_start();
    }
    
// Vista principal
public function index()
{

    // Obtener el promedio de edad de los clientes que realizan compras
    $promedio_edad_clientes = $this->model->getPromedioEdadClientes();

    // Obtener las compras de generos con su nacionalidad
    $genero_compra_nacional = $this->model->getGeneroNacionalCompra();

    //Obtener el producto mas vendido de acuerdo a su marca de los dias 15 y 30 de cada mes 
    $producto_vendido = $this->model->getProductoVendido();

    // Obtener las tendencias de ventas por trimestre y ubicación
    $tendencias = $this->model->getTendencias();

    // Obtener un análisis de la efectividad de los vendedores por ubicación
    $efectividad = $this->model->getEfectividad();

    // Preparar los datos para la vista
    $data['title'] = 'Análisis de Datos';
    $data['promedio_edad_clientes'] = $promedio_edad_clientes;
    $data['genero_compra_nacional'] = $genero_compra_nacional;
    $data['producto_vendido'] = $producto_vendido;
    $data['tendencias'] = $tendencias;
    $data['efectividad'] = $efectividad;

    // Convertir los datos a JSON y devolverlos
    echo json_encode($data);
    die();
}


}