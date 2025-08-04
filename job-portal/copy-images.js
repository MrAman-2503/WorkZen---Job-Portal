// Script to copy placeholder images for job listings
const fs = require('fs');
const path = require('path');

// Create job-images directory if it doesn't exist
const imageDir = path.join(__dirname, 'job-images');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// Create placeholder images
const placeholders = [
  'frontend-dev.jpg',
  'ux-designer.jpg',
  'backend-engineer.jpg',
  'marketing-intern.jpg',
  'data-analyst.jpg',
  'devops-specialist.jpg',
  'product-manager.jpg',
  'content-writer.jpg'
];

// Create a simple placeholder SVG for each image
placeholders.forEach(filename => {
  const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#6a11cb"/>
  <rect x="50" y="50" width="200" height="100" fill="#2575fc" rx="10"/>
  <text x="150" y="110" font-family="Arial" font-size="20" fill="white" text-anchor="middle">Job Image</text>
</svg>
`;
  
  fs.writeFileSync(path.join(imageDir, filename), svgContent);
});

console.log('Placeholder images created successfully!');
