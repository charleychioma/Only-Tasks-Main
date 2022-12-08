async function logout() {
  //calls the logout api and redirects to the login page
    const response = await fetch('/api/manager/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  }
  


  document.querySelector('#logout').addEventListener('click', logout);
  