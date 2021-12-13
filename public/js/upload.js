const photoUpload = document.getElementById('photo-placeholder');
const postButton = document.querySelector('#post-button');
const imageContainer = document.getElementById('upload-image-container');
const imageUpload = document.getElementById('image-upload');
const fileInputEl = document.getElementById('choose-file')
let myFile;

const createPostHandler = async (data) => {
  const postUrl = data.url;
  const postTitle = document.querySelector('#title-input').value.trim()
  const postBody = document.querySelector('#body-input').value.trim()
  if (postTitle !== "" && postBody !== "") {
    postdata = {
      "url": postUrl,
      "title": postTitle,
      "body": postBody
    }
    console.log(JSON.stringify(postdata))
    console.log(postdata)
    try {
      fetch('/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          window.location.href = `/forum`
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (err) {
      console.log(err);
    }
  }
}

fileInputEl.addEventListener('change', ({ target }) => {
  postButton.removeAttribute('disabled')
  if (target.files && target.files[0]) {
      myFile = target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(myFile);
      reader.onloadend = () => {
          postButton.removeAttribute('disabled')
      };
  }
});

postButton.addEventListener('click', async (e) => {
  e.preventDefault()
  if (!myFile) return

  const formData = new FormData();
  formData.append('myFile', myFile);

  await fetch('/api/upload', {
      method: 'POST',
      body: formData
  })
      .then(res => res.json())
      .then((data) => {
          createPostHandler(data)
      })
      .catch(err => console.error(err))
})
