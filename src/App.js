import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import './styles.css';

function App() {
  const [txtBinary, setBinaryTxt] = useState('');
  const [txtDecimal, setDecimalTxt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleConverter(e){
    e.preventDefault();

    setErrorMessage('');
    setDecimalTxt('');

    if(txtBinary.match(/^[0-1]+$/g) === null){
      setErrorMessage('Digite um número entre 0 ou 1.');
      return;
    }

    //Inverter o texto transformando em array
    const reversedBinaryTxt = txtBinary
    .split('')
    .map(Number)
    .reverse();

    //Função que irá elevar o número em questão pela sua respectiva posição e somar com o resultado anterior
    const Acumulador = (acumulador, valorAtual, posicao) => acumulador + valorAtual * Math.pow(2, posicao);
    
    const BinToDecTxt = reversedBinaryTxt
    .reduce(Acumulador);

    setDecimalTxt(BinToDecTxt);
  }

  return (
    <div className="converter-container">
      <section className="form">

        <form onSubmit={handleConverter}>
          <h1>Conversor Binário para Decimal</h1>
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
          <br />
          <input 
            placeholder="Entre com 0 ou 1"
            type="text"
            value={txtBinary}
            onChange={e => setBinaryTxt(e.target.value)}
          />
          <FiArrowRight size={16} color="#E02041"/>
          <input
            placeholder="Resultado"
            type="text"
            value={txtDecimal}
            disabled
          />

          <button className="button">Converter</button>
        </form>

      </section>
    </div>
  );
}

export default App;
