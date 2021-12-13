// Search for plants
let searchButton;
let searchInput;
searchInput = document.querySelector('#search-input');
searchButton = document.querySelector('.submit');

const getSearch = async (e) => {
    e.preventDefault();
    console.log(searchInput.value)
    try {
        window.location.href = `/search/${searchInput.value}`
    } catch (err) {
        console.log(err);
    }
}

searchButton.addEventListener('click', getSearch);