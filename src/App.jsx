import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState('--');
  const [clima, setClima] = useState('☀️');

  useEffect(() => {
    const buscarClima = async () => {
      try {
        const lat = -22.9056;
        const lon = -47.0608;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
        
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        setTemp(Math.round(dados.current.temperature_2m));
        
        const code = dados.current.weather_code;
        if (code === 0) setClima('☀️');
        else if (code <= 3) setClima('🌤️');
        else if (code <= 67) setClima('🌧️');
        else setClima('☁️');
        
      } catch (erro) {
        console.error("Erro ao buscar clima:", erro);
      }
    };

    buscarClima();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="weather-section">
          <div className="weather-card">
            <div className="icon">{clima}</div>
            <h1 className="temp">{temp}°C</h1>
            <p className="location">Campinas, SP</p>
          </div>
        </div>

        <div className="content-section">
          <div className="info-text">
            <h2>Saiba tudo sobre o tempo agora</h2>
            <p>
              Comece agora e saiba mais sobre o <strong>clima local</strong> instantaneamente
            </p>
          </div>

          <div className="actions">
            <button className="btn-get-started">Começar</button>
            <p className="login-text">Já tem uma conta?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;