# Opening Tasks in a Modal

In this lesson we implement a modal showing task information using a child route.  This opens when we click on a task in our board and closes when we click on the background.  I hadn’t learned how to create a modal  which is also a child route, and this is a great example.

We start by adding the child route.

📜 **/src/router.js**

```javascript
...
import Task from './views/Task.vue' // <-- Add Task

Vue.use(Router)

export default new Router({
  ...
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board,
      children: [ // <-- Add child component
        {
          path: 'task/:id',
          name: 'task',
          component: Task
        }
      ]
    }
  ]
})
```

We also add a getter to our Vuex store so we can search for the task based on the ID from the url.

📜 **/src/store.js**

```javascript
  ...
  state: {
    board
  },
  getters: { // <-- Add a getter
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {}
})
```

Our board contains the code to open and close the task modal.

📜 **/src/views/Board.vue**

```html
...
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @click="goToTask(task)"
          >
...
    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () {
      this.$router.push({ name: 'board' })
    }
  }
}
</script>
...
```

And finally our `Task.vue` component fetches the appropriate task and displays it’s name in a modal.

📜**/src/views/Task.vue**

```html
<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      {{ task.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  }
}
</script>
...
```

In the next lesson we’ll add the ability to add and edit tasks using forms, stay tuned!

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-2-complete)
- [Finished Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-3-complete)

---

