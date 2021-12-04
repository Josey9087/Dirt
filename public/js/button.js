// on button click
// in the callback function, do a fetch call to the api /search
// with body params
// where the params are a json constructed by user inputs

const searchButton = document.querySelector('#search-button-id-here')

body: {
    query: <this is the string you get from user typing in the search box>,
    water: <this is the selection user makes from your dropdown>
}