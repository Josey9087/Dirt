// Search for plants
// let searchButton;
// let searchInput;
// searchInput = document.querySelector('#search-input');
// searchButton = document.querySelector('.submit');

// const getSearch = async (e) => {
//     e.preventDefault();
//     console.log(searchInput.value)
//     try {
//         window.location.href = `/search/${searchInput.value}`
//     } catch (err) {
//         console.log(err);
//     }
// }

// searchButton.addEventListener('click', getSearch);

// const wishbutton = document.querySelector('.wishlist')

// const wishlistsave = async (event) => {
//     event.preventDefault();
//     var target = event.currentTarget
//     const plantid = target.document.querySelector('.name').getAttribute('data-plant-id').trim();
//     const name = target.document.querySelector('.name').value.trim();
//     const scientific_name = target.document.querySelector('.sciencename').value.trim();
//     const url = target.document.querySelector('.wishlist').getAttribute('data-plant-url').trim();
//       wishdata = {
//         "plantid": plantid,
//        "name": name,
//        "scientific_name": scientific_name,
//     "url": url}
//       try {
//           fetch('http://localhost:3001/wishlist', {
//     method: 'POST', 
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(wishdata),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//     window.location.href = `/wishlist`
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
//       } catch (err) {
//           console.log(err);
//       }
//   }

//   wishbutton.addEventListener('click', wishlistsave)