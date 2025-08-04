document.addEventListener('DOMContentLoaded', () => {
  const jobList = document.getElementById('job-list');
  const searchKeyword = document.getElementById('search-keyword');
  const filterLocation = document.getElementById('filter-location');
  const filterBtn = document.getElementById('filter-btn');

  async function fetchJobs() {
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      const jobs = await res.json();
      return jobs;
    } catch (err) {
      console.error('Error fetching jobs:', err);
      return [];
    }
  }

  function renderJobs(jobs) {
    if (jobs.length === 0) {
      jobList.innerHTML = '<p>No jobs found.</p>';
      return;
    }
    jobList.innerHTML = '';
    jobs.forEach(job => {
      const jobDiv = document.createElement('div');
      jobDiv.classList.add('job-item');
      jobDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
        <button data-id="${job.id}" class="apply-btn">Apply</button>
      `;
      jobList.appendChild(jobDiv);
    });
  }

  function filterJobs(jobs) {
    const keyword = searchKeyword.value.toLowerCase();
    const location = filterLocation.value;
    return jobs.filter(job => {
      const matchesKeyword = job.title.toLowerCase().includes(keyword) || job.description.toLowerCase().includes(keyword);
      const matchesLocation = location === '' || job.location === location;
      return matchesKeyword && matchesLocation;
    });
  }

  async function loadJobs() {
    const jobs = await fetchJobs();
    const filteredJobs = filterJobs(jobs);
    renderJobs(filteredJobs);
  }

  filterBtn.addEventListener('click', loadJobs);

  jobList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('apply-btn')) {
      const jobId = e.target.getAttribute('data-id');
      // For demo, just alert. In real app, redirect to login or application page
      alert('Apply functionality coming soon for job ID: ' + jobId);
    }
  });

  // Initial load
  loadJobs();
});
