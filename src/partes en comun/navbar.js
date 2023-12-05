import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';

export default function Navbar() {
  // Estado para almacenar el token de usuario
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("firebaseToken"));

  const handleLogout = async () => {
    try {
      // Código para cerrar sesión
      localStorage.removeItem("firebaseToken");
      window.location.reload();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  // elementos del menú
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      url: '/'
    },
    {
      label: 'Productos',
      icon: 'pi pi-fw pi-apple',
      url: '/productos/listadoDeProductos'
    },
    {
      label: 'Proveedores',
      icon: 'pi pi-fw pi-users',
      url: '/clientes y proveedores/proveedores'
    },
    {
      label: 'Clientes',
      icon: 'pi pi-fw pi-user-plus',
      url: '/clientes y proveedores/clientes'
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-fw pi-user-plus',
      url: '/pedidos/pedidosMain'
    },
    {
      label: 'Reportes',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'Reportes de ventas',
          icon: 'pi pi-fw pi-chart-bar',
          url: '/reportes/reportes_ventas'
        },
        {
          label: 'Reportes de compras',
          icon: 'pi pi-fw pi-chart-bar',
          url: '/reportes/reportes_compras'
        }
      ]
    },
    isLoggedIn
      ? {
          label: 'Log out',
          icon: 'pi pi-fw pi-sign-out',
          command: handleLogout,
          className: 'custom-menu-item custom-menu-item-right', // Nueva clase CSS
        }
      : {
          label: 'Log in',
          icon: 'pi pi-fw pi-user-plus',
          url: '/FirebaseBackend/componenetes/login',
          className: 'p-menuitem-end', // Clase CSS de PrimeReact para mantener a la derecha
          styleClass: 'custom-menu-item',
          style: { marginLeft: 'auto', }
        }
  ];

  // Filtra los elementos del menú según si tienes un token de usuario o no
  const filteredItems = isLoggedIn ? items : [items[0], items[items.length - 1]];

  return (
    <div className='menu-container'>
      <Menubar model={filteredItems} />
    </div>
  );
}