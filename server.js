import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to check Ollama status
app.get('/api/status', async (req, res) => {
  try {
    const response = await axios.get('http://ollama:11434/api/tags');
    res.json({ status: 'online', models: response.data });
  } catch (error) {
    res.json({ status: 'offline', error: error.message });
  }
});

// Endpoint to generate chat responses
app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('http://ollama:11434/api/generate', {
      model: 'qwen2:1.5b',
      prompt: `You are an anime expert chatbot. Answer the following question about anime: ${req.body.message}`,
      stream: false
    });
    res.json({ response: response.data.response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});