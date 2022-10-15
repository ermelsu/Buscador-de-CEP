import { useState } from 'react'; 
import React from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const[cep, setCep] = useState({});

  async function handleSearch(){

    //usando o axios

    if(input === ''){
      alert("preencha com algum CEP!")
      return;
    }

    try{
      const response = await api.get (`${input}/json`); 
      setCep(response.data)
      setInput("");
    }catch{
      alert("erro ao buscar cep");
      setInput("")
    }
  }

  return (
    <div className="container">
    <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite aqui o CEP..." 
          value={input}
          onChange={(e) => setInput(e.target.value) }
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2> CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade} - {cep.uf}</span>
        <span>DDD: {cep.ddd}</span>
      </main>
      )}
    </div>
  );
}

export default App;
