# List Rendering

In this lesson, we’ll learn how to display lists onto our webpages with Vue.

## Our Goal

We want to be able to display a list of our product’s details.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365326350_0.png?alt=media&token=6f2a8139-b167-4a39-8179-3a2c143404c4)

## Starting Code

Our project’s code currently looks like this:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365342697_1.png?alt=media&token=fafff259-533c-4bf5-9afc-07e1a19d7535)

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365342698_2.png?alt=media&token=87058cde-9700-4fc7-a0b4-e7b129526b12)

What’s new here is our array of `details` at the bottom.

## Problem

We want our page to display our product’s `details`. How can we iterate through this array to display its data?

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365347366_3.png?alt=media&token=ce31ed91-a41e-46d1-8204-9f1f2639d089)

## Solution

Another Vue directive to the rescue. The `v-for` directive allows us to loop over an array and render data from within it.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365351776_4.png?alt=media&token=ea461034-298d-4412-8cb6-c84934f3ccc8)

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365351777_5.png?alt=media&token=f0c7fe07-bdeb-44ea-80cc-719cfb4403bc)

Now we have our details showing up in a list. But how is this working?

The syntax within the quotes of the `v-for` directive may look familiar if you have used JavaScript’s  `for of`  or `for in` before. The `v-for` works like this:

We use a singular noun ( `detail` ) as an **alias** for the string in the array we are iterating over. We then say `in` and name the **collection** ( `details` ) that we are looping through. Inside the double curly braces, we specify what data to be displayed there( `{{ detail }}` ).

Since our v-for is inside an ``, Vue will print out a new `` for each detail in our `details` array.  If our `v-for` was inside a ``, then a `` would have been printed out for each array item along with its content.

You can envision `v-for` like an assembly line, where a  mechanical arm that takes an element from the collection one at a time  in order to construct your list.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365355028_6.gif?alt=media&token=db3e6913-e5fa-4c46-8982-981ea62f6493)

Let’s take a look at a more complex example, displaying an object’s data in a div.

## Iterating Over Objects

### Problem

The product page we’re building needs to be able to show different  versions of the same product, based on an array in our data of `variants`. How would we iterate through this array of objects to display its data?

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365356979_7.png?alt=media&token=c802571a-de59-47ca-9182-3a157066f2ca)

Let’s display the color of each variant. We’ll write:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365366180_8.png?alt=media&token=10cad2c5-020a-423d-be7d-42906955e049)

In this case, we just want to display the color from the variant object, so we’re using dot notation to do so. If we wrote `{{ variant }}` we’d display the entire object.

Note that it is recommended to use a special key attribute when  rendering elements like this so that Vue can keep track of each node’s  identity. We’ll add that in now, using our variant’s unique `variantId` property.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365434669_9.png?alt=media&token=bfa221fb-0f14-47fb-b6fd-4bb7374a7e25)

## What’d we learn

- The `v-for` directive allows us to iterate over an array to display data.
- We use an alias for the element in the array being iterated on, and specify the name of the array we are looping through. Ex: `v-for="item in items"`
- We can loop over an array of objects and use dot notation to display values from the objects.
- When using `v-for` it is recommended to give each rendered element its own unique key.

## Learn by doing

### Challenge:

Add an array of `sizes` to the data and use `v-for` to display them in a list.

---

### Lesson Resource

- [Get the Style Sheet](https://gist.github.com/atomjar/67db5aa9b7b9013dcf0d91c91f54e1a9)

---

### Coding Challenge

[Start the Challenge](https://codepen.io/GreggPollack/pen/QYeNaq) 

------

[View the Solution](https://codepen.io/GreggPollack/pen/ErqKoG)

---

