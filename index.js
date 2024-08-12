document.addEventListener("DOMContentLoaded", function() {
  const projectElement = document.querySelector('.project');

  function scrollContent() {
    projectElement.scrollLeft -= 1; // Move content to the left

    if (projectElement.scrollLeft <= 0) {
      projectElement.scrollLeft = projectElement.scrollWidth; // Reset scroll position to the far right
    }
  }

  setInterval(scrollContent, 20); // Adjust the speed of scrolling
});
