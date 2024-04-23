document.addEventListener('DOMContentLoaded', function () {
    // Hacer una solicitud AJAX para obtener los datos de ingresos por marca
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost/mineria/Principal/index', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            // Preparar datos para la primera gráfica (productos comprados por rango de clientes)
var productosCompradosData = [];
var labels = [];
data.promedio_edad_clientes.forEach(function(item) {
    labels.push(item.rango_edades + ": " + item.producto_mas_vendido); // Agregar el rango de edades al glosario
    productosCompradosData.push(item.producto_mas_vendido); // Productos comprados por el rango de clientes
});

// Configurar la primera gráfica como un gráfico de pastel
var ctx2 = document.getElementById('grafica1').getContext('2d');
var grafica1 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Productos Comprados por Rango de Edades',
            data: productosCompradosData.map(function(producto) { return 1; }), // Valor de 1 para cada producto
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var index = tooltipItem.index;
                    var producto = productosCompradosData[index];
                    return "Producto Comprado: " + producto;
                }
            }
        }
    }
});


            // Preparar datos para la segunda gráfica (compras por género y nacionalidad)
var generoNacionalData = [];
data.genero_compra_nacional.forEach(function(item) {
    var label = `${item.nacionalidad}\n - Inicio: ${item.fecha_inicio_compra}\nFin: ${item.fecha_fin_compra}`;
    var value = item.total_compras;
    generoNacionalData.push({ label: label, value: value });
});

// Configurar la segunda gráfica como un gráfico de pastel
var ctx5 = document.getElementById('grafica2').getContext('2d');
var grafica2 = new Chart(ctx5, {
    type: 'pie',
    data: {
        labels: generoNacionalData.map(function(item) { return item.label; }),
        datasets: [{
            label: 'Compras por Género y Nacionalidad',
            data: generoNacionalData.map(function(item) { return item.value; }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});



            // Preparar datos para la tercera gráfica (productos vendidos por rango de edad)
            var productosVendidosData = [];
            var labels = [];
            var nacionalidades = []; // Array para almacenar las nacionalidades
            data.producto_vendido.forEach(function(item) {
                labels.push(item.nacionalidad + " de " + item.rango_edad + " Edad"); // Agregar la nacionalidad como etiquetas
                productosVendidosData.push({
                    rango_edad: item.rango_edad,
                    total_vendido: item.total_vendido,
                    nombre_producto: item.nombre_producto
                }); 
            });

            // Configurar la tercera gráfica como un gráfico de barras
            var ctx3 = document.getElementById('grafica3').getContext('2d');
            var grafica3 = new Chart(ctx3, {
                type: 'bar', // Utilizar el tipo de gráfico "bar"
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Productos Vendidos por Nacionalidad',
                        data: productosVendidosData.map(function(item) { return item.total_vendido; }), // Usar la cantidad vendida como datos
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var index = tooltipItem.index;
                                var rangoEdad = productosVendidosData[index].rango_edad;
                                var totalVendido = productosVendidosData[index].total_vendido;
                                var nombreProducto = productosVendidosData[index].nombre_producto; // Agregando el nombre del producto
                                return `Producto: ${nombreProducto} - Rango de Edad: ${rangoEdad} Cantidad: ${totalVendido}`;
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });


            // Preparar datos para la cuarta gráfica (tendencias de ventas por trimestre y ubicación)
            var tendenciasData = [];
            data.tendencias.forEach(function(item) {
                var label = `${item.nombre_producto} - ${item.ubicacion_venta}`;
                var value = item.cantidad_vendida;
                tendenciasData.push({ label: label, value: value });
            });

            // Configurar la cuarta gráfica como un gráfico de pastel
            var ctx4 = document.getElementById('grafica4').getContext('2d');
            var grafica4 = new Chart(ctx4, {
                type: 'pie',
                data: {
                    labels: tendenciasData.map(function(item) { return item.label; }),
                    datasets: [{
                        label: 'Tendencias de Ventas por Producto y Ubicación',
                        data: tendenciasData.map(function(item) { return item.value; }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });


            // Preparar datos para la quinta gráfica (efectividad de los vendedores por ubicación)
            var efectividadData = [];
            data.efectividad.forEach(function(item) {
                var label = `${item.nombre_vendedor} - ${item.ubicacion_venta} Vendio: ${item.nombre_producto}`;
                var value = item.total_productos_vendidos;
                efectividadData.push({ label: label, value: value });
            });

            // Configurar la quinta gráfica como un gráfico de pastel
            var ctx5 = document.getElementById('grafica5').getContext('2d');
            var grafica5 = new Chart(ctx5, {
                type: 'pie',
                data: {
                    labels: efectividadData.map(function(item) { return item.label; }),
                    datasets: [{
                        label: 'Efectividad de los Vendedores por Ubicación',
                        data: efectividadData.map(function(item) { return item.value; }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            //fin de las graficas



        }
    };
    xhr.send();
});
