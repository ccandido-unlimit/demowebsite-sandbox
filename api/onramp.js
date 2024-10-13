// api/onramp.js
import axios from 'axios';

export default async function handler(req, res) {
    const { query } = req; // Captura a query da requisição

    try {
        const response = await axios.get('https://api-sandbox.gatefi.com', {
            params: {
                partnerAccountId: 'baa2d9f8-6ff0-48e9-babf-709c9007ffbe',
                ...query,  // Passa todos os parâmetros da requisição
            },
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.REACT_APP_API_KEY, // Certifique-se de que essa variável de ambiente está configurada no Vercel
                'signature': 'dd32b38bc3cd9046ce0d09699c770deaf43fe4f9c06eebc649ecc4ba76802930',
            },
        });

        res.status(200).json(response.data); // Retorna os dados recebidos
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error.message);
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
}