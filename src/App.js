import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./FirebaseBackend/config/firebase"
import './App.css';
import Navbar from './partes en comun/navbar';
/* import NavbarL from './navbarL1'; */
import LoginPage from './FirebaseBackend/componenetes/login';
import Carrusel from './home/carrusel';
import Hero from './home/hero';
import Catalogo from './home/catalogo';
import ListadoDeProductos from './productos/listadoDeProductos';
import Footer from './partes en comun/footer';
import Pedidos from './pedidos/pedidos';
// import Reportes2 from './reportes/reportesCompras/reportes_compras';
// import Reportes1 from './reportes/reportesVentas/reportes_ventas-Ventas-por-Fecha';
import ReportesVentas1 from './reportes/reportesVentas';
// import Clientes from './clientes y proveedores/clientes';
// import Proveedores from './clientes y proveedores/proveedores';
import InputDemo from './productos/formulario';
/* import InputDemo2 from './clientes y proveedores/formularioPro'; */
import Pantalla_producto_iphone from './pantallas de productos/pantalla del producto iphone/pantalla';
import Pantalla_producto_ipods_max from './pantallas de productos/pantalla del producto ipod max/pantalla';
import Pantalla_producto_imac from './pantallas de productos/pantalla del producto imac/pantalla'
import Pantalla_producto_watch from './pantallas de productos/pantalla del producto apple watch/pantalla';
import Pantalla_producto_ipad from './pantallas de productos/pantalla del producto ipad/pantalla';
import Pantalla_producto_MacBook_Air from './pantallas de productos/pantalla del producto MacBook Air/pantalla';
import Proveedores from './clientes y proveedores/proveedores';
import Clientes from './clientes y proveedores/ejemploClientes';
import PedidosMain from './pedidos/pedidosMain';
// import ReportesVentas from './reportes/reportesVentas';
import ReportesCompras1 from './reportes/reportesCompras';

/* importamos cada componente */


function App() {
  return (
    <div> {/* usando "react-router-dom" creamos las rutas de los componentes */}
      <Router>
        <Navbar />
        {/* menu */}
        <Routes>
          <Route path='/' element={<><><Hero /><Carrusel /></><Catalogo /></>}></Route>
          <Route path='/FirebaseBackend/componenetes/login' element={<LoginPage />}></Route>
          <Route path='/productos/listadoDeProductos' element={<ProtectedRoute>
            <ListadoDeProductos />
          </ProtectedRoute>}>
          </Route>
          <Route path='/productos/formulario' element={<ProtectedRoute>
            <InputDemo />
          </ProtectedRoute>}>
          </Route>
          <Route path='/clientes y proveedores/proveedores' element={<ProtectedRoute>
            <Proveedores />
          </ProtectedRoute>}>
          </Route>
          <Route path='/clientes y proveedores/clientes' element={<ProtectedRoute>
            <Clientes />
          </ProtectedRoute>}>
          </Route>
          <Route path='/pedidos/pedidos' element={<ProtectedRoute>
            <Pedidos /> 
          </ProtectedRoute>}>
          </Route>
          <Route path='/pedidos/pedidosMain' element={<ProtectedRoute>
            <PedidosMain />
          </ProtectedRoute>}>
          </Route>
          <Route path='/reportes/reportes_ventas' element={<ProtectedRoute>
            <ReportesVentas1 />
          </ProtectedRoute>}>
          </Route>
          <Route path='/reportes/reportes_compras' element={<ProtectedRoute>
            <ReportesCompras1 />
          </ProtectedRoute>}>
          </Route>
          <Route path='/iphone' element={<Pantalla_producto_iphone />}></Route>
          <Route path='/ipods-max' element={<Pantalla_producto_ipods_max />}></Route>
          <Route path='/MacBook' element={<Pantalla_producto_MacBook_Air />}></Route>
          <Route path='/Imac' element={<Pantalla_producto_imac />}></Route>
          <Route path='/Ipad' element={<Pantalla_producto_ipad />}></Route>
          <Route path='/apple-watch' element={<Pantalla_producto_watch />}></Route>
        </Routes>
        <Footer /> {/* pie de pagina */}
      </Router>
    </div>
  );
}


const ProtectedRoute = ({ redirectPath = "/", children }) => {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken")
    if (token) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate(redirectPath)
        }
      })
    } else {
      navigate(redirectPath)
    }
  }, [])

  return children
}

export default App;


