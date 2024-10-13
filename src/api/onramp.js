import axios from 'axios';

export default async function handler(req, res) {
    const { query } = req; // Captura os parâmetros da requisição

    try {
        const response = await axios({
            method: 'GET', // Método HTTP
            url: 'https://api-sandbox.gatefi.com/onramp/v1/quotes',
            params: query, // Envia os parâmetros recebidos na requisição
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.REACT_APP_API_KEY, // Variável de ambiente
                'signature': 'dd32b38bc3cd9046ce0d09699c770deaf43fe4f9c06eebc649ecc4ba76802930', // Assinatura
            },
        });

        res.status(200).json(response.data); // Retorna os dados da API
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
}
