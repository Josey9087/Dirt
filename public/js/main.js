// Search for plants
// const searchInput = document.querySelector('#search-input');
// const searchButton = document.querySelector('.submit');

// const getSearch = async (e) => {
//     e.preventDefault();
//     console.log(searchInput.value)
//     try {
//         window.location.href = `/home/search/${searchInput.value}`
//     } catch (err) {
//         console.log(err);
//     }
// }


// searchButton.addEventListener('click', getSearch);

// Create a user

var firstnameinput = document.getElementById('firstname');
var lastnameinput = document.getElementById('lastname');
var emailinput = document.getElementById('email');
var usernameinput = document.getElementById('username');
var passwordinput = document.getElementById('password');

const userbutton = document.querySelector('.user');
const newuser = async (e) => {
    e.preventDefault();
    userdata = {"firstname": firstnameinput.value, 
                    "lastname": lastnameinput.value,
                    "email": emailinput.value,
                    "username": usernameinput.value,
                    "password": passwordinput.value}
                    console.log(JSON.stringify(userdata))
                    console.log(userdata)
    try {
        fetch('http://localhost:3001/user', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userdata),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  window.location.href = `/home`
})
.catch((error) => {
  console.error('Error:', error);
});
    } catch (err) {
        console.log(err);
    }
}


userbutton.addEventListener('click', newuser)