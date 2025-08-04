document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle ? themeToggle.querySelector('i') : null;
  const menuToggle = document.getElementById('menu-toggle');
  const slidingMenu = document.getElementById('sliding-menu');
  const menuClose = document.getElementById('menu-close');

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      slidingMenu.classList.toggle('open');
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', () => {
      slidingMenu.classList.remove('open');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (slidingMenu && slidingMenu.classList.contains('open') && 
        !slidingMenu.contains(e.target) && 
        e.target !== menuToggle && 
        !menuToggle.contains(e.target)) {
      slidingMenu.classList.remove('open');
    }
  });

  function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) {
      if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
});
