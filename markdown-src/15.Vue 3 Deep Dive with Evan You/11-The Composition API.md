# The Composition API

In this lesson we talk about the new functionality contained in the Vue 3  composition API. We also talk about the difference between `watchEffect` and `effect` and `watch` in Vue, and show a couple of examples.

Specifically, `watchEffect` is a wrapper over effect, which is associated with the component it is declared with for proper garbage collection. `watchEffect` also takes a function and runs it immediately. `watch` is a lot like Vue 2 where you have to declare a source to track and a  callback. The callback can receive new value and old value if  needed. Also with `watch`, the callback isn’t called immediately.

Then we speak about the `setup` method, and the `props` object that it receives as a first argument.  From there Evan speaks on how new lifecycle hooks, and how they are now much more easily reusable across other components.  Lastly, we discuss the `template` render context, providing the values that are exposed to your templates.