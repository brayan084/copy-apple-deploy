import Ventas2 from "./reportes_ventas-Ventas-por-Cliente";
import Ventas1 from "./reportes_ventas-Ventas-por-Fecha";
import Ventas3 from "./reportes_ventas-Ventas-por-Producto";


export default function ReportesDeVentas1() {
    return (
        <div className="reportesVentas">
            <div>
                <Ventas1 /> {/* Gráfico de Ventas por Fecha */}
            </div>
            <div>
                <Ventas2 /> {/* Gráfico de Ventas por Cliente */}
            </div>
            <div>
                <Ventas3 /> {/* Gráfico de Ventas por Producto */}
            </div>
        </div>
    )
}