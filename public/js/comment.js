const commentButton = document.querySelector('#comment-button')

const createCommentHandler = async (event) => {
    event.preventDefault();
    const commentBody = document.querySelector('#comment-input').value.trim();
    const postIdString = document.querySelector('#comment-input').getAttribute('post-id');
    const postId = parseInt(postIdString);
    
      commentdata = {"body": commentBody,
                     "post_id": postId}
      try {
          fetch('/api/posts/comment', {
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

commentButton.addEventListener('click', createCommentHandler)