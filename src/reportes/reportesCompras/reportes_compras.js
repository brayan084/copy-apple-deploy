import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { InputNumber } from 'primereact/inputnumber';
// import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Reportes2() {

  let emptyCompra = {
    id: null,
    proveedor: '',
    imac: 0,
    macbook: 0,
    iphone: 0,
    ipadPro: 0,
    airPods: 0,
    watch: 0
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reporteCompras/compras');
      // console.log(response.data);
      setData(response.data.compras);
      setNomProveedor(response.data.resultado);

    } catch (error) {
      console.log(error);
    }
  }

  const [data, setData] = useState([]);
  const [compra, setCompra] = useState(emptyCompra);
  const [NomProveedor, setNomProveedor] = useState([]);
  const [inputDialog, setDialog] = useState(false);


  const Cosas = NomProveedor.map((items) => {
    return items.map((item) => {
      return item.nombre
    })
  })
  const nombreDeProveedor = [...new Set(Cosas.flat())];

  // console.log(nombreDeProveedor);
  const hideDialog = () => {
    setDialog(false);
  }

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _venta = { ...compra };

    _venta[`${name}`] = val;

    setCompra(_venta);

  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _venta = { ...compra };

    _venta[`${name}`] = val;

    setCompra(_venta);
  };

  const saveCompra = async () => {
    try {
      await axios.post('http://localhost:3001/reporteCompras/buyer', compra);
      hideDialog();
      getData();
      setCompra(emptyCompra);
    } catch (error) {
      console.log(error)
    }
  }

  // opcciones
  let misoptions = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgba(255, 255, 255)'
        }
      },
      title: {
        display: true,
        text: 'Reportes de compras (mes de julio)',
        color: 'rgba(255, 255, 255)'
      },
    },
    scales: {
      y: {
        min: 0,
        max: 30,
        ticks: { color: 'rgba(255, 255, 255)' }
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255)' }
      }
    }
  };

  // son las columnas de la tabla
  let midata = {
    labels: data.map((item) => {
      return item.proveedor
    }),
    datasets: [
      {
        label: 'iMac',
        data: data.map((item) => {
          return item.imac
        }),
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(81, 45, 168, 0.5)', // Morado oscuro con menos opacidad
        backgroundColor: 'rgba(81, 45, 168, 0.9)',
        pointRadius: 5,
        pointBorderColor: 'rgba(81, 45, 168, 0.8)',
        pointBackgroundColor: 'rgba(81, 45, 168, 0.8)',
      },
      {
        label: 'Macbook',
        data: data.map((item) => {
          return item.macbook
        }),
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(0, 123, 255, 0.5)', // Azul con menos opacidad
        backgroundColor: 'rgba(0, 123, 255, 0.9)',
        pointRadius: 5,
        pointBorderColor: 'rgba(0, 123, 255, 0.8)',
        pointBackgroundColor: 'rgba(0, 123, 255, 0.8)',
      },
      {
        label: 'IPhone',
        data: data.map((item) => {
          return item.iphone
        }),
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(255, 152, 0, 0.5)', // Naranja con menos opacidad
        backgroundColor: 'rgba(255, 152, 0, 0.9)',
        pointRadius: 5,
        pointBorderColor: 'rgba(255, 152, 0, 0.8)',
        pointBackgroundColor: 'rgba(255, 152, 0, 0.8)',
      },
      {
        label: 'IPadPro',
        data: data.map((item) => {
          return item.ipadPro
        }),
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(29, 161, 242, 0.5)', // Azul claro con menos opacidad
        backgroundColor: 'rgba(29, 161, 242, 0.9)',
        pointRadius: 5,
        pointBorderColor: 'rgba(29, 161, 242, 0.8)',
        pointBackgroundColor: 'rgba(29, 161, 242, 0.8)',
      },
      {
        label: 'AirPods',
        data: data.map((item) => {
          return item.airPods
        }),
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(0, 200, 83, 0.5)', // Verde con menos opacidad
        backgroundColor: 'rgba(0, 200, 83, 0.9)',
        pointRadius: 5,
        pointBorderColor: 'rgba(0, 200, 83, 0.8)',
        pointBackgroundColor: 'rgba(0, 200, 83, 0.8)',
      },
      {
        label: 'Apple Watch',
        data: data.map((item) => {
          return item.watch
        }),
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(220, 53, 69, 0.5)', // Rojo con menos opacidad
        backgroundColor: 'rgba(220, 53, 69, 0.9)',
        pointRadius: 5,
        pointBorderColor: 'rgba(220, 53, 69, 0.8)',
        pointBackgroundColor: 'rgb(220, 53, 69)',
      }
    ]
  };


  // el html que se renderiza

  return (
    <div className='flex justify-content-center text-center py-4 px-4 mx-0 mt-1 lg:mx-8'>
      <Bar data={midata} options={misoptions} />

      <div>
        <form >
          <Dialog visible={inputDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" header="añadir compra" onHide={hideDialog}>
            <div className="field">
              <label htmlFor="proveedor" className="font-bold">
                Ingresar nombre del proveedor
              </label>
              <Dropdown id="proveedor" value={compra.proveedor} options={nombreDeProveedor}
                showClear
                placeholder="Select a Provider"
                className="w-full "
                onChange={e => onInputChange(e, 'proveedor')} />
            </div>
            {/* <div className="field">
              <label htmlFor="proveedor" className="font-bold">
                Ingresar nombre del proveedor
              </label>
              <InputText id="proveedor" value={compra.proveedor} onChange={e => onInputChange(e, 'proveedor')} />
            </div> */}
            <div className="field">
              <label htmlFor="imac" className="font-bold">
                Cantidad de Imac
              </label>
              <InputNumber id='imac' value={compra.imac} onValueChange={e => onInputNumberChange(e, 'imac')} showButtons />
            </div>
            <div className="field">
              <label htmlFor="Macbook" className="font-bold">
                Cantidad de Macbook
              </label>
              <InputNumber id='Macbook' value={compra.macbook} onValueChange={e => onInputNumberChange(e, 'macbook')} showButtons />
            </div>
            <div className="field">
              <label htmlFor="iphone" className="font-bold">
                Cantidad de Iphone
              </label>
              <InputNumber id='iphone' value={compra.iphone} onValueChange={e => onInputNumberChange(e, 'iphone')} showButtons />
            </div>
            <div className="field">
              <label htmlFor="ipadPro" className="font-bold">
                Cantidad de IpadPro
              </label>
              <InputNumber id='ipadPro' value={compra.ipadPro} onValueChange={e => onInputNumberChange(e, 'ipadPro')} showButtons />
            </div>
            <div className="field">
              <label htmlFor="AirPods" className="font-bold">
                Cantidad de AirPods
              </label>
              <InputNumber id='AirPods' value={compra.airPods} onValueChange={e => onInputNumberChange(e, 'airPods')} showButtons />
            </div>
            <div className="field">
              <label htmlFor="Apple Watch" className="font-bold">
                Cantidad de Apple Watch
              </label>
              <InputNumber id='Apple Watch' value={compra.watch} onValueChange={e => onInputNumberChange(e, 'watch')} showButtons />
            </div>
            <div>
              <Button type='submit' onClick={saveCompra} icon='pi pi-check' className='btn btn-primary' label='Guardar' />
            </div>

          </Dialog>
        </form>
      </div>
      <div>
        <Button className='btn btn-success' onClick={() => setDialog(true)}>Agregar</Button>
      </div>
    </div>
  )
}
