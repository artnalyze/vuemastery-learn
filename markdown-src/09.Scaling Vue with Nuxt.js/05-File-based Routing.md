# File-based Routing

As you saw in previous lessons, with Nuxt we simply place components in  the pages directory and Nuxt generates our router.js for us.  You might  say Nuxt by default does **File-based routing**.  In this  lesson we’ll dive deeper into File-based routing, learning how to find  the router.js Nuxt creates for us (helpful for debugging), nested  routes, dynamic routes, and how to override Nuxt’s default error page.

------

## The Generated router.js

In our example application we have two files in our pages directory, a `create.vue` and an `index.vue`.  If we want to inspect the router.js file that Nuxt is creating for us, we’ll want to make sure our server is running, and then look in the `.nuxt` directory that our server application generated.

**📜/.nuxt/router.js**

```javascript
    ...
        routes: [{
          path: "/create",
          component: _2a60c538,
          name: "create"
        }, {
          path: "/",
          component: _c3751f8a,
          name: "index"
        }],
    ... 
```

As you can see above, Nuxt.js generated our `router.js`  based on the files in our pages directory.  As we build out additional  files and folder in this page directory, referencing this `router.js` can be useful for debugging purposed, to ensure our routes are getting setup properly.

------

## Nested Routes

If we want to nest a route, we can simply put it inside a folder.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373131235_0.jpg?alt=media&token=a337a577-f638-40b7-9b00-af46faad8a2c)

Now if I check back inside my `router.js`, I’ll see that it’s adjusted the route accordingly.

**📜/.nuxt/router.js**

```javascript
    ...
        routes: [{
          path: "/event/create",
          component: _2a60c538,
          name: "event-create"
        },
    ... 
```

This is how we nest routes, just by placing them in folders.

## 🛑 Problem: Viewing a specific Event

One of the most important routes to set up for our app is the  individual event route. The URL will look something like the following: `/event/12345`, where `12345` represents the id of the event. When a user visits that URL they’ll be able to see all of the details for that event.

Traditionally in Vue, to create a dynamic route in Vue Router, we’d use the `:` character followed by the name of the parameter to denote that it’s a  dynamic route.  This is also called a dynamic segment. It’d look  something like the following:

```javascript
        path: '/event/:id',
```

However, in Nuxt we don’t have to write out a router.js, so what do we do?

## ✅ Solution: Nuxt Dynamic Routes

In Nuxt, on the other hand, you prefix the Vue component in your `pages` folder with an underscore ( `_` ) followed by the name of the parameter to create a dynamic route.

Let’s go with `id` as the name of the parameter for our individual event route, so the file will be named `_id.vue`.

**📜/pages/event/_id.vue**

```html
    <template>
      <div>
        <h1>Individual Event: {{ this.$route.params.id }}</h1>
      </div>
    </template>
```

Just like Vue, Nuxt gives you access to `$route` inside of your Vue component object. We can use the `params` object and access the name of the file that we used. In our case that would look like `this.$route.params.id`.

This is a good starting point for our Individual Event. If we visit `http://localhost:3000/event/3` we will see:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373131236_1.jpg?alt=media&token=f5271e34-6c3a-4213-9466-5d7855ee5a2e)

## What about SEO?

Our event pages need to have dynamic data inside their title and description tags for good SEO.  Let’s use this `id` inside our title and description tags.  In the next level we’ll switch this to use data returned from an API.

```html
    <template>
      <div>
        <h1>Event #{{ id }}</h1>
      </div>
    </template>
    <script>
    export default {
      head() {
        return {
          title: 'Event #' + this.id,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'What you need to know about Event #' + this.id
            }
          ]
        }
      },
      computed: {
        id() {
          return this.$route.params.id
        }
      }
    }
    </script>
```

Notice that I moved `this.$route.params.id` to a computed property, so I wouldn’t have to type that whole thing over and over again.

## ⏩ Sidenote: What if we wanted a page at `http://locahost:3000/event`?

In this case we would create a new `/event/index.vue` component.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373138922_2.jpg?alt=media&token=4753a916-3523-418b-99ff-5eff4f8a6028)

## Root Dynamic Routes

We’re going to put our example app aside for a moment and think about two more examples.  The first is, how would we create a root dynamic  route like twitter `twitter.com/vuemastery` ?

To do this in Vue, we would simply create a **Root Dynamic Route** by creating a  `/pages/_username.vue` component.  We’d then access the username parameter through: `{{ this.$route.params.username }}`.

As you can see, any name can be used after the underscore, to be used as the parameter.  It can be id or username, or whatever you wish.

**What about child routes under a dynamic route?**

For example, on twitter to find people VueMastery is following, I can navigate to: `twitter.com/vuemastery/following`.

In this case, the folder gets the underscore:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373141271_3.jpg?alt=media&token=435f3ebb-b510-4e80-968b-e0876978b753)

## Customizing the Error Page

By default in our example app when we go to an invalid URL, we get this default error page:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373144154_4.jpg?alt=media&token=46900925-e26f-4f41-bd33-225d0c902688)

Because of the styles we placed on our page, we’re getting that red  border around our error message, and also we have “Nuxt.js” written in  the bottom left.  Obviously we should fix these two things.  Also, it’d  be nice if it had our default layout with our navigation up top.

## Creating our own Error Page

To create our own error page, I copied some of the code from the [Nuxt.js default error page](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue), and creating the following file which I placed in the layouts  directory.  Note that even though this is in the layouts directory, it  is treated as a page component and the default layout will be used.

📃 **/layouts/error.vue**

```html
    <template>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
          <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
        </svg>
        <div class="title">
          {{ message }} 
        </div>
        <p v-if="statusCode === 404">
          <nuxt-link to="/">
            Return to homepage
          </nuxt-link>
        </p>
      </div>
    </template>
    <script>
    export default {
      name: 'NuxtError',
      props: {
        error: {  // <--- Send in the error
          type: Object,
          default: null
        }
      },
      head() {
        return {
          title: this.message // <--- Set the SEO title
        }
      },
      computed: {
        statusCode() {  // <--- Get the status code
          return (this.error && this.error.statusCode) || 500
        },
        message() {  // <--- Print the error
          return this.error.message
        }
      }
    }
    </script>
```

Now if we navigate to an invalid page we see:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373151184_5.jpg?alt=media&token=c954ae97-3074-48cf-9cd0-33db583fb8be)

Much better, and it has our default layout.

## Bonus: Nuxt is giving proper status codes

If we look in Dev Tools at the request for an invalid page, we can  see that Nuxt is indeed returning the proper 404 Not Found status code.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373151185_6.jpg?alt=media&token=b4c22114-c087-4fe6-9fd0-8b0a07cf32c6)

This is awesome, as Vue.js out of the box isn’t going to do this.   Remember, with Vue in SPA mode, no matter what URL the user calls up,  it’s going to return the `index.html` file.  Thus, it won’t be configured to give proper status codes.

**Why is not using proper status codes bad?**

Eventually our website is going to have pages (or events) which go  away.  However, if search engines have indexed our pages, they may still link to old pages, which may show errors, or not found text.

Sending a 404 status code is the best way to inform search engines  that this page no longer exists, and thus it will stop linking to these  pages.

Nuxt is able to return this 404 status code because it uses Universal Rendering.  It knows that the page doesn’t exist on the server-side, so it can return the proper status code.  This is yet another reason your  production applications should probably be using server side rendering.

## ⏪ To ReVue

In this lesson we took a deeper dive into Nuxt routing.  We learned  how to create nested routes, dynamic routes (with the underscore), and  create our own custom error page.  In the next lesson we’ll learn how to do API calls to fetch real data.

---

### Lesson Resources

- [Starting Code](https://github.com/Code-Pop/real-world-nuxt/releases/tag/lesson-5-routing-start)
- [Finished Code](https://github.com/Code-Pop/real-world-nuxt/releases/tag/lesson-5-routing-finish)

---

