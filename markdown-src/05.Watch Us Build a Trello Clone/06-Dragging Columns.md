# Dragging Columns

In this lesson we’ll start with the Vuex mutation for moving columns.

📃 **/src/store.js**

```javascript
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
```

Similar to `MOVE_TASK` we accept the `fro``mColumnIndex` which is the index of the column we want to move, and the `to``ColumnIndex` which is the index where we want to move our column.  Then we’ll add to our code in our Board component so that our columns become draggable.

📃 **/src/views/Board.vue**

```html
    <div class="column"
      v-for="(column, $columnIndex) of board.columns"
      :key="$columnIndex"
      draggable
      @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
      @dragover.prevent
      @dragenter.prevent
      @dragstart.self="pickupColumn($event, $columnIndex)"
    >
```

Again, similar to what we did with the tasks, we need to make all columns `draggable`. Since now the we will be dropping both tasks and columns on other columns, we need to replace our `@drop="moveTask"` handler with a new one, that can decide which action to take. We’ll name it `moveTaskOrColumn`. Since our column is now draggable, we need to add a `dragstart` handler named `pickupColumn`.

We’ve also made a bunch of tweaks to the code in here, to add functionality for dragging and dropping in different places.

📃 **/src/views/Board.vue**

```javascript
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
    
      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task') // <--- New code to identify task
    },
    pickupColumn (e, columnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
    
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    } 
```

Okay, we can now move both columns and tasks between different  columns, but tasks always end up at the very end of the list. That’s  hardly useful. So let’s add a way to move the tasks into specific  positions within a column. We need to update our template.

📃 **/src/views/Board.vue**

```html
    <div
      class="task"
      v-for="(task, $taskIndex) of column.tasks"
      :key="$taskIndex"
      draggable
      @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
      @click="goToTask(task)"
      @dragover.prevent
      @dragenter.prevent
      @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
     >
```

Similar to the column template, we need to add a `drop` event listener on every task, so that we can catch other tasks being dropped on top of it.

Now we need to modify `moveTask` so that it keeps track of where we drop our task, the task indexes.

```javascript
    moveTask (e, toTasks, toTaskIndex) { // <--- Added toTaskIndex
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex, // <-- added index
        toTasks,
        toTaskIndex // <-- added index
      })
    },
```

Then we’ll update our `MOVE_TASK` mutation to move to the proper index.

📃 **/src/store.js**

```javascript
    // now also accepts `targetIndex` 
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
```

With these changes, we can now move tasks to a selected position  within the tasks list, drag columns around, and drag tasks within  columns.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-5-complete)
- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-6-complete)

---

