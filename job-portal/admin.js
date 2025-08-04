document.addEventListener('DOMContentLoaded', () => {
  const userListDiv = document.getElementById('user-list');
  const jobListDiv = document.getElementById('job-list');

  // For demo, assume token is stored in localStorage after login
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login as admin to access this page.');
    window.location.href = 'auth.html';
    return;
  }

  async function fetchUsers() {
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      const users = await res.json();
      renderUsers(users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }

  async function fetchJobs() {
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      const jobs = await res.json();
      renderJobs(jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  }

  function renderUsers(users) {
    if (users.length === 0) {
      userListDiv.innerHTML = '<p>No users found.</p>';
      return;
    }
    userListDiv.innerHTML = '<ul>' + users.map(user => `<li>${user.username} (${user.role})</li>`).join('') + '</ul>';
  }

  function renderJobs(jobs) {
    if (jobs.length === 0) {
      jobListDiv.innerHTML = '<p>No jobs found.</p>';
      return;
    }
    jobListDiv.innerHTML = '';
    jobs.forEach(job => {
      const jobDiv = document.createElement('div');
      jobDiv.classList.add('job-item');
      jobDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
        <p><strong>Posted By:</strong> ${job.postedBy}</p>
      `;
      jobListDiv.appendChild(jobDiv);
    });
  }

  fetchUsers();
  fetchJobs();
});
