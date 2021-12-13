const photoUpload = document.getElementById('photo-placeholder');
const postButton = document.querySelector('#post-button')

const createPostHandler = async (event) => {
  event.preventDefault();
  const postUrl = "https://res.cloudinary.com/mado8/image/upload/c_fill,h_500,w_500/v1638900838/Dirt/Houseplants/grow-echinocactus-indoors-1902973-01-31a0b611563b4614ba6ce10617e7af3c_cs6xfr.jpg";
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

postButton.addEventListener('click', createPostHandler);
// photoUpload.addEventListener('click', )