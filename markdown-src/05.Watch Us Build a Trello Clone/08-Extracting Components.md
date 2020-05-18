# Extracting Components

It’s finally time to clean up our code, and it’s really impressive how  detail-oriented Damian gets when it comes to refactoring.  One of the  most common places where we can look for refactoring material are `v-for` loops, and there’s a bunch inside our `Board.vue`.

**In the video we take the following steps to refactor the column out of the board:**

1. Create the `/src/components/BoardColumn.vue` file and move the template & CSS code for printing out each column into this file.
2. Use this new component `` inside the `Board.vue`
3. Add the appropriate props, to send in `column`, and `columnIndex`.
4. Look for the methods we need to move into the new component, and copy them over (without deleting them from the `Board.vue`.
5. Search inside `Board.vue` to see which methods are no longer used and remove the ones that aren’t.
6. Try things out in the browser, to make sure things work.
7. Realize we need to pass in the board into the `BoardColumn.vue` as a prop.
8. Try things out, and see it working!

**Then we extract the tasks out of the column with the following steps:**

1. We create a `/src/component/ColumnTask.vue` file and move the template & CSS task code out of `BoardColumn.vue`.
2. Send in `task`, `taskIndex`, and `columnIndex` as a prop to this new file.
3. Import the `ColumnTask`, register it as a component, and use it inside of `BoardColumn` to loop through all tasks.
4. Find the methods that need to be copied to `ColumnTask`.
5. See if there are methods in `BoardColumn` we can remove.
6. Remove the $ in front of the `$taskIndex`.
7. Add `column` and `board` to the props, we forgot!
8. Try it in the browser.

You can checkout our revised code here, but I’ve also listed it below:

📃 **/src/views/Board.vue**

```html
    <template>
      <div class="board">
        <div class="flex flex-row items-start">
          <BoardColumn
            v-for="(column, $columnIndex) of board.columns"
            :key="$columnIndex"
            :column="column"
            :columnIndex="$columnIndex"
            :board="board"
          />
          <div class="column flex">
            <input
              type="text"
              class="p-2 mr-2 flex-grow"
              placeholder="New Column Name"
              v-model="newColumnName"
              @keyup.enter="createColumn"
            >
          </div>
        </div>
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
    import BoardColumn from '@/components/BoardColumn'
    export default {
      components: { BoardColumn },
      data () {
        return {
          newColumnName: ''
        }
      },
      computed: {
        ...mapState(['board']),
        isTaskOpen () {
          return this.$route.name === 'task'
        }
      },
      methods: {
        close () {
          this.$router.push({ name: 'board' })
        },
        createColumn () {
          this.$store.commit('CREATE_COLUMN', {
            name: this.newColumnName
          })
          this.newColumnName = ''
        }
      }
    }
    </script>
    <style lang="css">
    .board {
      @apply p-4 bg-teal-dark h-full overflow-auto;
    }
    .task-bg {
      @apply pin absolute;
      background: rgba(0,0,0,0.5);
    }
    </style>
```

📃 **/src/components/BoardColumn.vue**

```html
    <template>
      <div
        class="column"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <ColumnTask
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            :task="task"
            :taskIndex="$taskIndex"
            :column="column"
            :columnIndex="columnIndex"
            :board="board"
          />
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </template>
    <script>
    import ColumnTask from './ColumnTask'
    export default {
      components: { ColumnTask },
      props: {
        column: {
          type: Object,
          required: true
        },
        columnIndex: {
          type: Number,
          required: true
        },
        board: {
          type: Object,
          required: true
        }
      },
      methods: {
        moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
          const type = e.dataTransfer.getData('type')
          if (type === 'task') {
            this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
          } else {
            this.moveColumn(e, toColumnIndex)
          }
        },
        moveTask (e, toTasks, toTaskIndex) {
          const fromColumnIndex = e.dataTransfer.getData('from-column-index')
          const fromTasks = this.board.columns[fromColumnIndex].tasks
          const fromTaskIndex = e.dataTransfer.getData('from-task-index')
          this.$store.commit('MOVE_TASK', {
            fromTasks,
            fromTaskIndex,
            toTasks,
            toTaskIndex
          })
        },
        moveColumn (e, toColumnIndex) {
          const fromColumnIndex = e.dataTransfer.getData('from-column-index')
          this.$store.commit('MOVE_COLUMN', {
            fromColumnIndex,
            toColumnIndex
          })
        },
        pickupColumn (e, fromColumnIndex) {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'
          e.dataTransfer.setData('from-column-index', fromColumnIndex)
          e.dataTransfer.setData('type', 'column')
        },
        createTask (e, tasks) {
          this.$store.commit('CREATE_TASK', {
            tasks,
            name: e.target.value
          })
          e.target.value = ''
        }
      }
    }
    </script>
    <style lang="css">
    .column {
      @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
      min-width: 350px;
    }
    </style>
```

📃 **/src/components/ColumnTask.vue**

```html
    <template>
      <div
        class="task"
        draggable
        @dragstart="pickupTask($event, taskIndex, columnIndex)"
        @click="goToTask(task)"
        @dragover.prevent
        @dragenter.prevent
        @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
      >
        <span class="w-full flex-no-shrink font-bold">
          {{ task.name }}
        </span>
        <p
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm"
        >
          {{ task.description }}
        </p>
      </div>
    </template>
    <script>
    export default {
      props: {
        task: {
          type: Object,
          required: true
        },
        taskIndex: {
          type: Number,
          required: true
        },
        column: {
          type: Object,
          required: true
        },
        columnIndex: {
          type: Number,
          required: true
        },
        board: {
          type: Object,
          required: true
        }
      },
      methods: {
        pickupTask (e, taskIndex, fromColumnIndex) {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'
          e.dataTransfer.setData('from-task-index', taskIndex)
          e.dataTransfer.setData('from-column-index', fromColumnIndex)
          e.dataTransfer.setData('type', 'task')
        },
        goToTask (task) {
          this.$router.push({ name: 'task', params: { id: task.id } })
        },
        moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
          const type = e.dataTransfer.getData('type')
          if (type === 'task') {
            this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
          } else {
            this.moveColumn(e, toColumnIndex)
          }
        },
        moveTask (e, toTasks, toTaskIndex) {
          const fromColumnIndex = e.dataTransfer.getData('from-column-index')
          const fromTasks = this.board.columns[fromColumnIndex].tasks
          const fromTaskIndex = e.dataTransfer.getData('from-task-index')
          this.$store.commit('MOVE_TASK', {
            fromTasks,
            fromTaskIndex,
            toTasks,
            toTaskIndex
          })
        },
        moveColumn (e, toColumnIndex) {
          const fromColumnIndex = e.dataTransfer.getData('from-column-index')
          this.$store.commit('MOVE_COLUMN', {
            fromColumnIndex,
            toColumnIndex
          })
        }
      }
    }
    </script>
    <style lang="css">
    .task {
      @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }
    </style>
```

You might notice that our `BoardColumn` and our `ColumnTask` components share duplicate data and methods, which we can eliminate by using a Mixin.  We’ll see that in the next lesson.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-6-complete)
- [Finished Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-7-complete)

---

