import ComprasPorProveedor from "./reporte_compras_por_proveedor";
import ComprasPorProdcuto from "./reporte_compras_por_producto";



export default function ReportesCompras1() {
    return (
        <div className="reportesCompras">
            <div>
                <ComprasPorProveedor /> {/* Gráfico de Ventas por Fecha */}
            </div>
            <div>
                <ComprasPorProdcuto/> {/* Gráfico de Ventas por Fecha */}
            </div>
        </div>
    )
}