<?php
class PrincipalModel extends Query
{

    public function __construct()
    {
        parent::__construct();
    }

    // Promedio de edad de los clientes que realizan compras:
    public function getPromedioEdadClientes()
    {
        $sql = "SELECT 
        rango_edades,
        nombre_producto AS producto_mas_vendido,
        SUM(cantidad_vendida) AS cantidad_total_vendida
    FROM (
        SELECT 
            CASE
                WHEN edad >= 20 AND edad < 25 THEN 'Clientes de 20 a 24 años'
                WHEN edad >= 25 AND edad < 30 THEN 'Clientes de 25 a 29 años'
                WHEN edad >= 30 AND edad < 35 THEN 'Clientes de 30 a 34 años'
                WHEN edad >= 35 AND edad < 40 THEN 'Clientes de 35 a 39 años'
                WHEN edad >= 40 AND edad < 45 THEN 'Clientes de 40 a 44 años'
                WHEN edad >= 45 AND edad < 50 THEN 'Clientes de 45 a 49 años'
                WHEN edad >= 50 AND edad < 55 THEN 'Clientes de 50 a 54 años'
                WHEN edad >= 55 AND edad < 60 THEN 'Clientes de 55 a 59 años'
                WHEN edad >= 60 AND edad < 65 THEN 'Clientes de 60 a 64 años'
                WHEN edad >= 65 AND edad < 70 THEN 'Clientes de 65 a 69 años'
                WHEN edad >= 70 THEN 'Clientes de 70 años o más'
                ELSE 'Otro'
            END AS rango_edades,
            Dim_Producto.nombre_producto,
            Venta_Hechos.cantidad_vendida
        FROM 
            Dim_Cliente
        JOIN 
            Venta_Hechos ON Dim_Cliente.cliente_id = Venta_Hechos.cliente_id
        JOIN 
            Dim_Producto ON Venta_Hechos.producto_id = Dim_Producto.producto_id
    ) AS ventas_por_producto
    GROUP BY 
        rango_edades;
";

        return $this->selectAll($sql);
    }

    // Que grupo de genero compra mas productos de un determinado tiempo en su nacionalidad:
    public function getGeneroNacionalCompra()
    {
        $sql = "SELECT
        dc.nacionalidad,
        dc.genero,
        MIN(df.fecha) AS fecha_inicio_compra,
        MAX(df.fecha) AS fecha_fin_compra,
        COUNT(*) AS total_compras
    FROM
        Venta_Hechos vh
    JOIN
        Dim_Cliente dc ON vh.cliente_id = dc.cliente_id
    JOIN
        Dim_Fecha df ON vh.fecha_id = df.fecha_id
    GROUP BY
        dc.nacionalidad,
        dc.genero
    ORDER BY
        total_compras DESC;
";

        return $this->selectAll($sql);
    }


    //Producto mas vendido de acuerdo a su marca de los dias 15 y 30 de cada mes 
    public function getProductoVendido()
    {
        $sql = "WITH Ventas_Top AS (
            SELECT 
                dh.producto_id,
                dp.nombre_producto,
                dp.marca,
                SUM(dh.cantidad_vendida) AS total_vendido
            FROM 
                Venta_Hechos dh
            JOIN Dim_Producto dp ON dh.producto_id = dp.producto_id
            JOIN Dim_Fecha df ON dh.fecha_id = df.fecha_id
            WHERE 
                df.dia IN (15, 30)
            GROUP BY 
                dh.producto_id, dp.nombre_producto, dp.marca
        ), 
        Rank_Productos AS (
            SELECT 
                producto_id,
                nombre_producto,
                marca,
                total_vendido,
                ROW_NUMBER() OVER(PARTITION BY marca ORDER BY total_vendido DESC) AS ranking
            FROM 
                Ventas_Top
        )
        SELECT DISTINCT
            rp.producto_id,
            rp.nombre_producto,
            rp.marca,
            rp.total_vendido,
            dc.nacionalidad,
            CONCAT(MIN(dc.edad), ' - ', MAX(dc.edad)) AS rango_edad
        FROM 
            Rank_Productos rp
        JOIN Venta_Hechos dh ON rp.producto_id = dh.producto_id
        JOIN Dim_Cliente dc ON dh.cliente_id = dc.cliente_id
        WHERE 
            ranking = 1 -- Solo el producto más vendido por marca
        GROUP BY 
            rp.producto_id;
";

        return $this->selectAll($sql);
    }


     // Tendencias de ventas por trimestre y ubicación
     public function getTendencias()
     {
         $sql = "SELECT 
         df.trimestre,
         dh.ubicacion_venta,
         dp.nombre_producto,
         dp.pais_origen,
         SUM(dh.cantidad_vendida) AS cantidad_vendida
     FROM 
         Venta_Hechos dh
     JOIN 
         Dim_Fecha df ON dh.fecha_id = df.fecha_id
     JOIN 
         Dim_Producto dp ON dh.producto_id = dp.producto_id
     WHERE 
         dh.ubicacion_venta IS NOT NULL
     GROUP BY 
         df.trimestre, dh.ubicacion_venta, dp.nombre_producto, dp.pais_origen
     ORDER BY 
         df.trimestre, dh.ubicacion_venta;
 ";
 
         return $this->selectAll($sql);
     }

     



      // Análisis de la efectividad de los vendedores por ubicación
    public function getEfectividad()
    {
        $sql = "WITH VentasPorTrimestreUbicacion AS (
            SELECT 
                df.trimestre,
                dv.nombre_vendedor,
                SUM(vh.cantidad_vendida) AS cantidad_vendida,
                vh.ubicacion_venta,
                dp.nombre_producto
            FROM 
                Venta_Hechos vh
            JOIN Dim_Vendedor dv ON vh.vendedor_id = dv.vendedor_id
            JOIN Dim_Producto dp ON dp.producto_id = vh.producto_id
            JOIN Dim_Fecha df ON vh.fecha_id = df.fecha_id
            GROUP BY 
                df.trimestre, dv.nombre_vendedor
        )
        
        SELECT 
            trimestre,
            nombre_vendedor,
            SUM(cantidad_vendida) AS total_productos_vendidos,
            ubicacion_venta,
            nombre_producto
        FROM 
            VentasPorTrimestreUbicacion
        GROUP BY 
            trimestre, nombre_vendedor
        ORDER BY 
            trimestre DESC, total_productos_vendidos ASC;
        
";

        return $this->selectAll($sql);
    }

 
    
}
