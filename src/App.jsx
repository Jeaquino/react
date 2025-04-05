import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import propTypes from 'prop-types'
import './App.css'
import Tabla from './components/Tabla'

function App({ num }) {
  const [count, setCount] = useState(num)
  const names = ['John', 'Doe', 'Jane'];
  const [values, setValues] = useState(names);
  const [name, setName] = useState('');
  const productos = [
    { id: 1, nombre: 'Laptop', precio: 1500, categoria: 'Electrónica', stock: 10, marca: 'Dell', descuento: 5 },
    { id: 2, nombre: 'Smartphone', precio: 800, categoria: 'Electrónica', stock: 25, marca: 'Samsung', descuento: 10 },
    { id: 3, nombre: 'Silla', precio: 120, categoria: 'Muebles', stock: 50, marca: 'Ikea', descuento: 0 },
    { id: 4, nombre: 'Mesa', precio: 300, categoria: 'Muebles', stock: 15, marca: 'Ikea', descuento: 5 },
  ]
  const ListItems = () => {
    return values.map((value, index) => (
      <li key={index}>{value}</li>
    ))
  }
  const handler = (event) => {
    event.preventDefault();
    console.log("Nombre enviado:", name);
    //Estoy chequeando que el input name tenga un contenido sino return sin realizar cambios
    if (name.trim() === '') return;
    setValues((values) => [...values, name]);
    setName('');
  }

  const onChangeName = (event) => {
    setName(event.target.value);
    console.log(event);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Tabla items={productos} />
    </>
  )
}

export default App

App.propTypes = {
  num: propTypes.number
}

App.defaultProps = {
  num: 10
}
