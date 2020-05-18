# Drag & Dropping Tasks

In this lesson we will be using the browser’s [drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) to implement the ability to move around tasks in our Trello app.  This  isn’t the easiest to implement, so this example of how to do it with Vue should be very useful.

We’ll start with our Vuex store. To move the tasks around we will create a new mutation called `MOVE_TASK`. It’s purpose is to remove the task from the column it is located and  move it to a new column. To make it happen, we need 3 arguments: the  task list where the task is currently, the task list we want to move it  to, and the index of where the task is located in the first column.

📃 **/src/store.js**

```javascript
...
  mutations: {
    ...
    MOVE_TASK (state, { fromTasks, toTasks, taskIndex }) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]
      toTasks.push(taskToMove)
    }
  }
```

If the code above looks different than in the video, it’ll be changed to what I have listed above, as we thought of better parameter names.  😉 Now the hard part! We will need to dive a bit into the Drag’n’Drop  browser API. It’s not the easiest browser API out there, so if you  haven’t had the chance to use it yet, feel free to pause the video and  take a look at the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API). Although we will start with the most naive approach – by the end of  this course, we will create a pretty nice abstraction on top of the API.

Let’s open the `src/views/Board.vue` component and start building. Because we want to move our tasks, we need to add the `draggable` attribute to our `` that wraps our task. This will make it possible to /drag/ the div  around along with its content. And only that for now at least.

Next step is that we need to react to the task being dragged. We can listen to `@dragstart` on the DOM element. The event listener will then be called with the default `dragstart`, injected via `$event`, the index of our task and the index of our column, `$taskIndex` and `$columnIndex` respectively. We will create the `pickupTask` method and use it here.

📃 **/src/views/Board.vue**

```html
    <div
      v-for="(task, $taskIndex) of column.tasks"
      :key="$taskIndex"
      class="task"
      draggable
      @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
      @click="goToTask(task)"
    >
```

Let’s define this `pickupTask` method, which is a method in this component:

```javascript
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
    },
```

Inside `pickupTask` we’re calling the `setData` method on the `dataTransfer` interface and saving the `taskIndex` and then the same for the `sourceListIndex` which stands for the index of the column where the task is located. Take note that the `dataTransfer` interface works pretty similar to `localStorage` in that it can only store properties that can be /stringified/. This  means transferring recursive data structures or functions won’t work.

Now we need to make our column can accept an element being dropped.  To make it happen we need another set of listeners, most importantly the `@drop` event.

```html
    <div class="column"
      v-for="(column, $columnIndex) of board.columns"
      :key="$columnIndex"
      @drop="moveTask($event, column.tasks)"
      @dragover.prevent
      @dragenter.prevent
    >
```

As you can see, we also need to add two additional listeners, for the `dragover` and `dragenter` events and we need to prevent the default behavior. Pretty great that we’re using Vue, because we can simply add `@dragover.prevent`.  Let’s focus on the `@drop` event. As the name suggests, it is being triggered when an element  being dragged is released on top of our element. The listener will be  called with the default `$event` and in our case also with the list of tasks in the column.

```javascript
    moveTask (e, toTasks) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const taskIndex = e.dataTransfer.getData('task-index')
    
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        taskIndex
      })
    }
```

Now the `moveTask` method. Once it is called, we can take the information transferred through the `dataTransfer` interface and locate our tasks list. Now we have all the data we need to be able to call the `MOVE_TASK` mutation. And that’s it, moving tasks should be working now.

In the next lesson we’ll expand this functionality to allow for  moving columns around, as well as the ability to move tasks within  columns.  Stay tuned for that.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-4-complete)
- [Finished Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-5-complete)

---

