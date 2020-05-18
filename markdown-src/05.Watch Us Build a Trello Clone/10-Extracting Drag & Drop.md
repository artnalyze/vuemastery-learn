# Extracting Drag & Drop

Using the drag and drop API has made our code pretty complicated.  In this  lesson we turn this API into a reusable set of components that we can  use whenever we need the ability to drag and drop.  This will help us  simplify our code.

We’ll start by creating basic components for our Drag and Drop functionality.

📃 **src/components/\**\*\*App\*\**\*Drag.vue**

```html
    <template>
      <div
        draggable
        @dragstart.self="onDrag"
        @dragover.prevent
        @dragenter.prevent
      >
        <slot/>
      </div>
    </template>
    
    <script>
    export default {
      props: {
        transferData: {
          type: Object,
          required: true
        }
      },
      methods: {
        onDrag (e) {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'
          e.dataTransfer.setData('payload', JSON.stringify(this.transferData))
        }
      }
    }
    </script>
    
    <style lang="css" scoped>
    </style>
```

📃 **src/components/\**\*\*App\*\**\*Drag.vue**

```html
    <template>
      <div
        @drop.stop="onDrop"
        @dragover.prevent
        @dragenter.prevent
      >
        <slot/>
      </div>
    </template>
    
    <script>
    export default {
      methods: {
        onDrop (e) {
          const transferData = JSON.parse(e.dataTransfer.getData('payload'))
          this.$emit('drop', transferData)
        }
      }
    }
    </script>
    
    <style lang="css" scoped>
    </style>
```

Now that we should use these two components. First, let’s refactor the **BoardColumn** to use them.

📃 **src/components/\**\*\*BoardColumn\*\**\*.vue**

```html
    <template>
      <AppDrop
        @drop="moveTaskOrColumn"
      >
        <AppDrag
          class="column"
          :transferData="{
            type: 'column',
            fromColumnIndex: columnIndex
          }"
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
        </AppDrag>
      </AppDrop>
    </template>
    
    <script>
    import ColumnTask from './ColumnTask'
    import AppDrag from './AppDrag'
    import AppDrop from './AppDrop'
    import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
    
    export default {
      components: {
        ColumnTask,
        AppDrag,
        AppDrop
      },
      mixins: [movingTasksAndColumnsMixin],
      ...
```

In order to make this work the `moveTaskOrColumn` function needs to be updated inside our mixin, since now only the `transferData` is being passed in as an argument.

📃 **src/***\*mixins\****/****movingTasksAndColumnsMixin.js**

```javascript
    export default {
      ...
      methods: {
        moveTaskOrColumn (transferData) {
          if (transferData.type === 'task') {
            this.moveTask(transferData)
          } else {
            this.moveColumn(transferData)
          }
        },
        moveTask ({ fromColumnIndex, fromTaskIndex }) {
          const fromTasks = this.board.columns[fromColumnIndex].tasks
          this.$store.commit('MOVE_TASK', {
            fromTasks,
            fromTaskIndex,
            toTasks: this.column.tasks,
            toTaskIndex: this.taskIndex
          })
        },
        moveColumn ({ fromColumnIndex }) {
          this.$store.commit('MOVE_COLUMN', {
            fromColumnIndex,
            toColumnIndex: this.columnIndex
          })
        }
      }
    }
```

We then can simplify the **ColumnTask.vue** component to use our drag and drop component:

📃 **src/components/\**\*\*ColumnTask\*\**\*.vue**

```html
    <template>
      <AppDrop
        @drop="moveTaskOrColumn"
      >
        <AppDrag
          class="task"
          :transferData="{
            type: 'task',
            fromColumnIndex: columnIndex,
            fromTaskIndex: taskIndex
          }"
          @click="goToTask(task)"
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
        </AppDrag>
      </AppDrop>
    </template>
    
    <script>
    import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
    import AppDrag from './AppDrag'
    import AppDrop from './AppDrop'
    
    export default {
      components: { AppDrag, AppDrop },
      mixins: [movingTasksAndColumnsMixin],
      props: {
        task: {
          type: Object,
          required: true
        },
        taskIndex: {
          type: Number,
          required: true
        }
      },
      methods: {
        goToTask (task) {
          this.$router.push({ name: 'task', params: { id: task.id } })
        }
      }
    }
    </script>
```

As you can see, we were able to remove the whole `pickTask` method since it has become redundant.

Now we have two components, **AppDrag** and **AppDrop,** we can easily use whenever we need to implement any sort of drag and drop functionality in the future.

You made it to the end, congratulations for that!

---

### Lesson Resource

- [Finished Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-9-complete)

---

