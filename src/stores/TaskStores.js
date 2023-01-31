import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      try {
        this.loading = true;

        // get data from json file using json server
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();

        this.tasks = data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async addTask(task) {
      try {
        this.tasks.push(task);

        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      try {
        this.tasks = this.tasks.filter((t) => {
          return t.id !== id;
        });

        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async toggleFav(id) {
      try {
        const task = this.tasks.find((t) => t.id === id);
        task.isFav = !task.isFav;

        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
