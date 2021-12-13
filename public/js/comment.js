const commentButton = document.querySelector('#comment-button')

const createPostHandler = async (event) => {
    event.preventDefault();
    const commentBody = document.querySelector('#comment-input').value.trim()
      commentdata = {"body": commentBody}
      try {
          fetch('http://localhost:3001/api/posts/comment', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentdata),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
      } catch (err) {
          console.log(err);
      }
  }

