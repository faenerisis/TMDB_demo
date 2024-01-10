import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { searchPerson, options } from './searchPerson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const result = await searchPerson();
    res.render('index', { result });
});

app.get('/search', async (req, res) => {
    const inputName = req.query.name;
    const result = await searchPerson(inputName);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
