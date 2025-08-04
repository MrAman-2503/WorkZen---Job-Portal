document.addEventListener('DOMContentLoaded', () => {
  const loginToggle = document.getElementById('login-toggle');
  const signupToggle = document.getElementById('signup-toggle');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close');
  const openAuthModalBtn = document.getElementById('open-auth-modal');

  if (openAuthModalBtn) {
    openAuthModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      authModal.style.display = 'block';
    });
  }

  authClose.addEventListener('click', () => {
    authModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.style.display = 'none';
    }
  });

  loginToggle.onclick = () => {
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  };

  signupToggle.onclick = () => {
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  };

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login successful! Role: ' + data.role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', data.role);
        authModal.style.display = 'none';
        if (data.role === 'admin') {
          window.location.href = '#admin-section';
        } else if (data.role === 'recruiter') {
          window.location.href = '#recruiter-section';
        } else {
          window.location.href = '#jobs-section';
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! Please login.');
        loginToggle.click();
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});
