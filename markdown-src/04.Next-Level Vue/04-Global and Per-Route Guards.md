# Global and Per-Route Guards

In this lesson we’ll learn how to use Global and Per-Route Guards to  provide a progress bar when our application has slow internet API calls.  This is the official solution we’ll be using in our example app, so  now would be a great time to [download our example app](https://github.com/Code-Pop/real-world-vue/releases/tag/progress-bar-start) and get it up and running if you want to follow along.

## Getting the App Setup (optional)

Here are the commands you’ll want handy once you have it installed.  I’m assuming you already have npm installed.

To install dependencies:

```
    $ npm install
```

To get json-server, which we use for our mock database

```
    $ npm install -g json-server
```

To run the mock database (with a 1.5 second delay)

```
    $ json-server -d 1500 --watch db.json
```

To run the server:

```
    $ npm run serve
```

## 🛑 Problem: Our API calls might not always be super fast

The problem we’re trying to solve is still to account for the  internet not always being fast.  Right now when we view an event here’s  what we see (and what you should see):

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372432343_0.gif?alt=media&token=684ff79c-80b2-4b9a-8aa0-6e03f5289d30)

As you can see, it looks kinda broken.  The template is loaded blank, and then the data pops in.

## ☑️ Solution #3: Global and Per-Route Guards

For this solution, we’ll be starting from scratch again, so we’ll need to install the NProgress library:

```
    $ npm install nprogress
```

And then add the NProgress stylesheet as an extra import statement:

📃 **/src/main.js**

```javascript
    import 'nprogress/nprogress.css'
```

Then we’ll use two new [**Global Route Guards**](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards) inside our **router.js** and make the progress bar appear on every page of our app.

📃 **/src/router.js**

```javascript
    ...
    import EventShow from './views/EventShow.vue'
    import NProgress from 'nprogress' // <--- include the library
    
    Vue.use(Router)
    
    const router = new Router({ ... })
    
    router.beforeEach((routeTo, routeFrom, next) => {
      // Start the route progress bar.
      NProgress.start()
      next()
    })
    router.afterEach(() => {
      // Complete the animation of the route progress bar.
      NProgress.done()
    })
    
    export default router
```

As you can see, now we’re storing our router in a `router` constant, and calling two Global Route Guards which start and stop our  progress bar on each route.  In case you’re wondering what order all  these hooks get called, it looks like this:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372432344_1.jpg?alt=media&token=2dfc1124-ca7e-44f8-ac07-9459d1d5b6ba)

If we go into our browser we can see this on every page, and it almost works like we want it:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372440981_2.gif?alt=media&token=9789713a-8e6d-405f-9d1f-baf73c4c05b6)

As you can see, the progress bar finishes loading before our API gets loaded, just like before!  We need a way to not load the component onto the page until it’s done loading, and only then finish the progress  bar.

We need another **Route Guard** for this, and we could use `beforeRouteEnter`  in our EventShow component, but I’m going to solve this a different way.  This time I’ll use a **Route Guard** inside our router, rather than inside our component.

📃 **/src/router.js**

```javascript
    ...
    import EventShow from './views/EventShow.vue'
    import NProgress from 'nprogress' 
    import store from '@/store/store' // <--- Include our store
    
    Vue.use(Router)
    
    const router = new Router({
      mode: 'history',
      routes: [
        ...
        {
          path: '/event/:id',
          name: 'event-show',
          component: EventShow,
          props: true,
          beforeEnter(routeTo, routeFrom, next) { // before this route is loaded
            store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
              next()
            })
          }
        }
      ] ...
```

By including our **Vuex Store** and using the [**Per-Route**](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard) inside our **router.js** we can *dispatch* our `fetchEvent` Action (that we normally would call from our **EventShow**), and only once that’s returned will we allow the navigation to continue by calling `next()`.  However, in order for `then()` to get called when the API is returned we need to make sure this action returns a promise (we did this once before in the previous lesson if  you’re following along):

📃 **/src/store/modules/event.js**

```javascript
    ...
      fetchEvent({ commit, getters, dispatch }, id) {
        var event = getters.getEventById(id)
        if (event) {
          commit('SET_EVENT', event)
        } else {
          return EventService.getEvent(id) // <--- Add return here 
            .then(response => {
              commit('SET_EVENT', response.data)
            })
            ...
```

Now that we’re calling the Action from our router, we no longer need to call it from our **EventShow** action.  This file shrinks a bit:

📃 **/src/views/EventShow.vue**

```javascript
    ...
    <script>
    import { mapState } from 'vuex'
    
    export default {
      props: ['id'],
      computed: mapState({
        event: state => state.event.event
      })
    }
    </script>
```

And if I look in the browser, everything is working as expected:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372445696_3.gif?alt=media&token=577ec386-7b18-4ee6-b72e-0d36dd5e3e0c)

In case you’re wondering, here’s the calling order:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372451463_4.jpg?alt=media&token=9966fdb3-933c-4dc7-8712-ab918b02ef3e)

## 🏗️ Architectural Choice: Removing Vuex from our Components

Before we move on to the other components, there’s some fun refactoring we could do to this **EventShow** page.  We could completely remove Vuex from **EventShow**, and send in **event** as a prop from our new Per-Route Guard.  Our **EventShow** component ends up shrinking a lot:

📃 **/src/views/EventShow.vue**

```javascript
    ...
    <script>
    export default {
      props: {
        event: {  // Simply receive the event to render
          type: Object,
          required: true
        }
      }
    }
    </script>
    ...
```

Yeah, that’s it. Awesome huh? It’s now just a component that renders a single prop that is passed in. How does it get passed in? See below:

📃 **/src/router.js**

```javascript
    const router = new Router({
      mode: 'history',
      routes: [
        ...
        {
          path: '/event/:id',
          name: 'event-show',
          component: EventShow,
          props: true, // Set params to props
          beforeEnter(routeTo, routeFrom, next) {
            store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
              routeTo.params.event = event // <--- Set the event we retrieved
              next()
            })
          }
        }
```

In the code above, we now take the event which is returned and set it to the value of `routeTo.params.event`.  Then after `next()` is called.  Since `props: true` is set for the component, `params.event` gets sent in as the `event` prop, like we were doing with `id` before.

Notice how our `then` callback now has an `event` parameter, which is filled by the `event` that returns from the API.  To make sure the value gets sent in the callback, we’ll need to add two returns to our **event** Module:

📃 **/src/store/modules/event.js**

```javascript
    ...
      fetchEvent({ commit, getters, dispatch }, id) {
        var event = getters.getEventById(id)
        if (event) {
          commit('SET_EVENT', event)
          return event // <--- Added return here
        } else {
          return EventService.getEvent(id)
            .then(response => {
              commit('SET_EVENT', response.data)
              return response.data  // <--- Added a return here
            })
```

Now when our `fetchEvent` ***\**\*A\*\**\*ction** is called, it returns our event so our router can send it into **EventShow** as a prop. Pretty nifty, huh?  It works just the same, but now the **EventList** component has one less dependency, making it easier to test and scale.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372456993_5.gif?alt=media&token=7dbf5dfd-07c4-4600-8761-c4b827959dd2)

## ⏪ Let’s Revue

In this lesson we learned how to use both Global Route Guards and  Per-Route Guards which get called upon navigation before our component  is created.  These can be very useful when we need to fetch data from an API, or when we’re doing any type of authentication.  In the next  lesson we’ll finish up this implementation, building our progress bar  into both our EventList and EventCreate components.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/progress-bar-start)
- [Ending Code](https://github.com/Code-Pop/real-world-vue/releases/tag/progress-bar-global-guard)
- [Global Guard Docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards)
- [Per-Route Guard Docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard)

---

