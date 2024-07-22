<script>
export default {
    data() {
        return {
            showCreateForm: false,
            showEditForm: false,
            formData: {
                title: '',
                description: ''
            },
            currentTodoId: null,
            todoList: JSON.parse(localStorage.getItem('todoList')) || []
        };
    },
    methods: {
        toggleCreateForm() {
            this.showCreateForm = !this.showCreateForm;
            if (this.showCreateForm) {
                this.showEditForm = false;
                this.formData.title = '';
                this.formData.description = '';
            }
        },
        handleCreateFormSubmit() {
            const newTodo = {
                id: Date.now() + Math.random().toString(36),
                title: this.formData.title,
                description: this.formData.description
            };
            this.todoList.push(newTodo);
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
            this.formData.title = '';
            this.formData.description = '';
            this.showCreateForm = false;
        },
        handleEditFormSubmit() {
            const todoIndex = this.todoList.findIndex(todo => todo.id === this.currentTodoId);
            if (todoIndex !== -1) {
                this.todoList[todoIndex].title = this.formData.title;
                this.todoList[todoIndex].description = this.formData.description;
                localStorage.setItem('todoList', JSON.stringify(this.todoList));
                this.formData.title = '';
                this.formData.description = '';
                this.showEditForm = false;
            }
        },
        deleteTodo(id) {
            this.todoList = this.todoList.filter(todo => todo.id !== id);
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
        },
        getFormToeditTodo(id) {
            const todo = this.todoList.find(todo => todo.id === id);
            if (todo) {
                this.formData.title = todo.title;
                this.formData.description = todo.description;
                this.currentTodoId = id;
                this.showEditForm = true;
                this.showCreateForm = false;
            }
        }
    }
};
</script>

<template>
    <div class="home-container">
        <div @click="toggleCreateForm" class="create-icon">
            <img src="/src/assets/images/create.svg" alt="create-icon">
        </div>
        <template v-if="showCreateForm">
            <form @submit.prevent="handleCreateFormSubmit" class="form">
                <div @click="showCreateForm = false" class="closeForm">
                    <img src="../assets/images/cross.svg" alt="cross">
                </div>
                <input v-model="formData.title" class="form-title" type="text" placeholder="Enter Your Title">
                <textarea v-model="formData.description" class="form-description" cols="20" rows="10" placeholder="Enter Your Description"></textarea>
                <button type="submit">Create</button>
            </form>
        </template>

        <template v-if="showEditForm">
            <form @submit.prevent="handleEditFormSubmit" class="form">
                <div @click="showEditForm = false" class="closeForm">
                    <img src="../assets/images/cross.svg" alt="cross">
                </div>
                <input v-model="formData.title" class="form-title" type="text" placeholder="Edit Your Title">
                <textarea v-model="formData.description" class="form-description" cols="20" rows="10" placeholder="Edit Your Description"></textarea>
                <button type="submit">Edit</button>
            </form>
        </template>

        <template v-if="todoList.length === 0">
            <p style="text-align: center;">There are no Tasks!</p>
        </template>
        <template v-if="!showCreateForm && !showEditForm">
            <ul class="todo-items">
                <li class="todo-item" v-for="todo in todoList" :key="todo.id">
                    <div @click="deleteTodo(todo.id)" class="delete-todo">
                        <img src="../assets/images/cross.svg" alt="">
                    </div>
                    <div @click="getFormToeditTodo(todo.id)" class="edit-todo">
                        <img src="../assets/images/edit.svg" alt="">
                    </div>
                    <div class="todo-title">{{ todo.title }}</div>
                    <div class="todo-description">{{ todo.description }}</div>
                </li>
            </ul>
        </template>
    </div>
</template>

<style scoped>
.home-container {
    padding: 1rem;
    position: relative;
}

.create-icon {
    transform: scale(0.7);
    cursor: pointer;
}

.form {
    background-color: #36454F;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 8px;
    position: absolute;
    z-index: 999;
}

.form .closeForm {
    align-self: flex-end;
    transform: scale(0.4);
    cursor: pointer;
}

.form-title,
.form-description {
    padding: 1rem;
    width: 100%;
    border: none;
    border-radius: 8px;
}

button {
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: #26a269;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    transition: 250ms all ease-in-out;
    border: none;
}

button:hover {
    border: 1px solid #26a269;
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.todo-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    padding: 1rem;
}

.todo-item {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 50%;
    position: relative;
}

.todo-item .todo-title {
    font-weight: bold;
    color: green;
    margin-bottom: 1rem;
}

.todo-item .delete-todo {
    position: absolute;
    transform: scale(0.4);
    top: 0;
    right: 0;
    cursor: pointer;
}

.todo-item .edit-todo {
    position: absolute;
    top: 0;
    right: 3rem;
    cursor: pointer;
    transform: scale(0.4);
}

@media screen and (max-width: 1304px) {
    .todo-item {
        max-width: 60%;
    }
}

@media screen and (max-width: 855px) {
    .todo-item {
        max-width: 70%;
    }
    .todo-item .todo-title {
        font-size: 18px;
    }
    .todo-item .todo-description {
        font-size: small;
    }
}

@media screen and (max-width: 617px) {
    .todo-item {
        max-width: 80%;
    }
}

@media screen and (max-width: 490px) {
    .todo-item {
        max-width: 90%;
        height: 200px;
        overflow: hidden;
    }
}
</style>
