document.addEventListener('DOMContentLoaded', () => {
  const jobPostForm = document.getElementById('job-post-form');
  const postedJobsDiv = document.getElementById('posted-jobs');

  // For demo, assume token and username are stored in localStorage after login
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token) {
    alert('Please login as recruiter to access this page.');
    window.location.href = 'auth.html';
    return;
  }

  async function fetchPostedJobs() {
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      const jobs = await res.json();
      const myJobs = jobs.filter(job => job.postedBy === username);
      renderPostedJobs(myJobs);
    } catch (err) {
      console.error('Error fetching posted jobs:', err);
    }
  }

  function renderPostedJobs(jobs) {
    if (jobs.length === 0) {
      postedJobsDiv.innerHTML = '<p>No jobs posted yet.</p>';
      return;
    }
    postedJobsDiv.innerHTML = '';
    jobs.forEach(job => {
      const jobDiv = document.createElement('div');
      jobDiv.classList.add('job-item');
      jobDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
      `;
      postedJobsDiv.appendChild(jobDiv);
    });
  }

  jobPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ title, description, location }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Job posted successfully!');
        jobPostForm.reset();
        fetchPostedJobs();
      } else {
        alert(data.message || 'Failed to post job');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });

  fetchPostedJobs();
});
