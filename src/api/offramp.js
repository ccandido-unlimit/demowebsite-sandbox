import axios from 'axios';

export default async function handler(req, res) {
    const { query } = req; // Captura os parâmetros da requisição

    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api-sandbox.gatefi.com/offramp/v1/quotes',
            params: query,
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.REACT_APP_API_KEY,
                'signature': 'f6262b4049b424fee9ae5e1148a224cf300adef8cd11de69789c42fa8762f19c',
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
}
