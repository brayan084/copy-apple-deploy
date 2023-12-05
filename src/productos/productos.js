export const Productos = {
    /* Array de objeto */
    getProductsData() {
        return [
            {
                id: '1',
                nombre: 'iMac',
                nombreComercial: 'Apple iMac 27-Inch Desktop 3.4 Ghz Intel Core I7',
                imagen: 'hscyhz2/imac.png',              
                precio: 700999,
                categoria: 'Tecnología',
                cantidad: 24,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 5,
                unidadDeMedida:'Unidad',
                proveedor: 'aptecno.ar',  
                compra: 10000.00,
                url: '/imac',
            },
            {
                id: '2',
                nombre: 'MacBook Air',
                nombreComercial: 'MacBook Air M1 gris espacial 13.3 macOS',
                imagen: 'ydqCNfH/mac.png',
                precio: 499999,
                categoria: 'Tecnología',
                cantidad: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                unidadDeMedida:'Unidad',
                proveedor: 'aptecno.ar',
                compra: 900.00,
                url: "/MacBook",
            },
            {
                id: '3',
                nombre: 'iPhone',
                nombreComercial: 'Apple iPhone 12 (256 GB) - Negro',
                imagen: 'hcx9Hxy/iphone.png',
                precio: 431999,
                categoria: 'Tecnología',
                cantidad: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                unidadDeMedida:'Unidad',
                proveedor: 'appalex.ar',
                compra: 850.00,
                url: '/iphone',
            },
            {
                id: '4',
                nombre: 'Ipad Pro',
                nombreComercial: 'Apple iPad Pro (128GB) Gris espacial (5ª generación)',
                imagen: 'GT4jcRW/ipad.png',
                precio: 326999,
                categoria: 'Tecnología',
                cantidad: 24,
                inventoryStatus: 'LOWSTOCK',
                rating: 5,
                unidadDeMedida:'Unidad',
                proveedor: 'apjuan.ar',
                compra: 733.00,
                url: '/Ipad',
            },
            {
                id: '5',
                nombre: 'AirPods Max',
                nombreComercial: 'Apple AirPods Max - Gris espacial',
                imagen: '7YwNH2D/auri.png',
                precio: 288999,
                categoria: 'Tecnología',
                cantidad: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                unidadDeMedida:'Unidad',
                proveedor: 'aptecno.ar',
                compra: 384.63,
                url: '/ipods-max',
            },
            {
                id: '6', 
                nombre: 'Apple Watch',
                nombreComercial: 'Apple Watch Series 5 40mm Gps 32gb',
                imagen: 'VvWfQvb/watch.png"',
                precio: 86504,
                categoria: 'Tecnología',
                cantidad: 24,
                inventoryStatus: 'LOWSTOCK',
                rating: 5,
                unidadDeMedida:'Unidad',
                proveedor: 'appalex.ar',
                compra: 350.00,
                url: '/apple-watch',
            },

        ];
    },

    getProductsMini() { /* función que devuelve una promesa con los 6 elementos, "getProductsData" proporciona los datos */ 
        return Promise.resolve(this.getProductsData().slice(0, 6));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

};

