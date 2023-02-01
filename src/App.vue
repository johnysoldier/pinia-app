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
      <div class="filter_section">
        <button @click="taskStore.$reset">Reset state</button>
      </div>
      <div class="filter_section">
        <button @click="filter = 'all'">All tasks</button>
        <button @click="filter = 'favs'">Fav tasks</button>
      </div>
    </nav>

    <div class="loading" v-if="taskStore.loading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <TransitionGroup name="task" tag="div">
        <div v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </TransitionGroup>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <TransitionGroup name="task" tag="div">
        <div v-for="task in taskStore.favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </TransitionGroup>
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

<style scoped>
.task-enter-active,
.task-leave-active {
  transition: all 0.5s ease;
}
.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
