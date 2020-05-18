# Creating a Mixin

In the previous lesson we separated our code one step at a time into a `BoardColumn` and `ColumnTask` component.  However, these components are sharing duplicate data and  methods, which makes them prime candidates for creating a Mixin.

1. Create a `/mixins/movingTasksAndColumnsMixin.js` file
2. Move the common props of `column`, `columnIndex`, and `board`
3. Move the methods `moveTaskOrColumn`, `moveTask`, and `moveColumn`.
4. Import the Mixin into each of the files and configure it.

We also walk through the code base to see the work we’ve done, and  discuss when it is appropriate to use a Mixin and when it might not.

Our mixin ends up looking like this:

**/src/mixins/movingTasksAndColumnsMixin.js**

```javascript
    export default {
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
        }
      }
    }
```

With these pieces of code moved into a Mixin we can now shorted our BoardColumn and ColumnTask components:

**/src/components/BoardColumn.vue**

```html
    ...
    <script>
    import ColumnTask from './ColumnTask'
    import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
    
    export default {
      components: { ColumnTask },
      mixins: [movingTasksAndColumnsMixin],
      methods: {
        pickupColumn (e, fromColumnIndex) {
          ...
        },
        createTask (e, tasks) {
          ...
        }
      }
    }
    </script>
```

**/src/components/ColumnTask.vue**

```html
    ...
    <script>
    import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
    
    export default {
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
        pickupTask (e, taskIndex, fromColumnIndex) {
          ...
        },
        goToTask (task) {
          this.$router.push({ name: 'task', params: { id: task.id } })
        }
      }
    }
    </script>
```

And that’s all there is to it.  In the next and final lesson we will  extract drag and drop functionality into reusable components.

---

### Lesson Resource

- [Finished Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-8-complete)

---

