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

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

    userdata = {"email": email,
                "username": username,
                "password": password}
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

document
  .querySelector('.user')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup')
  .addEventListener('submit', signupFormHandler);
