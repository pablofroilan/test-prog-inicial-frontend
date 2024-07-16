import { Autocomplete, TextField, Box, Paper, Stack } from "@mui/material";
import { useState } from "react";



function BodegaCombobox({bodegas, hookBodega}) {
    
    const opciones = [];
    
    bodegas.map(
        (bodega) => {
            opciones.push(
                { label: bodega.bodega_nombre, id: bodega.bodega_id }
            )
        }
    );

    return (
    <Autocomplete
            disablePortal
            id="combo-box-bodega"
            options={opciones}
            onChange={
                (event, newValue) => {
                    console.log(newValue);
                    if(newValue!==null){
                        hookBodega(newValue.id);
                    } else {
                        hookBodega('');
                    }
                    
                }
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 300 }}
            style= {{backgroundColor: "white"}}
            renderInput={(params) => <TextField {...params} label="Bodega" />}
        />
    )
}

function MarcaCombobox({marcas, hook, hookMarca}) {
    
    const opciones = [];
    
    marcas.map(
        (marca) => {
            opciones.push(
                { label: marca.marca_nombre, id: marca.marca_id }
            )
        }
    );

    return (
    <Autocomplete
            disablePortal
            id="combo-box-marca"
            options={opciones}
            onChange={
                (event, newValue) => {
                    if(newValue!==null) {
                        console.log(newValue.id);
                        hook(newValue.id);
                        hookMarca(newValue.id);
                    }
                    
                }
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 300 }}
            style= {{backgroundColor: "white"}}
            renderInput={(params) => <TextField {...params} label="Marca" />}
        />
    )
}

function ModeloCombobox({modelos, hook, hookModelo}) {
    
    let opciones = [];
    let valor = '';
    
    modelos.map(
        (modelo) => {
            if(modelo.marca_id === hook) {
                valor = ''
                opciones.push(
                    { label: modelo.modelo_nombre, id: modelo.modelo_id }
                )
            }
        }
    );

    return (
    <Autocomplete
            disablePortal
            id="combo-box-modelo"
            value={valor}
            options={opciones}
            onChange={
                (event, newValue) => {
                    console.log(newValue);
                    if(newValue!==null){
                        hookModelo(newValue.id);
                    }
                }
            }
            isOptionEqualToValue={(option, value) => value === '' ? false : option.id === value.id}
            sx={{ width: 300 }}
            style= {{backgroundColor: "white"}}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
        />
    )
}

export function Combobox({paramBodega, paramMarca, paramModelo, hookBodega, hookMarca, hookModelo}) {

    const [valueMarca, setValueMarca] = useState([]);
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-evenly" spacing={2}>
            <BodegaCombobox bodegas={paramBodega} hookBodega={hookBodega}></BodegaCombobox>
            <MarcaCombobox marcas={paramMarca} hook={setValueMarca} hookMarca={hookMarca}></MarcaCombobox>
            <ModeloCombobox modelos={paramModelo} hook={valueMarca} hookModelo={hookModelo}></ModeloCombobox>
        </Stack>            
    )
}