document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const jobList = document.getElementById('job-list');
  const searchKeyword = document.getElementById('search-keyword');
  const filterLocation = document.getElementById('filter-location');
  const filterMinIncome = document.getElementById('filter-min-income');
  const filterMaxIncome = document.getElementById('filter-max-income');
  const filterJobType = document.getElementById('filter-job-type');
  const filterExperience = document.querySelectorAll('input[name="experience"]');
  const filterBtn = document.getElementById('filter-btn');
  const resetFiltersBtn = document.getElementById('reset-filters');
  const sortBy = document.getElementById('sort-by');
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const slidingMenu = document.getElementById('sliding-menu');
  const jobFilterForm = document.getElementById('job-filter-form');

  // Sample job data (in a real app, this would come from an API)
  const sampleJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'New York',
      salary: '$80,000 - $100,000',
      type: 'Full-time',
      experience: 'mid',
      description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and Vue.js.',
      image: 'frontend',
      requirements: [
        '3+ years of experience with React or Vue.js',
        'Strong knowledge of HTML, CSS, and JavaScript',
        'Experience with state management libraries',
        'Familiarity with RESTful APIs'
      ],
      responsibilities: [
        'Develop new user-facing features',
        'Build reusable code and libraries',
        'Ensure the technical feasibility of UI/UX designs',
        'Optimize applications for maximum speed and scalability'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible working hours',
        'Remote work options',
        'Professional development opportunities'
      ]
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'San Francisco',
      salary: '$90,000 - $120,000',
      type: 'Full-time',
      experience: 'senior',
      description: 'Join our design team to create beautiful and intuitive user experiences. Must have experience with Figma and user research.',
      image: 'design',
      requirements: [
        'Bachelor\'s degree in Design, HCI, or related field',
        '5+ years of UX design experience',
        'Proficiency in Figma, Sketch, and Adobe Creative Suite',
        'Experience with user research and usability testing'
      ],
      responsibilities: [
        'Create wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Collaborate with product managers and developers',
        'Develop and maintain design systems'
      ],
      benefits: [
        'Competitive salary and equity',
        'Unlimited PTO',
        'Learning and conference budget',
        'Wellness stipend'
      ]
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'ServerStack',
      location: 'Remote',
      salary: '$100,000 - $140,000',
      type: 'Full-time',
      experience: 'senior',
      description: 'Develop and maintain our backend services using Node.js and Python. Experience with cloud platforms required.',
      image: 'backend',
      requirements: [
        '5+ years of backend development experience',
        'Strong knowledge of Node.js and Python',
        'Experience with cloud platforms (AWS, GCP, Azure)',
        'Database design and optimization skills'
      ],
      responsibilities: [
        'Design and implement scalable backend services',
        'Optimize database performance and queries',
        'Develop and maintain APIs',
        'Ensure system security and data protection'
      ],
      benefits: [
        'Fully remote work',
        'Stock options',
        'Home office stipend',
        'Annual team retreats'
      ]
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'GrowthCo',
      location: 'Work From Home',
      salary: '$20 - $25/hr',
      type: 'Internship',
      experience: 'entry',
      description: 'Learn digital marketing strategies and help manage social media campaigns. Great opportunity for students.',
      image: 'marketing',
      requirements: [
        'Currently enrolled in a marketing or business program',
        'Basic understanding of social media platforms',
        'Strong written and verbal communication skills',
        'Familiarity with Google Analytics is a plus'
      ],
      responsibilities: [
        'Assist with social media content creation',
        'Support email marketing campaigns',
        'Conduct market research and competitor analysis',
        'Help organize marketing events and webinars'
      ],
      benefits: [
        'Flexible schedule',
        'Mentorship program',
        'Potential for full-time conversion',
        'Industry networking opportunities'
      ]
    },
    {
      id: 5,
      title: 'Data Analyst',
      company: 'DataInsights',
      location: 'Work From Office',
      salary: '$70,000 - $90,000',
      type: 'Full-time',
      experience: 'mid',
      description: 'Analyze business data and create reports to help drive company decisions. Proficiency in SQL and Python required.',
      image: 'data',
      requirements: [
        'Bachelor\'s degree in Data Science, Statistics, or related field',
        '2+ years of experience in data analysis',
        'Proficiency in SQL and Python',
        'Experience with data visualization tools (Tableau, Power BI)'
      ],
      responsibilities: [
        'Analyze large datasets to identify trends and insights',
        'Create dashboards and reports for stakeholders',
        'Design and implement data collection systems',
        'Collaborate with cross-functional teams to solve business problems'
      ],
      benefits: [
        '401(k) with company match',
        'Health savings account',
        'Professional development budget',
        'On-site gym membership'
      ]
    },
    {
      id: 6,
      title: 'DevOps Specialist',
      company: 'CloudTech',
      location: 'Remote',
      salary: '$110,000 - $150,000',
      type: 'Full-time',
      experience: 'senior',
      description: 'Manage our cloud infrastructure and CI/CD pipelines. Experience with AWS and Kubernetes required.',
      image: 'devops',
      requirements: [
        '4+ years of DevOps experience',
        'Expertise in AWS and Kubernetes',
        'Strong scripting skills (Bash, Python, Go)',
        'Experience with monitoring and logging tools'
      ],
      responsibilities: [
        'Design and maintain cloud infrastructure',
        'Implement and manage CI/CD pipelines',
        'Ensure system reliability and performance',
        'Automate operational processes'
      ],
      benefits: [
        'Fully remote work',
        'Generous PTO policy',
        'Home office stipend',
        'Conference and training budget'
      ]
    },
    {
      id: 7,
      title: 'Product Manager',
      company: 'InnovateInc',
      location: 'Boston',
      salary: '$120,000 - $160,000',
      type: 'Full-time',
      experience: 'senior',
      description: 'Lead product development from conception to launch. Must have experience in agile environments.',
      image: 'product',
      requirements: [
        'MBA or related advanced degree preferred',
        '5+ years of product management experience',
        'Experience with agile and scrum methodologies',
        'Strong analytical and problem-solving skills'
      ],
      responsibilities: [
        'Define product vision and roadmap',
        'Gather and prioritize product requirements',
        'Work closely with engineering and design teams',
        'Track product metrics and KPIs'
      ],
      benefits: [
        'Stock options',
        'Flexible work arrangements',
        'Learning reimbursement',
        'Annual bonus potential'
      ]
    },
    {
      id: 8,
      title: 'Content Writer',
      company: 'StoryCraft',
      location: 'Remote',
      salary: '$50,000 - $70,000',
      type: 'Part-time',
      experience: 'mid',
      description: 'Create engaging content for blogs, websites, and marketing materials. Strong writing skills required.',
      image: 'content',
      requirements: [
        'Bachelor\'s degree in English, Journalism, or related field',
        '3+ years of content writing experience',
        'Excellent grammar and editing skills',
        'Familiarity with SEO best practices'
      ],
      responsibilities: [
        'Write blog posts, articles, and website copy',
        'Optimize content for search engines',
        'Collaborate with marketing and design teams',
        'Edit and proofread content for publication'
      ],
      benefits: [
        'Flexible schedule',
        'Project-based work',
        'Opportunity for full-time conversion',
        'Creative freedom'
      ]
    }
  ];

  // Theme functionality
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // Menu functionality
  function toggleMenu() {
    slidingMenu.classList.toggle('open');
  }

  function closeMenu() {
    slidingMenu.classList.remove('open');
  }

  // Job rendering
  function renderJobs(jobs) {
    if (jobs.length === 0) {
      jobList.innerHTML = '<div class="no-jobs-message"><p>No jobs found matching your criteria.</p></div>';
      return;
    }
    
    jobList.innerHTML = '';
    jobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.classList.add('job-card');
      jobCard.innerHTML = `
        <div class="job-image">
          <i class="fas fa-${job.image || 'briefcase'}"></i>
        </div>
        <div class="job-details">
          <div class="job-header">
            <h3 class="job-title">${job.title}</h3>
            <span class="job-salary">${job.salary}</span>
          </div>
          <p class="job-company">${job.company}</p>
          <p class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
          <p class="job-description">${job.description}</p>
          <div class="job-meta">
            <div class="job-type">${job.type}</div>
            <button data-id="${job.id}" class="apply-btn">Apply Now</button>
          </div>
        </div>
      `;
      jobList.appendChild(jobCard);
    });
  }

  // Render detailed job view
  function renderJobDetail(job) {
    const jobDetailContainer = document.createElement('div');
    jobDetailContainer.classList.add('job-detail-container');
    jobDetailContainer.innerHTML = `
      <div class="job-detail-header">
        <button id="back-to-list" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Jobs</button>
        <div class="job-detail-content">
          <div class="job-detail-image">
            <i class="fas fa-${job.image || 'briefcase'}"></i>
          </div>
          <div class="job-detail-info">
            <h1 class="job-detail-title">${job.title}</h1>
            <p class="job-detail-company">${job.company}</p>
            <p class="job-detail-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
            <p class="job-detail-salary">${job.salary}</p>
            <p class="job-detail-type">${job.type} • ${job.experience} level</p>
            <button data-id="${job.id}" class="apply-btn detail-apply-btn">Apply for this Position</button>
          </div>
        </div>
      </div>
      <div class="job-detail-body">
        <div class="job-detail-section">
          <h2><i class="fas fa-file-alt"></i> Job Description</h2>
          <p>${job.description}</p>
        </div>
        <div class="job-detail-section">
          <h2><i class="fas fa-list"></i> Requirements</h2>
          <ul class="job-detail-list">
            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
        <div class="job-detail-section">
          <h2><i class="fas fa-tasks"></i> Responsibilities</h2>
          <ul class="job-detail-list">
            ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
        <div class="job-detail-section">
          <h2><i class="fas fa-gift"></i> Benefits</h2>
          <ul class="job-detail-list">
            ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    jobList.innerHTML = '';
    jobList.appendChild(jobDetailContainer);
    
    // Add event listener for back button
    document.getElementById('back-to-list').addEventListener('click', loadJobs);
    
    // Add event listener for apply button
    document.querySelector('.detail-apply-btn').addEventListener('click', (e) => {
      const jobId = e.target.getAttribute('data-id');
      alert(`Application process started for job ID: ${jobId}\nIn a real application, this would redirect to an application form.`);
    });
  }

  // Filter jobs
  function filterJobs(jobs) {
    const keyword = searchKeyword.value.toLowerCase();
    const location = filterLocation.value;
    const minIncome = filterMinIncome.value;
    const maxIncome = filterMaxIncome.value;
    const jobType = filterJobType.value;
    
    // Get selected experience levels
    const selectedExperience = Array.from(filterExperience)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
    return jobs.filter(job => {
      // Keyword filter
      const matchesKeyword = !keyword || 
        job.title.toLowerCase().includes(keyword) || 
        job.description.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword);
      
      // Location filter
      const matchesLocation = !location || job.location === location;
      
      // Salary filter (simplified for demo)
      const matchesSalary = (!minIncome || parseInt(job.salary.replace(/[^0-9]/g, '')) >= parseInt(minIncome)) &&
                            (!maxIncome || parseInt(job.salary.replace(/[^0-9]/g, '')) <= parseInt(maxIncome));
      
      // Job type filter
      const matchesJobType = !jobType || job.type === jobType;
      
      // Experience filter
      const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experience);
      
      return matchesKeyword && matchesLocation && matchesSalary && matchesJobType && matchesExperience;
    });
  }

  // Sort jobs
  function sortJobs(jobs) {
    const sortValue = sortBy.value;
    
    switch(sortValue) {
      case 'newest':
        return [...jobs].sort((a, b) => b.id - a.id);
      case 'oldest':
        return [...jobs].sort((a, b) => a.id - b.id);
      case 'salary-high':
        return [...jobs].sort((a, b) => {
          const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bSalary - aSalary;
        });
      case 'salary-low':
        return [...jobs].sort((a, b) => {
          const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return aSalary - bSalary;
        });
      default:
        return jobs;
    }
  }

  // Load jobs
  function loadJobs() {
    // In a real app, this would fetch from an API
    // For demo, we'll use sample data
    let jobs = [...sampleJobs];
    
    // Apply filters
    jobs = filterJobs(jobs);
    
    // Apply sorting
    jobs = sortJobs(jobs);
    
    // Render jobs
    renderJobs(jobs);
  }

  // Reset filters
  function resetFilters() {
    jobFilterForm.reset();
    loadJobs();
  }

  // Event listeners
  filterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadJobs();
  });

  resetFiltersBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetFilters();
  });

  sortBy.addEventListener('change', loadJobs);

  jobFilterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadJobs();
  });

  // Add event listeners for experience checkboxes
  filterExperience.forEach(checkbox => {
    checkbox.addEventListener('change', loadJobs);
  });

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Menu toggle
  menuToggle.addEventListener('click', toggleMenu);
  menuClose.addEventListener('click', closeMenu);

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (slidingMenu.classList.contains('open') && 
        !slidingMenu.contains(e.target) && 
        e.target !== menuToggle && 
        !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Apply button functionality and job detail view
  jobList.addEventListener('click', (e) => {
    if (e.target.classList.contains('apply-btn') && !e.target.classList.contains('detail-apply-btn')) {
      const jobId = e.target.getAttribute('data-id');
      alert(`Application process started for job ID: ${jobId}\nIn a real application, this would redirect to an application form.`);
    } else if (e.target.closest('.job-card') && !e.target.classList.contains('apply-btn')) {
      // If user clicks on job card (but not on apply button), show job details in modal
      const jobCard = e.target.closest('.job-card');
      if (jobCard) {
        const jobId = jobCard.querySelector('.apply-btn').getAttribute('data-id');
        const job = sampleJobs.find(j => j.id == jobId);
        if (job) {
          openJobDetailModal(job);
        }
      }
    }
  });

  // Job detail modal functionality
  function openJobDetailModal(job) {
    const modal = document.getElementById('job-detail-modal');
    const modalContent = document.getElementById('job-detail-content');
    
    modalContent.innerHTML = `
      <div class="job-detail-content">
        <div class="job-detail-image">
          <i class="fas fa-${job.image || 'briefcase'}"></i>
        </div>
        <div class="job-detail-info">
          <h1 class="job-detail-title">${job.title}</h1>
          <p class="job-detail-company">${job.company}</p>
          <p class="job-detail-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
          <p class="job-detail-salary">${job.salary}</p>
          <p class="job-detail-type">${job.type} • ${job.experience} level</p>
          <button data-id="${job.id}" class="apply-btn detail-apply-btn">Apply for this Position</button>
        </div>
      </div>
      <div class="job-detail-body">
        <div class="job-detail-section">
          <h2><i class="fas fa-file-alt"></i> Job Description</h2>
          <p>${job.description}</p>
        </div>
        <div class="job-detail-section">
          <h2><i class="fas fa-list"></i> Requirements</h2>
          <ul class="job-detail-list">
            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
        <div class="job-detail-section">
          <h2><i class="fas fa-tasks"></i> Responsibilities</h2>
          <ul class="job-detail-list">
            ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
        <div class="job-detail-section">
          <h2><i class="fas fa-gift"></i> Benefits</h2>
          <ul class="job-detail-list">
            ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
    
    // Add event listener for apply button in modal
    const applyBtn = modalContent.querySelector('.detail-apply-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', (e) => {
        const jobId = e.target.getAttribute('data-id');
        alert(`Application process started for job ID: ${jobId}\nIn a real application, this would redirect to an application form.`);
      });
    }
  }

  // Close modal when close button is clicked
  document.getElementById('job-detail-close').addEventListener('click', () => {
    document.getElementById('job-detail-modal').style.display = 'none';
  });

  // Close modal when clicking outside of modal content
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('job-detail-modal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Initialize
  initTheme();
  loadJobs();
});
