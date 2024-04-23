<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Title -->
    <title><?php echo TITLE . ' - ' . $data['title']; ?></title>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?php echo BASE_URL . 'assets/css/bootstrap.min.css'; ?>">
    <link rel="stylesheet" href="<?php echo BASE_URL . 'assets/css/estilo.css'; ?>">
</head>

<body>
    <div class="col-md-6 custom-class">

        <!-- Contenedor para las gráficas -->
        <div class="container mt-4">
            <div class="row">
                <H3>Rango de Clientes que adquirieron los productos mas vendidos</H3>
                <!-- Tabla de Clientes con rango -->
                <div class="row">
                    <div class="col contenedor-tabla">
                        <div id="contenedor-tabla1"></div>
                    </div>
                </div>
                <!-- Gráfica 1 -->
                <div class="col">
                    <div class="chart-container" style="position: relative; height:300px; width:100%">
                        <canvas id="grafica1"></canvas>
                    </div>
                </div>
            </div>

            <!-- Espacio entre las gráficas -->
            <div class="row mt-4">
                <div class="col"></div>
            </div>

            <H3>Grupo de clientes que consumen mas productos</H3>
            <!-- Tabla de Clientes con rango -->
            <div class="row">
                <div class="col contenedor-tabla">
                    <div id="contenedor-tabla2"></div>
                </div>
            </div>
            <!-- Gráfica 2 -->
            <div class="row">
                <div class="col">
                    <div class="chart-container" style="position: relative; height:300px; width:100%">
                        <canvas id="grafica2"></canvas>
                    </div>
                </div>
            </div>

            <!-- Espacio entre las gráficas -->
            <div class="row mt-4">
                <div class="col"></div>
            </div>

            <H3>Producto mas vendido de acuerdo a su marca de los dias 15 y 30 de cada mes</H3>
            <!-- Tabla de productos más vendidos -->
            <div class="row">
                <div class="col contenedor-tabla">
                    <div id="contenedor-tabla3"></div>
                </div>
            </div>
            <!-- Gráfica 3 -->
            <div class="row">
                <div class="col">
                    <div class="chart-container" style="position: relative; height:300px; width:100%">
                        <canvas id="grafica3"></canvas>
                    </div>
                </div>
            </div>

            <!-- Espacio entre las gráficas -->
            <div class="row mt-4">
                <div class="col"></div>
            </div>

            <H3>Tendencias de ventas por trimestre y ubicación</H3>
            <!-- Tabla de Clientes con rango -->
            <div class="row">
                <div class="col contenedor-tabla">
                    <div id="contenedor-tabla4"></div>
                </div>
            </div>
            <!-- Gráfica 4 -->
            <div class="row">
                <div class="col">
                    <div class="chart-container" style="position: relative; height:300px; width:100%">
                        <canvas id="grafica4"></canvas>
                    </div>
                </div>
            </div>

            <!-- Espacio entre las gráficas -->
            <div class="row mt-4">
                <div class="col"></div>
            </div>

            <H3>Análisis de la efectividad de los vendedores por ubicación</H3>
            <!-- Tabla de Clientes con rango -->
            <div class="row">
                <div class="col contenedor-tabla">
                    <div id="contenedor-tabla5"></div>
                </div>
            </div>
            <!-- Gráfica 5 -->
            <div class="row">
                <div class="col">
                    <div class="chart-container" style="position: relative; height:300px; width:100%">
                        <canvas id="grafica5"></canvas>
                    </div>
                </div>
            </div>
        </div>





    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/tablas.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/reporte.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/sweetalert2.all.min.js"></script>
</body>

</html>