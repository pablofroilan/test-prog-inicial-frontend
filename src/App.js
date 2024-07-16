import logo from './logo.svg';
import './App.css';
import { crearDatos, Grilla } from "./components/GrillaDispositivos";
import { Combobox } from './components/FiltrosCombobox';
import { useEffect, useState } from 'react';

const api = 'http://127.0.0.1:8000/api';

function armarTuplasDispositivos({seleccionBodega, bodegas, dispositivos}) {
  //console.log(dispositivos);
  const tuplasDispositivos = [];

  dispositivos.map(
    (dispositivo) => {
      let bodega =[];
      
      if (seleccionBodega==='') {
        bodega = bodegas.find((bodeg) => bodeg.bodega_id === dispositivo.bodega_id);
      }else{
        bodega = bodegas.find((bodeg) => bodeg.bodega_id === seleccionBodega);
      }
      if(dispositivo.bodega_id===seleccionBodega){
        return ( 
          tuplasDispositivos.push(crearDatos(
            dispositivo.dispositivo_id,
            dispositivo.dispositivo_nombre,
            dispositivo.marca_nombre,
            dispositivo.modelo_nombre,
            bodega.bodega_nombre
          ))
        )
      }
    }
  )


  return tuplasDispositivos;
}

function App() {

  const [bodegas, setBodegas] = useState([]);

  useEffect(
    () => {
      
      fetch(api+'/bodegas')
        .then((response) => response.json())
        .then((datos) => {
          setBodegas(datos);
          
        })
        .catch((err) => {
          console.log(err.message);
        })
    },
    []

  );

  const [marcas, setMarcas] = useState([]);

  useEffect(
    () => {
      fetch(api+'/marcas')
        .then((response) => response.json())
        .then((datos) => {
          setMarcas(datos);
        })
        .catch((err) => {
          console.log(err.message);
        })
    },
    []
  );

  const [modelos, setModelos] = useState([]);

  useEffect(
    () => {
      fetch(api+'/modelos')
        .then((response) => response.json())
        .then((datos) => {
          setModelos(datos);
        })
        .catch((err) => {
          console.log(err.message);
        })
    },
    []
  );

  const [dispositivos, setDispositivos] = useState([]);

  const [auxDispositivos, setAuxDispositivos] = useState([]);

  //const conjuntoDispositivos =  armarTuplasDispositivos({bodegas, marcas, modelos, dispositivos});
  const [conjuntoDispositivos, setConjuntoDispositivos] = useState([]);

  const [seleccionBodega, setSeleccionBodega] = useState(''); 

  useEffect(
    () => {
      let marc = [];
      if(seleccionBodega!==''){
        fetch(api+'/dispositivos/bodega/'+seleccionBodega)
        .then((response) => response.json())
        .then((datos) => {
          console.log('hola'+datos);
          setDispositivos(datos);
        })
        .catch((err) => {
          console.log(err.message);
        });

        //setMarcas(auxMarcas);
        
      }
    }, [seleccionBodega]
  );

  useEffect(
    () => {
      setConjuntoDispositivos(armarTuplasDispositivos({seleccionBodega,bodegas,dispositivos}));
    },
    [dispositivos]
  )

  const [seleccionMarca, setSeleccionMarca] = useState('');

  useEffect(
    () => {
      if(seleccionMarca!==''){
        
        if(seleccionBodega!==''){
          fetch(api+'/dispositivos/marca/'+seleccionMarca)
          .then((response) => response.json())
          .then((datos) => setDispositivos(datos))
          .catch((err) => {
            console.log(err.message);
          })
        }else{
          fetch(api+'/dispositivos/marca/'+seleccionMarca)
          .then((response) => response.json())
          .then((datos) => setDispositivos(datos))
          .catch((err) => {
            console.log(err.message);
          })
        }
      }
    },
    [seleccionMarca]
  )

  const [seleccionModelo, setSeleccionModelo] = useState('');

  useEffect(
    () => {
      if(seleccionModelo!==''){
        fetch(api+'/dispositivos/modelo/'+seleccionModelo)
        .then((response) => response.json())
        .then((datos) => setDispositivos(datos))
        .catch((err) => {
          console.log(err.message);
        })
      }
    },
    [seleccionModelo]
  )



  return (
    <div className="App">
        <header className='App-header'>
          <Combobox paramBodega={bodegas} hookBodega={setSeleccionBodega} paramMarca={marcas} hookMarca={setSeleccionMarca} paramModelo={modelos} hookModelo={setSeleccionModelo}/>
          <Grilla filas={conjuntoDispositivos}/>
        </header>
        
    </div>
  );
}

export default App;
