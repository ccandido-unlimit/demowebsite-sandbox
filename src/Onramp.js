import React, { useState, useCallback } from 'react';
import axios from 'axios';

const OnrampForm = ({ setResultOnramp, setError }) => {
  const [amount, setAmount] = useState(100);
  const [payment, setPayment] = useState("PIX");
  const [crypto, setCrypto] = useState("ETH");
  const [fiat, setFiat] = useState("BRL");

  const fetchQuote = useCallback(async () => {
    try {
      const response = await axios.get(`/onramp/v1/quotes`, {
        params: {
          partnerAccountId: 'baa2d9f8-6ff0-48e9-babf-709c9007ffbe',
          payment,
          crypto,
          fiat,
          amount,
          region: "BR", // Adicione seu valor de região
        },
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'fGhKXIdWINsjKFuMZpnKqPrlWOIGocRE',
          'signature': 'dd32b38bc3cd9046ce0d09699c770deaf43fe4f9c06eebc649ecc4ba76802930',
        },
      });
      setResultOnramp(response.data);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar os dados");
      setResultOnramp(null);
    }
  }, [amount, payment, crypto, fiat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuote();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Buy Cryptocurrency</h2>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Payment Method:
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="PIX">PIX</option>
          <option value="SPEI">SPEI</option>
        </select>
      </label>
      <label>
        Cryptocurrency:
        <input type="text" value={crypto} onChange={(e) => setCrypto(e.target.value)} />
      </label>
      <label>
        Fiat Currency:
        <input type="text" value={fiat} onChange={(e) => setFiat(e.target.value)} />
      </label>
      <button type="submit">Get Quote</button>
    </form>
  );
};

export default OnrampForm;