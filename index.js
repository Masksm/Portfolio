const project = document.querySelector('.project');

function scrollRightToLeft() {
  project.scrollBy({
    top: 0,
    left: -2, // Negative value to scroll to the left
    behavior: 'smooth'
  });

  // If reached the start, reset to the end
  if (project.scrollLeft === 0) {
    project.scrollLeft = project.scrollWidth;
  }
}

// Continuously scroll every 1 seconds
setInterval(scrollRightToLeft, 100);
