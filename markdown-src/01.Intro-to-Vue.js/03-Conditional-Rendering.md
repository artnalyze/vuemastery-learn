# Conditional Rendering

In this lesson we’ll be uncovering how to conditionally display elements with Vue.

## Our Goal

We want to display text that says if our product is in stock or not, based on our data.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365598289_0.png?alt=media&token=949b7622-0d47-43b3-bc68-9a4eab8cb5f0)

## Starting Code

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365607045_1.png?alt=media&token=dd75bdf2-42a3-439a-aab8-c16773e9765a)

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365607046_2.png?alt=media&token=695eb7c8-9261-4759-8c93-6290723ee2a8)

Notice we’ve added a new data property there at the bottom: `inStock`.

## Problem

Often in a web application, we want elements to appear on the page  depending on if a condition is met or not. For instance, if our product  is not in stock, our page should display the fact that it’s out of  stock.

So how could we conditionally render these elements, depending on whether our product is in stock or not?

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365611244_3.png?alt=media&token=363fea20-67f9-41d7-9f4d-fe95ef5559cc)

## Solution

Vue’s solution is simple and straightforward.

Given that our data contains this new property:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365613877_4.png?alt=media&token=95dfb153-d2f2-47fa-a9e2-fd8704967b8d)

We can use the  `v-if` and `v-else` directives to determine which element to render.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365615992_5.png?alt=media&token=f54205e3-8230-48df-b310-be0fa3bd394d)

If `inStock` is truthy, the first paragraph will render. Otherwise, the second paragraph will. In this case, since the value of `inStock` is true, the first paragraph will render.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365617923_6.png?alt=media&token=911d40cc-d094-4216-9d30-fef1a16b13e8)

Great. We’ve used conditional rendering to display whether our  product is in stock or not. Our feature is done. But let’s explore  conditional rendering some more before we move onto our next topic.

## Additional Conditional Syntax: v-else-if

We can add a third degree of logic with `v-else-if`. To demonstrate, let’s use an example that is a bit more complex.

If our data looked something like this:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365621923_7.png?alt=media&token=66bc2fe7-fc2b-445f-9740-fdf3ce301e20)

We could use expressions, inside the quotes, to make our conditions more specific.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365621924_8.png?alt=media&token=77438134-3745-48a0-bafa-29d3c9bc2c16)

The element that will render is the first element whose expression evaluates to true.

## Additional Conditional Syntax: v-show

If your app needs an element to frequently toggle on and off the page, you’ll want to use the `v-show` directive. An element with this directive on it will always be present  in our DOM, but it will only be visible on the page if its condition is  met. It will conditionally add or remove the CSS property `display: none` to the element.

This method is more performant than inserting and removing an element over and over with `v-if` / `v-else`.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365625006_9.png?alt=media&token=57179142-1fe4-4f3e-a2a8-fcb5ac5270b2)

However, in the product app we’re building, using a `v-if` and `v-else` works just fine, so we’ll keep that as our solution.

## What’d we learn

- There are Vue directives to conditionally render elements:
  - v-if
  - v-else-if
  - v-else
  - v-show
- If whatever is inside the directive’s quotes is truthy, the element will display.
- You can use expressions inside the directive’s quotes.
- V-show only toggles visibility, it does not insert or remove the element from the DOM.

## Learn by doing

### Challenge:

Add an `onSale` property to the product’s data that is used to conditionally render a `span` that says “On Sale!”

---

### Lesson Resource

- [Get the Style Sheet](https://gist.github.com/atomjar/67db5aa9b7b9013dcf0d91c91f54e1a9)

---

### Coding Challenge

[Start the Challenge](https://codepen.io/GreggPollack/pen/omKxoK)

------

[View the Solution](https://codepen.io/GreggPollack/pen/vboGpO)

