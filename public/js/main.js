const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('.submit');

const getSearch = async (e) => {
    e.preventDefault();
    console.log(searchInput.value)
    try {
        window.location.href = `/home/search/${searchInput.value}`
    } catch (err) {
        console.log(err);
    }
}

searchButton.addEventListener('click', getSearch);