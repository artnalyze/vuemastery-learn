# Building the Reactive API

Building on top of the `Dep` class and `watchEffect` Evan created in the last lesson, we build out the reactive syntax first using `defineProperty` like Vue 2, then using `Proxy` and `Reflect` like Vue 3. Lastly we’ll build out how Vue 3 saves all the `deps` through `targetMap` and `depMap`.