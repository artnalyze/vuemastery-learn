# Building Reactivity from Scratch

Note: I recommend you take my [Vue 3 Reactivity course](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity/) before watching this video, especially if you find yourself confused.

Evan starts this lesson by giving us the barebones code to start programming reactivity.  You can access the starting code [in this codepen](https://codepen.io/GreggPollack/pen/xxwXjGN?editors=1000), or use what I have below:

```html
<script>
  class Dep {
    
  }
  
  function watchEffect(effect) {
    
  }
  
  const dep = new Dep()
  
  watchEffect(() => {
    dep.depend()
    console.log('effect run')
  })
  
  dep.notify()
</script>
```

Evan goes on to solve implement the missing `Dep` and `watchEffect` functions, which you can see in [this codepen](https://codepen.io/GreggPollack/pen/ZEbXobM?editors=1001).  He then goes on to add additional functionality to this  implementation, allowing for the store of a value, and removing the need to call `notify` and `depend`.  Finally he shows why you might have the need to remove tracked dependencies.

### Lesson Resources

- [Vue 3 Reactivity](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity/)
- [CodePen 1](https://codepen.io/GreggPollack/pen/xxwXjGN?editors=1000)
- [CodePen 2](https://codepen.io/GreggPollack/pen/ZEbXobM?editors=1001)



