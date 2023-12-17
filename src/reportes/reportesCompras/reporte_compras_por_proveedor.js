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

export default function ComprasPorProveedor() {

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/reporteCompras/ComprasPorProveedor');
      // const datos1 = response.data['Resultado1'];
      // setData1(datos1);
      const datos2 = response.data['Resultado2'];
      setData2(datos2);
      
      // console.log(response.data);


    } catch (error) {
      console.log(error);
    }
  }

  // const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);




  // Preparar datos para el gráfico
  const labels = data2.map((dato) => dato.nombre);
  const values = labels.map(() => Math.floor(Math.random() * 1000000) + 1);



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
        text: 'Gráfico de Compras por Proveedor',
        color: 'rgba(255, 255, 255)'
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1000000,
        ticks: { color: 'rgba(255, 255, 255)' }
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255)' }
      }
    }
  };

  // son las columnas de la tabla
  let midata = {
    labels: labels,
    datasets: [
      {
        label: 'Valor en pesos $',
        data: values,
        tension: 0.5,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };


  // el html que se renderiza

  return (
    <div >
      <div>
        <Bar data={midata} options={misoptions} height={'500px'} width={'auto'} />
      </div>
    </div>
  )
}
