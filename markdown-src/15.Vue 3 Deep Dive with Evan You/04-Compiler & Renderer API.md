# Compiler & Renderer API

In this lesson Evan gives starts by giving us a tour of the Vue 3 Template Explorer, which allows us to see the render functions created by the  Vue 3 Compiler.  Using this explorer Evan shows us new optimizations in  Vue 3.  He then gives us a code challenge to implement our own simple  Rendering API.  The starting code is below, but is also on [this codepen](https://codepen.io/GreggPollack/pen/eYpEyrO).

**Note:  Evan makes a simplification in the next video,  removing an array in the vdom constant.  Thus I’ve removed it in the  codepen, and the example below:**

```html
<div id="app"></div>

<script>
  function h(tag, props, children) {
    
  }
  function mount(vnode, container) {
    
  }
  const vdom = h('div', { class: 'red' }, [
    h('span', null, 'hello')
  ])
  
  mount(vdom, document.getElementById('app'))
</script>
```



### Lesson Resource

- [CodePen](https://codepen.io/GreggPollack/pen/eYpEyrO)

