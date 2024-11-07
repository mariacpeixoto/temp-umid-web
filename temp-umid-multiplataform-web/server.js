const express = require('express');
const cors = require('cors');
const db = require('./firebase');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// Rota para buscar temperatura e umidade por data/hora
app.get('/api/get-weather', async (req, res) => {
  const { date, time } = req.query;  // Data e hora fornecidos pelo frontend

  if (!date || !time) {
    return res.status(400).json({ error: 'Data e hora são obrigatórios.' });
  }

  try {
    const weatherSnapshot = await db.collection('weather')
      .where('date', '==', date)
      .where('time', '==', time)
      .get();

    if (weatherSnapshot.empty) {
      return res.status(404).json({ error: 'Dados não encontrados para essa data e hora.' });
    }

    const weatherData = weatherSnapshot.docs.map(doc => doc.data())[0];
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do Firestore.' });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
