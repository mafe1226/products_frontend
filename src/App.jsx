import { useState } from "react";
import "./App.css";
import Calendario from "./calendario";
import Modal from './mobilemenu'

function App() {
  const [alimentos, setAlimentos] = useState([
    { id: 1, nombre: "Manzana", gramos: 100, calorias: 52 },
    { id: 2, nombre: "Plátano", gramos: 120, calorias: 105 },
    { id: 3, nombre: "Yogur", gramos: 200, calorias: 150 },
    { id: 4, nombre: "Pollo", gramos: 150, calorias: 239 },
    { id: 5, nombre: "Arroz", gramos: 50, calorias: 130 },
  ]);

  const handleCreateProducts = (e) => {
    e.preventDefault();
    const { nombre, gramos } = e.target.elements;
    const productName = nombre.value.toLowerCase();
    const existingProductIndex = alimentos.findIndex(
      (item) => item.nombre.toLowerCase() === productName
    );
  
    if (existingProductIndex !== -1) {
      const updatedAlimentos = [...alimentos];
      updatedAlimentos[existingProductIndex] = {
        ...updatedAlimentos[existingProductIndex],
        gramos: updatedAlimentos[existingProductIndex].gramos + parseInt(gramos.value),
        calorias: calculateCalories(productName, updatedAlimentos[existingProductIndex].gramos + parseInt(gramos.value), updatedAlimentos)
      };
      setAlimentos(updatedAlimentos);
    } else {
      const newProduct = {
        id: alimentos.length + 1,
        nombre: nombre.value,
        gramos: parseInt(gramos.value),
        calorias: calculateCalories(productName, parseInt(gramos.value), alimentos)
      };
      setAlimentos((prevState) => [...prevState, newProduct]);
    }
    nombre.value = "";
    gramos.value = "";
  };
 
  const calculateCalories = (nombre, gramos, alimentos) => {
    const alimento = alimentos.find(item => item.nombre.toLowerCase() === nombre.toLowerCase()); 
    if (alimento) {
      return Math.round((alimento.calorias * gramos) / alimento.gramos);
    }
    return 0;
  };

  const handleDeleteProduct = (id) => {
    setAlimentos((prevState) =>
      prevState.filter((alimento) => alimento.id !== id)
    );
  };

  return (
    <div className="container">
      <nav className="navContainer">
          <img
            src="/assets/logo.png"
            alt="Logo de la pagina"
          />
        <div className="verticalBar__container">
          <span></span>
        </div>
        <ul className="navUl">
          <li className="nav__item">
            <a>DIARIO</a>
          </li>
          <li className="nav__item">
            <a>CALCULADORA</a>
          </li>
        </ul>
        <Modal />
      </nav>
      <form className="form" onSubmit={handleCreateProducts}>
        <div className="form__calender">
          <Calendario />
        </div>
        <input type="text" className = "inputFood__Form mobile__form" placeholder="Ingresa el nombre del producto" name="nombre"></input>
        <input type="text" className = "inputGrames__Form mobile__form" placeholder="Gramos" name="gramos"></input>
        <button type="submit" className = "buttonAdd transition-color mobile__form">+</button>
      </form>
      <table className="products__Table">
        <tbody>
          {alimentos.map((alimento) => (
            <tr key={alimento.id}>
              <td className="tablebody__item">{alimento.nombre}</td>
              <td className="tablebody__item">{alimento.gramos}</td>
              <td className="tablebody__item">{alimento.calorias}</td>
              <td>
                <button onClick={() => handleDeleteProduct(alimento.id)} className="buttondelete__Table transition-color">
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;