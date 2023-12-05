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

export default function Ventas1() {

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('https://deploybackendtp-44411f5799d1.herokuapp.com/reporteVentas/ventas1');
      const datos = response.data['Resultado'];
      setData(datos);


    } catch (error) {
      console.log(error);
    }
  }

  const [data, setData] = useState([]);


  const sumByDate = data.reduce((acc, item) => {
    const fecha = item.fechaDeCarga;
    const cantidad = item.cantidad;

    if (acc[fecha]) {
      acc[fecha] += cantidad;
    } else {
      acc[fecha] = cantidad;
    }

    return acc;
  }, {});

  // console.log(sumByDate);


  // Preparar datos para el gráfico
  const labels = Object.keys(sumByDate).map(date => date)
  const values = Object.values(sumByDate).map(value => value)



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
        text: 'Gráfico de Ventas por Fecha',
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
    labels: labels,
    datasets: [
      {
        label: 'Numero de ventas',
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
