<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.loading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="reset">
      <button @click="taskStore.$reset">reset state</button>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "./stores/TaskStores";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

const taskStore = useTaskStore();
const filter = ref("all");

// fetch task
taskStore.getTasks();
</script>
