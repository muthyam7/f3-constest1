const apiKeyInput = document.querySelector('.API input');
const searchInput = document.querySelector('.search-movie input');
const postersContainer = document.querySelector('.posters');

console.log("gfb")
function createPoster(movie) {
    const posterDiv = document.createElement('div');
    posterDiv.classList.add('poster');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    const img = document.createElement('img');
    img.src = movie.Poster;
    img.alt = movie.Title;
    imgDiv.appendChild(img);
    posterDiv.appendChild(imgDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    const titleName = document.createElement('span');
    titleName.classList.add('title-name');
    titleName.textContent = movie.Title;
    const titleYear = document.createElement('span');
    titleYear.classList.add('title-year');
    titleYear.textContent = movie.Year;
    titleDiv.appendChild(titleName);
    titleDiv.appendChild(titleYear);
    posterDiv.appendChild(titleDiv);

    return posterDiv;
}
const apiUrl = 'http://www.omdbapi.com/';
// const apiKey = apiKeyInput.value;
// console.log(apiKey,"ghjuj")
// const apiKey = apiKeyInput.value;
//  const searchTerm = searchInput.value;
//  console.log(apiKey,"finded")
 //Function to handle the movie search
function searchMovie(searchTerm,apiKey) {
    if (apiKey && searchTerm) {
        const url = `${apiUrl}?apikey=${apiKey}&s=${searchTerm}`;
        console.log(url)
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                postersContainer.innerHTML = ''; // Clear previous results

                if (data.Search && data.Search.length > 0) {
                    data.Search.forEach(movie => {
                        const poster = createPoster(movie);
                        postersContainer.appendChild(poster);
                    });
                } else {
                    // Handle no results
                    const noResultsPoster = createPoster({ Title: 'No results', Year: '' });
                    postersContainer.appendChild(noResultsPoster);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}
// Add event listener to the search input for keyup event
searchInput.addEventListener('keyup', event => {
    const searchTerm = event.target.value;
    const apiKey = apiKeyInput.value;
    searchMovie(searchTerm,apiKey);
});

// Optional: Add event listener to the form for submission event
// This prevents the default form submission behavior
const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
});