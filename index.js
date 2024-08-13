document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: 'To-Do List App',
            description: 'A simple React-based To-Do List application where users can add tasks, mark them as complete, and manage their daily activities.',
            tech: 'React.js, JavaScript, CSS',
            link: 'todo_list.html'
        },
        {
            title: 'Portfolio Website',
            description: 'A personal portfolio website to showcase my projects and skills. Built with HTML, CSS, and JavaScript.',
            tech: 'HTML, CSS, JavaScript',
            link: 'portfolio.html'
        },
        {
            title: 'Weather App',
            description: 'A weather forecast application that fetches data from a weather API and displays the forecast for different locations.',
            tech: 'JavaScript, API Integration, Bootstrap',
            link: 'weather_app.html'
        }
    ];

    const projectsSection = document.getElementById('projects');

    // Clear the content of the projects section to prevent duplicates
    projectsSection.innerHTML = '';

    // Dynamically create and append project elements
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <ul>
                <li>Technologies Used: ${project.tech}</li>
            </ul>
            <a href="${project.link}">View Project</a>
        `;
        projectsSection.appendChild(projectDiv);
    });
});
