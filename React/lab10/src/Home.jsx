import React, { useState, useEffect } from 'react';
import MostrarTabla from './components/mostrarTabla';

import './App.css';
import Navbar from './components/Navbar';

function Home() {
  const [productos, setProductos] = useState([]);
  const [recuperado, setRecuperado] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/producto');
        const prod = await response.json();
        setProductos(prod);
        setRecuperado(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (recuperado) {
    return (
      <>
       
        <MostrarTabla productos={productos} setProductos={setProductos} />
      </>
    );
  } else {
    return <div>Recuperando datos...</div>;
  }
}

export default Home;
