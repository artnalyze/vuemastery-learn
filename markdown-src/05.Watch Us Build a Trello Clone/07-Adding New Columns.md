# Adding New Columns

There’s one thing we missed along the way – adding new columns. Let’s quickly fix that starting with the Vuex mutation.

📃 **/src/store.js**

```javascript
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
```

Now let’s add an “fake” column just after the `v-for` with the columns list. This is where we will have a small input to name our  new column.  This goes right after the div where we iterate through all  the columns:

📃 **/src/views/Board.vue**

```html
    <div class="column flex">
      <input
        class="p-2 mr-2 flex-grow"
        placeholder="New column name"
        v-model="newColumnName"
        @keyup.enter="createColumn"
      />
    </div>
```

The template includes two new things: `newColumnName` from local state and `createNewColumn` method.

```javascript
    export default {
      data () {
        return {
          newColumnName: ''
        }
      },
      // ...
      methods: {
        createColumn () {
          this.$store.commit('CREATE_COLUMN', {
            name: this.newColumnName,
          })
          this.newColumnName = ''
        },
        // ...
      }
    }
```

And now we can create new columns in our app!

---

### Lesson Resource

- [Starting Code](https://github.com/Code-Pop/watch-us-build-trello/releases/tag/lesson-6-complete)

---

