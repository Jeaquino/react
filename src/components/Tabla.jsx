import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
function Tabla({ items }) {

    const [data, setData] = useState(items);
    const [name, setName] = useState('');
    const [precio, setPrecio] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [stock, setStock] = useState(0);
    const [marca, setMarca] = useState('');
    const [descuento, setDescuento] = useState(0);
    const [buscar, setBuscar] = useState('shrek');
    const [buscarPelicula, setBuscarPelicula] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState('');
    const [search, setSearch] = useState('');
    const apikey = import.meta.env.VITE_REACT_APP_API_KEY
    const listMovies = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${buscar}`);
            const json = await response.json();
            //if(response.ok)
            if (json.Error) {
                setError(true);
                setIsLoading(false);
                setMsgError(json.Error);
                console.log("mensaje de error:",msgError);
                return
            }

            
            console.log(json);

            if (json) {
                setData(json.Search);
            }

            setIsLoading(false);

        } catch (error) {
            console.error('Error parsing JSON from localStorage', error);
        }
    }

    
    useEffect(() => {
        listMovies();
    }, [buscar]);
    
    const onChangeName = (event) => {
        setName(event.target.value);
    }
    const onChangePrecio = (event) => {
        setPrecio(event.target.value);
    }
    const onChangeCategoria = (event) => {
        setCategoria(event.target.value);
    }
    const onChangeStock = (event) => {
        setStock(event.target.value);
    }
    const onChangeMarca = (event) => {
        setMarca(event.target.value);
    }
    const onChangeDescuento = (event) => {
        setDescuento(event.target.value);
    }

    const onChangeSearch = (event) => {
        console.log(event.target.value);
        console.log(search);
        
        setSearch(event.target.value);
    }
    
    const handler = (event) => {
        event.preventDefault();
        
        //Estoy chequeando que el input name tenga un contenido sino return sin realizar cambios
        // if (name.trim() === '' || categoria.trim() === '' || marca.trim() === '') return;
        // setData((data) => [...data, {
            //     id: data[data.length - 1].id + 1,
            //     nombre: name,
        //     precio: precio,
        //     categoria: categoria,
        //     stock: stock,
        //     marca: marca,
        //     descuento: descuento
        // }]);
        setBuscar(search);
        setSearch('');
        // setPrecio(0);
        // setCategoria('');
        // setStock(0);
        // setMarca('');
        // setDescuento(0);
    }
    const Table = () => {
        return (
            <>
                <h1>Lista de peliculas</h1>
                <form onSubmit={handler}>
                    <input type="text" value={search} name="search" onChange={onChangeSearch} placeholder='Ingrese el nombre del producto' />
                    {/* <input type="number" value={precio} name="precio" onChange={onChangePrecio} placeholder='Ingrese el precio' />
                    <input type="text" value={categoria} name="categoria" onChange={onChangeCategoria} placeholder='Ingrese la categoria' />
                    <input type="number" value={stock} name="stock" onChange={onChangeStock} placeholder='ingrese la cantidad de articulos disponibles' />
                    <input type="text" value={marca} name="marca" onChange={onChangeMarca} placeholder='Ingrese la marca' />
                    <input type="number" value={descuento} name="descuento" onChange={onChangeDescuento} placeholder='Agrega descuento' /> */}
                    <div>
                        <button type="submit">Add Name</button>
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((atributo) => (
                                <th key={atributo}>{atributo.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.nombre}>
                                {Object.values(item).map((valor, index) => (
                                    <td key={index}>{valor}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
               
            </>
        )
    }

    const MessageError = () => {
        return (
            <div>
                <h1>{msgError}</h1>
            </div>
        )
    }
    
    return (
        <>
            {isLoading ? <h1>Loading...</h1> : error ? <MessageError /> : <Table />}

        </>
    )
}

export default Tabla


Tabla.propTypes = {
    items: PropTypes.array.isRequired
}

Tabla.defaultProps = {
    items: [
        { id: 1, nombre: 'Laptop', precio: 1500, categoria: 'Electrónica', stock: 10, marca: 'Dell', descuento: 5 },
        { id: 2, nombre: 'Smartphone', precio: 800, categoria: 'Electrónica', stock: 25, marca: 'Samsung', descuento: 10 },
        { id: 3, nombre: 'Silla', precio: 120, categoria: 'Muebles', stock: 50, marca: 'Ikea', descuento: 0 },
        { id: 4, nombre: 'Mesa', precio: 300, categoria: 'Muebles', stock: 15, marca: 'Ikea', descuento: 5 },
        { id: 5, nombre: 'Cafetera', precio: 100, categoria: 'Electrodomésticos', stock: 30, marca: 'Nespresso', descuento: 10 },
        { id: 6, nombre: 'Televisor', precio: 2000, categoria: 'Electrónica', stock: 5, marca: 'Sony', descuento: 15 },
        { id: 7, nombre: 'Auriculares', precio: 150, categoria: 'Accesorios', stock: 40, marca: 'Bose', descuento: 20 },
        { id: 8, nombre: 'Libro', precio: 20, categoria: 'Papelería', stock: 100, marca: 'Penguin', descuento: 0 }
    ]
}
