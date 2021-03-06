# SEO with vue-meta

Another killer feature of Nuxt.js is how it allows you optimize your  application for Search Engines (aka. SEO).  In this lesson we’ll look at the problems that Vue Single Page Applications can run into with SEO  and then look at how vue-meta, a library built into Nuxt, solves this  problem.

## Looking back at our Single Page Application

Remember this diagram from the last lesson showing the timeline of a Single Page App?

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373192301_0.jpg?alt=media&token=14fd346e-3a45-4a9b-9c1e-77cd0ca0bebe)

As you can see, the content of our `/create` page isn’t  loaded until our JavaScript is downloaded, run, and Vue Router loads up  the create page.  Our page is dependent on loading the JavaScript to  render.  There are a few problems with this:

- Search crawlers may not support newer JavaScript features.
- Google is the only engine that tries to render JavaScript.
- One JavaScript error can cause your whole site not to be indexed.
- If your page is too slow it may not be indexed at all.
- Client-rendered JS websites don’t rank high historically.

Because of this, we need a better way to do SEO.

## Adding some SEO our Example App.

Let’s take a look at how we can implement some SEO in our example  Nuxt application, starting with two tags.  Each page in our application  needs a title tag, which will be used in search engine results:

```html
    <title>Event Listing - Real World Events</title>
```

They also need their own description which will be used in search results:

```
<meta name="description" content="Where you can find all the events taking place in your neighborhood">
```

In case you’re wondering how these are used by search engine, here’s what our example might look like as a google search result:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373192302_1.jpg?alt=media&token=9e819953-93e5-402f-986a-e48976ae37ad)

## Introducing vue-meta

Nuxt.js has a library built in to help manage page meta info called [**vue-meta**](https://github.com/nuxt/vue-meta), and we’ll be using it to add the title and description tags to our  example application.  If you’re just now joining and you want to code  along, (or you get stuck), here’s a link to my [github starting code](https://github.com/Code-Pop/real-world-nuxt/releases/tag/lesson-4-seo-start).

First I’m going to jump into my `/pages/index.vue` file and add the following in a `` tag:

**📃 /pages/index.vue**

```html
    <script>
    export default {
      head() { // <-- property used by vue-meta to add header tags
        return {
          title: 'Event Listing - Real World Events', // <-- For our title tag
          meta: [
            {
              hid: 'description',  
              name: 'description', // <-- for our meta description tag
              content:
                'Where you can find all the events taking place in your neighborhood'
            }
          ]
        }
      }
    }
    </script>
```

We can use the same syntax to give our `create.vue` file it’s own title and description:

**📃 /pages/create.vue**

```html
    <script>
    export default {
      head() {
        return {
          title: 'Create an Event - Real World Events',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'You can create a new event in your neighborhood'
            }
          ]
        }
      }
    }
    </script>
```

Now if we jump into the browser, inspect the HTML in DevTools, and  click back and forth between the two different links, we can see our  title and description switching back and forth accordingly.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373201553_2.gif?alt=media&token=ba28d2e8-cf83-4601-9bff-af83017051af)

This is not functionality that comes with Vue by default.  There are  two more things we can do to simplify and future proof this code:

1. **Eliminate duplication:**  " - Real World Events" is on every **title**, and this seems like unnecessary duplication.
2. **Add a default description:** Just in case our  developers forget to add a description to a page, it’d be nice to have a default description, and we’ll make this the same description we have  inside `index.vue`.

Both of these changes can be made from our `/layout/default.vue`.

**📃 /layout/default.vue**

```javascript
    export default {
      head: {
        titleTemplate: '%s - Real World Events', // <-- title template
        meta: [
          {
            hid: 'description',
            name: 'description',  // <-- moved this over from index.vue
            content:
              'Where you can find all the events taking place in your neighborhood'
          }
        ]
      },
```

Notice the `%s` in the title template?  This is where our page titles will be placed.  We also moved over our description from our `/pages/index.vue`.  This is where that `hid` value becomes important.  If we didn’t have `hid` and we navigated to `/create` our page would have two descriptions, one from the layout and one from the page.  However, by specifying a `hid`, it ensures that our page only has one unique description.  Now we can update our pages:

**📃 /pages/index.vue**

```html
    <script>
    export default {
      head() {
        return {
          title: 'Event Listing'
        }
      }
    }
    </script>
```

We’ve shortened the title, and removed the description since it’ll use the default description from the layout. Our `create.vue` also needs to be updated.

**📃 /pages/create.vue**

```javascript
      head() {
        return {
          title: 'Create an Event', // <-- shortened the title
          ...
```

If we viewed the browser at this point, we’d end up seeing the same thing we saw earlier.

## What happens if we turn off JavaScript?

Here’s where the magic of Nuxt Universal Mode starts to enable great  SEO.  See, if I jump into the browser at this point, disable JavaScript  and load up either `/` or `/create` paths, the  proper SEO tags are loaded just fine.  This would not be the case if I  was using a standard Single Page application.  In that case, even if my  SPA was using vue-meta, here’s what might happen:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373205403_3.jpg?alt=media&token=04441457-cae4-4907-8428-a1ea72ce93df)

As you can see with the diagram above, when navigating to `/create`, without JavaScript it’s going to load the title and description from the `index.vue`, not from `create.vue`.  Since we have universal mode with nuxt.js, here’s how things work:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373212617_4.jpg?alt=media&token=7b94d168-225c-4ebd-ae9a-81a7d5cf3507)

As you can see, Universal Mode means that all requests return HTML with the correct title and description tags baked in.

vue-meta allows you to add all sorts of SEO tags to your pages.  Here’s a screenshot from [their documentation](https://github.com/nuxt/vue-meta).

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578373216735_5.jpg?alt=media&token=df158ea2-ab52-464f-a104-92c19fae2829)

Notice how it says “Recognized `metainfo` Properties”?  For working with Nuxt, just assume `metaInfo` is the same thing as `head`.

## ⏪ To ReVue

In this lesson we learned about how Nuxt uses `vue-meta`  to allow you to easily specify SEO header tags for your pages.  We also  learned how Universal Mode ensures that our pages get properly indexed  by search engines since they don’t require JavaScript to be properly  read.

---

### Lesson Resources

- [vue-meta docs](https://github.com/nuxt/vue-meta)
- [Starting Code](https://github.com/Code-Pop/real-world-nuxt/releases/tag/lesson-4-seo-start)
- [Finished Code](https://github.com/Code-Pop/real-world-nuxt/releases/tag/lesson-4-seo-finish)

---

