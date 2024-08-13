document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: 'To-Do List App',
            description: 'A simple React-based To-Do List application where users can add tasks, mark them as complete, and manage their daily activities.',
            tech: 'React.js',
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
            tech: 'JavaScript',
            link: 'weather_app.html'
        }
    ];

    const projectsContainer = document.querySelector('.projects-container');

    // Function to display projects
    function displayProjects(filter) {
        projectsContainer.innerHTML = ''; // Clear existing content
        projects.forEach(project => {
            // Check if project matches the filter
            if (filter === 'all' || project.tech.includes(filter)) {
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
                projectsContainer.appendChild(projectDiv);
            }
        });
    }

    // Initially display all projects
    displayProjects('all');

    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            displayProjects(filter);
        });
    });
});
