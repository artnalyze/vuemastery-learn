# Global Components

In this tutorial, we’ll be learning about globally registered components.

We’ll learn:

- Why and when you’d want to use global registration
- Automatic Registration
- How to create an icon component and use it globally

------

## Why Global Registration?

In the previous lesson we learned how to create a single file component, then import and **locally register** it within another component so we could use it in that parent  component’s template. However, with local registration, the component is only available for use within the component in which it’s registered.

But what if we need a component to be accessible throughout our  application? For example, we could have an icon component that we need  to use throughout our app. While we could certainly import and locally  register it within every parent component that needs to use it, that  could become time-consuming and add unnecessary code. It would be more  efficient to **globally register** this component. In other words, we could make the component available to every component within our application.

Let’s explore ways we can achieve this.

------

## Basic Global Registration

You might be wondering what type of components warrant global  registration. Some examples of these types of components would be what  are commonly called “base components,” such as a button, or an icon. Why “base”? Because these are the smallest building blocks of your apps  that will never go away.

Surely you can imagine how you’d use a button or icon component  throughout your application, in multiple views, and in different  contexts.

On that note, let’s start creating an icon component for our app, and we’ll see how we can quickly globally register it.

We’ll fully build out this component later in this lesson, but for now here is our icon component, which we’ll name **BaseIcon.vue**.

```javascript
    <template>
      <div>Icon</div>
    </template>
    
    <script>
    export default {
    }
    </script>
    
    <style scoped>
    </style>
```

Now if we go into our **main.js** file, we can do the following two steps:

1. Import **BaseIcon.vue** import BaseIcon from ‘@/components/BaseIcon’
2. Globally register it Vue.component(‘BaseIcon’, BaseIcon)

Note that we need to register our component *above* where we’re creating our root Vue instance (`new Vue(...)`).

And that’s it. Now our **BaseIcon** can be used throughout our entire application.

------

## Automatic Global Registration

You might be wondering, what if I have an entire collection of base  components that I’d like to globally register? Wouldn’t it be verbose  and not very DRY to register them all manually like:

```javascript
    Vue.component('BaseIcon', BaseIcon)
    Vue.component('BaseButton', BaseButton)
    Vue.component('BaseInput', BaseInput)
```

And you’re right. This could get quite repetitive.

If you get to the point you have a bunch components that need to be globally registered, there’s a way to do so automatically.

Here’s the solution directly from the [Vue docs](https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components):

**Main.js**

```javascript
    import Vue from 'vue'
    import upperFirst from 'lodash/upperFirst'
    import camelCase from 'lodash/camelCase'
    
    const requireComponent = require.context(
      './components',
      false,
      /Base[A-Z]\w+\.(vue|js)$/
    )
    
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
    
      const componentName = upperFirst(
        camelCase(
          fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
      )
    
      Vue.component(
        componentName,
        componentConfig.default || componentConfig
      )
    }) 
```

If this looks confusing, don’t worry. Let’s break it down.

```javascript
    import Vue from 'vue'
    import upperFirst from 'lodash/upperFirst' 
    import camelCase from 'lodash/camelCase'
```

We’re importing Vue, and below that we’re importing a couple methods from [Lodash](https://lodash.com/), which is a JavaScript library that provides utility functions for common programming tasks.

- [upperFirst](https://lodash.com/docs/4.17.10#upperFirst) converts the first character of a string to upper case.
- [camelCase](https://lodash.com/docs/4.17.10#camelCase) converts a string to [camel case](https://en.wikipedia.org/wiki/CamelCase) (camelCase isWritten likeThis)

We’ll invoke these methods soon. First, let’s add lodash to our project. We can spin up the Vue UI from the command line with `vue ui` and add lodash from there.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578370292207_0.png?alt=media&token=5912c092-2868-4b73-8269-255284170197)

------

**Webpack’s require.context**

```javascript
    const requireComponent = require.context(
      './components', // the relative path of the directory to search
      false, // subdirectories will not be searched
      /Base[A-Z]\w+\.(vue|js)$/ // regular expression that searches for components starting with "Base" and ending in .vue or .js
    )
```

Above, we’re using [require.context](https://webpack.js.org/guides/dependency-management/), which is a feature of Webpack. This is a function that allows you to pass in 3 arguments:

1. A directory to search within.
2. A flag indicating whether subdirectories should be searched, too.
3. A regular expression to match files against.

Webpack looks for `require.context()` in the code while building, then requires every matching file to ensure it’s in your compiled bundle, even if it’s never used.

Moving along, what is this doing?

```javascript
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
```

Here, `keys()` gets us an array of each file so we can iterate through each and then get the object exported using `requireComponent` so we can globally register each, which we’ll do below.

We may have file names like `BaseIcon.vue`(PascalCase) or `base-icon.vue` (kebab-case). If the name is `base-icon.vue`, we need to convert it to PascalCase, which will allow the component to be referenced as both PascalCase (e.g. ``) or kebab-case (e.g. ``).

```javascript
      const componentName = upperFirst(
        camelCase(
          fileName.replace(/^\.\/(.*)\.\w+$/, '$1') // removes what's before and after the filename itself
        )
      )
```

Above, we’re using our lodash functions to uppercase the first character of our `fileName` as well as camelCase the following word in the `fileName`.

```javascript
      Vue.component(
        componentName,
        componentConfig.default || componentConfig
      )
    }) 
```

Finally, we’re registering each component globally, and telling Vue to look for the component options on `.default`, which will exist if the component was exported with `export default`. Otherwise, Vue will fall back to the module’s root, which is what’s exported when using `module.exports =`  instead of `export default`.

Now that we understand how to manually and automatically globally  register components, you can choose how you’d like to register the **BaseIcon** component. Since it’s only one component, it’s certainly simpler to  manually register it. But if you’d like to practice automatic  registration, you’re welcome to globally register it with this method  described above.

------

## Fleshing out BaseIcon.vue

Since our **BaseIcon** component will be exactly that: an icon, we can use an SVG within it to draw our icons.

SVG stands for scalable vector graphic, which is a topic too deep to  cover fully in this lesson. But for now, know that we’ll be using an `svg` element to draw our icons dynamically, based on the **name** of the symbol we tell it to draw, along with a **width** and **height**. If you’re not familiar with SVGs, you can learn about them [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial). But for the sake of this course, this lesson should teach you  everything you’ll need to know to start using an SVG icon in your app.

Before we build out our **BaseIcon** component, let’s add the `feather-sprite.svg` file to our project. This is available in the Lesson Resources on this  page. You’ll want to download the file and place it in your project’s `public` directory.

If you open it up, you’ll see a collection of `symbols` within it, that look like:

```svg
    <symbol id="activity" viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </symbol>
```

Each `symbol` contains within it the instructions that tells the [svg element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) how to draw that symbol. In this case, the symbol is named “activity”, hence `id=``"``activity``"`.

So our `feather-sprite.svg` file is essentially a library of symbols that can potentially be drawn by an `svg` element, and it contains the instructions for how each symbol should be drawn.

Let’s add an `svg` element to our **BaseIcon.vue**’s template.

```html
    <template>
    <div class="icon-wrapper">
      <svg class="icon" width="" height="">
        <use v-bind="{'xlink:href':'/feather-sprite.svg#'+name}"/> // notice +name here
      </svg>
    </div>
    </template>
```

Inside the `svg` we have the `use` element, which allows us to tell the `svg` where to look for the symbol to use: `'xlink:href':'/feather-sprite.svg#'+name`

In other words: `use` is pulling in the symbol whose id matches `name`, and the `svg` can then draw that symbol. We’re using `v-bind` here which allows us to dynamically add the `name` of the symbol to the end of this `xlink:href` path. If it helps, you can imagine this like the `src` attribute on an `img` tag.

So if `name` is “activity”, our `use` element will look into our `feather-sprite.svg` file, and it will find the symbol with the id of “activity” in order to gather the information needed to draw that specific “activity” symbol.

Now you might be wondering, where is our component getting `name`?

It’s receiving `name` as a prop.

```javascript
    <script>
    export default {
      props: {
        name: String // the name of the symbol we want to use
      }
    }
    </script>
```

This way, our **BaseIcon** is designed to be able to draw any symbol we want it to from our `feather-sprite.svg` library of symbols. When we place our **BaseIcon** component within the template of a parent component, we can feed it a `name` via props, which BaseIcon will `use` to draw the symbol whose id matches that name.

```html
    <BaseIcon name="activity"/>
```

Props are essentially a funnel on your component that lets you pass  properties into it from the parent component. If you need a refresher on props, check out our lesson on [Components](https://www.vuemastery.com/courses/intro-to-vue-js/components) from the Intro to Vue.js course.

On the topic of props, notice how our `svg` expects an inline  `width` and `height`.

```html
    <svg class="icon" width="" height="">
```

To make the icon more dynamic, we can add props that allow us to  optionally alter its width and height. By default, the icon will be 24px by 24px, unless we feed different values in as props.

```javascript
    <script>
    export default {
      props: {
        name: String, 
        width: {
          type: [Number, String],
          default: 24
        },
        height: {
          type: [Number, String],
          default: 24
        }
      }
    }
    </script>  
```

Now we can set our `svg`'s width and height with these props.

```html
    <svg class="icon" :width="width" :height="height">
```

If we wanted to alter its size from the default 24px, we could pass them into **BaseIcon** like so:

```html
    <BaseIcon name="activity" width="48" height="48" />
```

Finally, let’s give our **BaseIcon** some style. Here’s the complete component with scoped styles.

```javascript
    <template>
    <div class="icon-wrapper">
      <svg class='icon'  :width="width" :height="height">
        <use v-bind="{'xlink:href':'/feather-sprite.svg#'+name}"/>
      </svg>
    </div>
    </template>
    
    <script>
    export default {
      name: 'Icon',
      props: {
        name: String,
        width: {
          type: [Number, String],
          default: 24
        },
        height: {
          type: [Number, String],
          default: 24
        }
      }
    }
    </script>
    
    <style scoped>
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.4);
      font-size: 1rem;
      font-weight: 600;
    }
    .icon {
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      margin-right: 6px;
    }
    </style>
```

Now let’s use **BaseIcon** to see it in action.

------

## Adding BaseIcon to EventCard

Our EventCard component could benefit from an icon. Let’s add a **BaseIcon** next to where we display how many users are attending the event.

Since we’ve already globally registered the component, we don’t need to import or register it within **EventCard**, we can simply use it in the template right away.

```html
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users" />
      <span>{{ event.attendees.length }} attending</span>
```

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578370292208_1.png?alt=media&token=2f64e605-0619-42aa-9676-60eae16537d2)

Awesome. Now our **EventCard** is successfully displaying an icon, by using our globally registered **BaseIcon** component.

------

## What’s next

In the next lesson, we’ll learn all about slots.

---

### Lesson Resources

- [SVG File](https://raw.githubusercontent.com/Code-Pop/real-world-vue/master/public/feather-sprite.svg)
- [Learn about SVGs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [Vue Docs: Automatic Registration](https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components)
- [Webpack’s require.context](https://webpack.js.org/guides/dependency-management/)
- [Lesson Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson7-global-start)
- [Lesson Ending Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson7-global-finish)

---

