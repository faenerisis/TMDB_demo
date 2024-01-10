import fetch from 'node-fetch';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODI4YTc5YmJmOGE4YmQ4YzNlNWZjMWM4NDY5NjUzNiIsInN1YiI6IjY1MWNmOWFjMmYzYjE3MDBlNDBhMDZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uC3a3Yc3YtMMtYt-_h3CgpfqWgq-63R3mF-iJbYF_a8'
    }
};

async function searchPerson(name) {
    const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${name}&include_adult=false&language=en-US&page=1`, options);

    if (response.ok) {
        const data = await response.json();

        if (data.results.length > 0) {
            const result = data.results[0];
            const searchedPerson = {
                name: result.name,
                knownFor: result.known_for.map(movie => movie.title)
            };
            return searchedPerson;
        }
    }
    return {};
}

export { searchPerson, options };
