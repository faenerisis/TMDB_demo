import express from 'express';
import fetch from "node-fetch";

const app = express();

app.get('/person', async (req, res) => {
    const name = req.query.name;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer API_KEY'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${name}&include_adult=false&language=en-US&page=1`, options);
    if (response.ok) {
        const data = await response.json();

        const searchedPersonNames = data.results.map(person => person.name);
        const searchedMovieTitles = data.results.map(person => person.known_for.map(movie => movie.title));

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Person Search</title>
            </head>
            <body>
            <h1>Person Search</h1>
            <input type="text" id="name" placeholder="Enter a person name">
            <button type="button" onclick="searchPerson()">Search</button>
            <h2>Search Results for "${name}":</h2>
            <p><strong>Person Names:</strong> ${searchedPersonNames.join(', ')}</p>
            <p><strong>Movie Titles:</strong> ${searchedMovieTitles.map(titles => titles.join(', ')).join('; ')}</p>

            <script>
                function searchPerson() {
                    const name = document.getElementById('name').value;
                    window.location.href = \`/person?name=\${name}\`;
                }
            </script>
            </body>
            </html>
        `;

        res.send(html);
    } else {
        res.status(response.status).send(response.statusText);
    }
});

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});
