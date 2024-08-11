class TodoApp {
    constructor() {
        this.todos = [];
        this.render();
    }

    addTodo(todoText) {
        this.todos.push({ text: todoText, isCompleted: false });
        this.render();
    }

    completeTodo(index) {
        this.todos[index].isCompleted = true;
        this.render();
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
        this.render();
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = '';

        this.todos.forEach((todo, index) => {
            const todoDiv = document.createElement('div');
            todoDiv.innerText = todo.text;
            if (todo.isCompleted) {
                todoDiv.style.textDecoration = 'line-through';
            }

            const completeButton = document.createElement('button');
            completeButton.innerText = 'Complete';
            completeButton.onclick = () => this.completeTodo(index);

            const removeButton = document.createElement('button');
            removeButton.innerText = 'x';
            removeButton.onclick = () => this.removeTodo(index);

            todoDiv.appendChild(completeButton);
            todoDiv.appendChild(removeButton);

            root.appendChild(todoDiv);
        });

        const input = document.createElement('input');
        const addButton = document.createElement('button');
        addButton.innerText = 'Add Todo';
        addButton.onclick = () => {
            if (input.value) {
                this.addTodo(input.value);
                input.value = '';
            }
        };

        root.appendChild(input);
        root.appendChild(addButton);
    }
}

new TodoApp();
