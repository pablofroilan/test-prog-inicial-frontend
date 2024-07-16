import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

 export function crearDatos(id, nombre, marca, modelo, bodega) {
    return { id, nombre, marca, modelo, bodega };
}

 
function FilaDispositivo({ conjuntoFilas }) {
    
    return (
        <TableBody>
            {
                conjuntoFilas.map(
                    (fila) => (
                        <TableRow key={fila.id}>
                            <TableCell>{fila.id}</TableCell>
                            <TableCell>{fila.nombre}</TableCell>
                            <TableCell>{fila.marca}</TableCell>
                            <TableCell>{fila.modelo}</TableCell>
                            <TableCell>{fila.bodega}</TableCell>
                        </TableRow>
                    )
                )
            }
        </TableBody>
    )
}

function FilaEncabezado() {
    return (
        <TableHead style={{ backgroundColor: 'lightGray' }}>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Bodega</TableCell>
            </TableRow>
        </TableHead>
    )
}

export function Grilla({filas}) {
    return (
        <div style={{ width: '90%' }}>
            <TableContainer component={Paper}>
                <Table className="grilla-dispositivos">
                    <FilaEncabezado></FilaEncabezado>
                    <FilaDispositivo conjuntoFilas={filas}></FilaDispositivo>
                </Table>
            </TableContainer>
        </div>
        
    );
}
