logoutbutton = document.querySelector('.logout')

      const logout = async () => {
        const response = await fetch('http://localhost:3001/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          window.location.href = `/`;
        } else {
          alert(response.statusText);
        }
      };


      logoutbutton.addEventListener('click', logout)
