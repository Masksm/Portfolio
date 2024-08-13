document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: 'To-Do List App',
            description: 'A simple React-based To-Do List application where users can add tasks, mark them as complete, and manage their daily activities.',
            tech: 'React.js, JavaScript, CSS',
            link: 'todo_list.html'
        },
        // Add more projects here
    ];

    const projectsSection = document.getElementById('projects');
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
