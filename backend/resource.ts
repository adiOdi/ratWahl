import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/hello', (req, res) => res.send('hello there'));

app.listen(3000, () => console.log('REST API listening on port 3000'));