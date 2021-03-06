# Error Handling

It’s inevitable that people will end up navigating to pages on our website  that don’t exist or used to exist.  In our event application let’s  figure out how to deal with this and also when we navigate to events  that do not exist.

## 🛑 Problem: The Generic Not Found 404

Right now when I go to a URL that doesn’t exist I get a blank page with no information about what is going on.

## ☑️ Solution: A Not Found Component

Let’s create a generic Not Found Component that we’ll redirect to when a path is accessed that doesn’t exist.

📃 **/src/views/NotFound.vue**

```html
    <template>
      <div>
        <h1>Oops!</h1>
        <h3>The page you're looking for is not here.
        </h3>
        <router-link :to="{ name: 'event-list' }">Back to the home page</router-link>
      </div>  
    </template>
```

Now we need to render this component when we go to a catch-all route, by updating our router.js file:

📃 **/src/router.js**

```javascript
    import NotFound from './views/NotFound.vue'
    ...
    const router = new Router({
      mode: 'history',
      routes: [
        ...
        {
          path: '/404',
          name: '404',
          component: NotFound,
        },
        { // Here's the new catch all route
          path: '*',
          redirect: { name: '404' }
        }
      ]
    })
```

As you can see, we’re creating a 404 path and name which loads our  NotFound component, and then we are redirecting to the 404 path when we  hit our new catch-all route.

There is a reason we’re redirecting to our 404 page (rather than just rendering the component), which will become clear in a minute.  Now  when we load up a path that doesn’t exist, like /login, we get:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372086962_0.jpg?alt=media&token=ae3dc0e5-a77b-4c8a-8f0a-5d0daadb4b16)

Looks great!

------

## 🛑 Problem: What about when we try to view a non-existent Event?

Right now, when we go to an event that doesn’t exist, like `/event/1233` we see this:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372086963_1.jpg?alt=media&token=903aac8b-5280-4845-b356-3429b07b3412)

It’s not horrible, but nothing renders onto the page except a  notification.  A better solution would be to add onto our NotFound  component and navigate the user there.  The great part about navigation  guards is that we can change where the user is navigating based on a  condition (like if the event exists).  Let’s try it!

## ☑️ Solution: Creating a 404 page for our EventShow

The solution kinda depends on you understanding our EventShow code,  so you might want to watch the earlier videos if you start to get lost.

The first thing I’m going to do to make this work is to remove the `catch` in `fetchEvent`.  We will catch the error further up the chain, and since we return  request, we can catch errors up in our router, which we’ll do in a  minute.

📃 **/src/store/modules/event.js**

```javascript
    ...
      fetchEvent({ commit, getters, dispatch }, id) {
        var event = getters.getEventById(id)
        if (event) {
          commit('SET_EVENT', event)
        } else {
          return EventService.getEvent(id)
            .then(response => {
              commit('SET_EVENT', response.data)
              return response.data
            })  // I just deleted the catch
        }
      }
    }
```

Then in the router I’m going to catch the error, and use the `next()` function to send navigation straight to the 404 route.

📃 **/src/router.js**

```javascript
    ...
      {
          path: '/event/:id',
          name: 'event-show',
          component: EventShow,
          props: true,
          beforeEnter(routeTo, routeFrom, next) {
            store
              .dispatch('event/fetchEvent', routeTo.params.id)
              .then(event => {
                routeTo.params.event = event
                next()
              })
              .catch(() => next({ name: '404', params: { resource: 'event' } }))
        },  
        {
          path: '/404',
          name: '404',
          component: NotFound,
          props: true // I added this so we can receive the param as a prop
        },
        {
          path: '*',
          redirect: { name: '404', params: { resource: 'page' } }
                                  // I added this resource param here.
        }
    ...
```

You also should notice that I’m sending a **resource**  parameter into our 404 component.  This will allow me to write a more  descriptive error message on our 404 page.  In order to receive this  param as a prop, I added `props: true` to my 404 path,  added this param to our catch-all route configuration, and now I need to  receive that param as an optional prop in my **NotFound** component.

📃 **/src/views/NotFound.vue**

```javascript
    <template>
      <div>
        <h1>Oops!</h1>
        <h3>The  
          <template v-if="resource">
            {{ resource }}
          </template>
           page you're looking for is not here.
        </h3>
        <router-link :to="{ name: 'event-list' }">Back to the home page</router-link>
      </div>  
    </template>
    <script>
    export default {
      props: {
        resource: {
          type: String,
          required: true
        }
      }
    }
    </script>
```

As you can see, if there is a resource passed in, then the verbiage is used in the user-friendly error message.

Now when we go to `http://localhost:8080/event/123` we see:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372092106_2.jpg?alt=media&token=d01b8004-8e91-4f90-a5ed-2544c2660252)

Great!  Now when people link to events which don’t exist we have a  really nice looking 404 page.  Users hitting this page is inevitable  since our users can delete events.

------

## 🛑 Problem: Errors won’t always be 404

The only issue with this solution is that we’re assuming all network  errors we receive are 404 errors. However, what if the user’s Internet  just died or they’re on a super slow connection? We don’t want to give  them a 404 error if their Internet dies, but that’s what’s going to  happen right now, so let’s fix this.

## ☑️ Solution: A NetworkIssue component

We’ll start by creating a new component:

📃 **/src/pages/NetworkIssue.vue**

```html
    <template>
      <div>
        <h1>Uh-Oh!</h1>
        <h3>It looks you're experiencing some network issues, please click the back button and try again.</h3>
    
        <router-link :to="{ name: 'event-list' }">Or go back to the event list</router-link>
      </div>  
    </template>
```

We’ll add a simple route to our router:

📃 **/src/router.js**

```javascript
        {
          path: '/network-issue',
          name: 'network-issue',
          component: NetworkIssue
        },
```

Then in the router we need to check for the 404 error response from  the API server, and send our response to the appropriate page.

📃 **/src/router.js**

```javascript
              .catch(error => {
                if (error.response && error.response.status == 404) {
                  next({
                    name: '404',
                    params: { resource: 'event' }
                  })
                } else {
                  next({ name: 'network-issue' })
                }
              })
```

Also, in EventService, let’s set a timeout, so that if our browser  waits longer than 15 seconds for the API request to return, it’ll  automatically throw an error that will lead to our NetworkIssue  component.

📃 **/src/services/EventService.vue**

```javascript
    const apiClient = axios.create({
      baseURL: `http://localhost:3000`,
      withCredentials: false, // This is the default
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 15000
    })
```

Now if our API server goes down or takes too long to return, our  users will get a network error rather than just getting a webpage that  loads forever!  See below for the improvements we just made:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578372095191_3.gif?alt=media&token=0cef2d4f-c27b-418c-a85b-daa67067ec56)

## ⏪ Let’s Review

In this lesson we learned how to create a catch-all error page when  the URL doesn’t match any of our routes.  We then showed how to create a 404 Not Found page when the user navigates to an event that doesn’t  exist, and then how to filter out those 404 errors from other network  errors.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/error-handling-start)
- [Ending Code](https://github.com/Code-Pop/real-world-vue/releases/tag/error-handling-finish)

---

