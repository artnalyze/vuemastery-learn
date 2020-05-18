# Adding and Editing Tasks

Now that we can display tasks in a modal, let’s start working on actually  being able to change the underlaying task data.  We’ll start by adding a textarea to actually print out the task description:

📃 **/src/views/Task.vue**

```html
    <template>
       <div class="task-view">
         ...
         <textarea
           placeholder="Enter task description"
           class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
           :value="task.description"
         />
         </div>
       </div>
     </template>
```

This will show our description on the modal we created for tasks from the last lesson.

To get started with the ability to add tasks we’ll create a Vuex  mutation that can do just that. It will receive the lists of tasks  within a column, the task name/title and simply push a new task into the list of tasks. We will also use `uuid` that we import from our utils, to create unique IDs.

📃 **/src/store.js**

```javascript
    import { uuid, saveStatePlugin } from './utils' // <--- uuid is being imported
    ...
    mutations: {
      CREATE_TASK (state, { tasks, name }) {
        tasks.push({
          name,
          id: uuid(),
          description: ''
        })
      }
    }
    ...
```

Now lets add the mentioned input near the end of the column code, just after the `v-for` with the tasks list, but within the `v-for` that iterates over the columns.

📃 **/src/views/Board.vue**

```html
    <template>
      ...
            <div class="list-reset">
              <div
                class="task"
                v-for="(task, $taskIndex) of column.tasks"
                :key="$taskIndex"
                @click="goToTask(task)"
              >
                ...
              </div>
    
              <input
                type="text"
                class="block p-2 w-full bg-transparent"
                placeholder="+ Enter new task"
                @keyup.enter="createTask($event, column.tasks)"
              />
            </div>
      ...
```

Let’s make use of that mutation inside `Board.vue` and add a `createTask` method that we will later use on an `` element.

📃 **/src/views/Board.vue**

```javascript
    methods: {
      createTask (e, tasks) {
        this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
          // clear the input
        e.target.value = ''
      }
    }
```

Done! We can now start typing new tasks in the input inside each  column and after pressing the enter key, it will be added at the end of  the column.

While we’re at managing the tasks, let’s also add a way to edit them. For that we need one simple mutation in our Vuex store. I will name it `UPDATE_TASK`. The mutation is pretty straightforward. It accepts the `task` we want to modify, the property that we want to change on the task and the new value of that property.

📃 **/src/store.js**

```javascript
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      Vue.set(task, key, value)
    }
```

The editing itself will, however, take place inside the detailed view, that is, inside the /`src/views/Task.vue` component. We will add two inputs there instead of just displaying the `{{ task.name }}`. This is how the component’s template should look after the changes.

📃 **/src/views/Task.vue**

```html
    <template>
       <div class="task-view">
         <div class="flex flex-col flex-grow items-start justify-between px-4">
         <input
           class="p-2 w-full mr-2 block text-xl font-bold"
           :value="task.name"
           @keyup.enter="updateTaskProperty($event, 'name')"
           @change="updateTaskProperty($event, 'name')"
         />
         <textarea
           placeholder="Enter task description"
           class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
           :value="task.description"
           @change="updateTaskProperty($event, 'description')"
         />
         </div>
       </div>
     </template>
```

As you probably noticed, we used a method called `updateTaskProperty` that is not yet present in our code, so let’s add it now to our `Task.vue` component. It will be the bridge between the interface and the Vuex mutation.

📃 **/src/views/Task.vue**

```javascript
    methods: {
       updateTaskProperty (e, key) {
         this.$store.commit('UPDATE_TASK', {
           task: this.task,
           key,
           value: e.target.value
         })
       }
    }
```

The method accepts the event and the property name that is being modified. It then forwards that information to the `UPDATE_TASK` mutation attaching the task in question as the 3rd param.

Now we can both add and update the tasks. There is just one more  thing that we need to make the board fully functional as a task manager  that will make it possible to track our progress on the tasks. And to  accomplish this we need to be able to move the tasks between columns.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-3-complete)
- [Finished Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-4-complete)

---

