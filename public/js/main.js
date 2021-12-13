// Create a user

// var emailinput = document.getElementById('email');
// var usernameinput = document.getElementById('username');
// var passwordinput = document.getElementById('password');

// const userbutton = document.querySelector('.user');
// const newuser = async (e) => {
//     e.preventDefault();
//     userdata = {"email": emailinput.value,
//                 "username": usernameinput.value,
//                 "password": passwordinput.value}
//                     console.log(JSON.stringify(userdata))
//                     console.log(userdata)
//     try {
//         fetch('http://localhost:3001/login', {
//   method: 'POST', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(userdata),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
//   window.location.href = `/home`
// })
// .catch((error) => {
//   console.error('Error:', error);
// });
//     } catch (err) {
//         console.log(err);
//     }
// }

// userbutton.addEventListener('click', newuser)


const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.user')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
