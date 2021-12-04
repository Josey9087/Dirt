//on button click
// in the callback function, do a fetch call to the api /search
// with body params
// where the params are a json constructed by user inputs
const searchInput = document.querySelector('#search-input')
const getSearch = async (e) => {
    console.log(e.target.value)
    try {
        const response = await fetch(`http://localhost:3001/api/plants/search/${e.target.value}`)
        console.log(response);
    } catch (err) {
        console.log(err);
    }
    // const search = {
    //     name:
    // // }
}
searchInput.addEventListener('keyup', getSearch);
// body: {
//     query: <this is the string you get from user typing in the search box>,
//     water: <this is the selection user makes from your dropdown>
// }