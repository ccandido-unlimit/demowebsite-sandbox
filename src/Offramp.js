import React, { useState, useCallback } from 'react';
import axios from 'axios';

const OfframpForm = ({ setResultOfframp, setError }) => {
  const [amount, setAmount] = useState(100);
  const [payout, setPayout] = useState("");
  const [crypto, setCrypto] = useState("ETH");
  const [fiat, setFiat] = useState("BRL");

  const fetchOfframpQuote = useCallback(async () => {
    try {
      const response = await axios.get(`/offramp/v1/quotes`, {
        params: {
          partnerAccountId: 'baa2d9f8-6ff0-48e9-babf-709c9007ffbe',
          payout,
          fiat,
          crypto,
          region: "BR", // Adicione seu valor de região
          cryptoAmount: amount,
        },
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'fGhKXIdWINsjKFuMZpnKqPrlWOIGocRE',
          'signature': 'f6262b4049b424fee9ae5e1148a224cf300adef8cd11de69789c42fa8762f19c',
        },
      });
      setResultOfframp(response.data);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar os dados");
      setResultOfframp(null);
    }
  }, [amount, payout, crypto, fiat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOfframpQuote();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sell Cryptocurrency</h2>
      <label>
        Amount (in crypto):
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Payout Method:
        <input type="text" value={payout} onChange={(e) => setPayout(e.target.value)} />
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

export default OfframpForm;