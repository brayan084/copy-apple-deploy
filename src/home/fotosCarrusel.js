export const FotosCarrusel = {
    /* Array de objeto con id, nombre y el final de la url de cada img*/
    getProductsData() {
        return [
            {
                id: '1',
                nombre: 'Productos tecnologicos sobre escritorio',
                imagen: 'Wkp8Hp6/pexels-fauxels-3184451.jpg',              
            },
            {
                id: '2',
                nombre: 'Productos tecnologicos sobre escritorio', 
                imagen: 'QQvjjRb/1.png',              
            },
            {
                id: '3',
                nombre: 'Packaging del Apple Watch',
                imagen: 'VNynpYr/2.png',              
            },
            {
                id: '4',
                nombre: 'Productos tecnologicos sobre escritorio',
                imagen: 'jH1d3dh/6.png',              
            },
            {
                id: '5',
                nombre: 'foto de la MacBook Pro',
                imagen: 'wRyzLxP/5.png',              
            },
            {
                id: '6',
                nombre: 'Iphone junto al Apple Pencil y un ipad',
                imagen: 'pXvKfmT/3.png',              
            },
            

        ];
    },

    getProductsSmall() {/* función que devuelve una promesa con los 6 elementos, "getProductsData" proporciona los datos */ 
        return Promise.resolve(this.getProductsData().slice(0, 6));
    },

};

