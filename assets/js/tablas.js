//TABLA 1
// Obtener los datos del promedio de edad de los clientes que realizan compras
fetch('http://localhost/mineria/Principal/index', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Verificar si hay datos
    if (data.promedio_edad_clientes && data.promedio_edad_clientes.length > 0) {
        // Construir la tabla
        let tabla = '<table>';
        // Cabecera de la tabla
        tabla += '<tr><th>Rango de Edades</th><th>Cantidad Vendida</th></tr>';
        
        // Iterar sobre los datos y agregar filas a la tabla
        data.promedio_edad_clientes.forEach(cliente => {
            tabla += `<tr><td>${cliente.rango_edades}</td><td>${cliente.cantidad_total_vendida}</td></tr>`;
        });

        tabla += '</table>';

        // Agregar la tabla al contenedor en el HTML
        document.getElementById('contenedor-tabla1').innerHTML = tabla;
    } else {
        // Mostrar un mensaje si no hay datos
        document.getElementById('contenedor-tabla1').innerHTML = 'No hay datos disponibles.';
    }
})
.catch(error => {
    // Manejar errores
    console.error('Error al obtener los datos:', error);
});



//TABLA 2
// Llamada a la API para obtener datos y generar la tabla de grupo de género que compra más productos
fetch('http://localhost/mineria/Principal/index', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Verificar si hay datos
    if (data.genero_compra_nacional && data.genero_compra_nacional.length > 0) {
        // Construir la tabla
        let tabla = '<table>';
        // Cabecera de la tabla
        tabla += '<tr><th>Género</th><th>Fecha Inicio Compra</th><th>Fecha Fin Compra</th><th>Total Compras</th></tr>';
        
        // Iterar sobre los datos y agregar filas a la tabla
        data.genero_compra_nacional.forEach(item => {
            tabla += `<tr><td>${item.genero}</td><td>${item.fecha_inicio_compra}</td><td>${item.fecha_fin_compra}</td><td>${item.total_compras}</td></tr>`;
        });

        tabla += '</table>';

        // Agregar la tabla al contenedor en el HTML
        document.getElementById('contenedor-tabla2').innerHTML = tabla;
    } else {
        // Mostrar un mensaje si no hay datos
        document.getElementById('contenedor-tabla2').innerHTML = 'No hay datos disponibles.';
    }
})
.catch(error => {
    // Manejar errores
    console.error('Error al obtener los datos:', error);
});








//TABLA 3
// Obtener los datos del producto más vendido de acuerdo a su marca de los días 15 y 30 de cada mes
fetch('http://localhost/mineria/Principal/index', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Verificar si hay datos
    if (data.producto_vendido && data.producto_vendido.length > 0) {
        // Construir la tabla
        let tabla = '<table>';
        // Cabecera de la tabla
        tabla += '<tr><th>Producto ID</th><th>Nombre Producto</th><th>Marca</th><th>Rango Edad</th></tr>';
        
        // Iterar sobre los datos y agregar filas a la tabla
        data.producto_vendido.forEach(producto => {
            tabla += `<tr><td>${producto.producto_id}</td><td>${producto.nombre_producto}</td><td>${producto.marca}</td><td>${producto.rango_edad}</td></tr>`;
        });

        tabla += '</table>';

        // Agregar la tabla al contenedor en el HTML
        document.getElementById('contenedor-tabla3').innerHTML = tabla;
    } else {
        // Mostrar un mensaje si no hay datos
        document.getElementById('contenedor-tabla3').innerHTML = 'No hay datos disponibles.';
    }
})
.catch(error => {
    // Manejar errores
    console.error('Error al obtener los datos:', error);
});






// Llamada a la API para obtener datos y generar la tabla de tendencias de ventas por trimestre y ubicación
fetch('http://localhost/mineria/Principal/index', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Verificar si hay datos
    if (data.tendencias && data.tendencias.length > 0) {
        // Construir la tabla
        let tabla = '<table>';
        // Cabecera de la tabla
        tabla += '<tr><th>Trimestre</th><th>Nombre Producto</th><th>País de Origen</th><th>Cantidad Vendida</th></tr>';
        
        // Iterar sobre los datos y agregar filas a la tabla
        data.tendencias.forEach(item => {
            tabla += `<tr><td>${item.trimestre}</td><td>${item.nombre_producto}</td><td>${item.pais_origen}</td><td>${item.cantidad_vendida}</td></tr>`;
        });

        tabla += '</table>';

        // Agregar la tabla al contenedor en el HTML
        document.getElementById('contenedor-tabla4').innerHTML = tabla;
    } else {
        // Mostrar un mensaje si no hay datos
        document.getElementById('contenedor-tabla4').innerHTML = 'No hay datos disponibles.';
    }
})
.catch(error => {
    // Manejar errores
    console.error('Error al obtener los datos:', error);
});







//TABLA 5
// Llamada a la API para obtener datos y generar la tabla de análisis de la efectividad de los vendedores por ubicación
fetch('http://localhost/mineria/Principal/index', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Verificar si hay datos
    if (data.efectividad && data.efectividad.length > 0) {
        // Construir la tabla
        let tabla = '<table>';
        // Cabecera de la tabla
        tabla += '<tr><th>Trimestre</th><th>Nombre Vendedor</th><th>Total Productos Vendidos</th></tr>';
        
        // Iterar sobre los datos y agregar filas a la tabla
        data.efectividad.forEach(item => {
            tabla += `<tr><td>${item.trimestre}</td><td>${item.nombre_vendedor}</td><td>${item.total_productos_vendidos}</td></tr>`;
        });

        tabla += '</table>';

        // Agregar la tabla al contenedor en el HTML
        document.getElementById('contenedor-tabla5').innerHTML = tabla;
    } else {
        // Mostrar un mensaje si no hay datos
        document.getElementById('contenedor-tabla5').innerHTML = 'No hay datos disponibles.';
    }
})
.catch(error => {
    // Manejar errores
    console.error('Error al obtener los datos:', error);
});
