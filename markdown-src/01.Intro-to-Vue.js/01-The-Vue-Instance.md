# The Vue Instance

Throughout this course you will learn the fundamentals of Vue while we build this product page together.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365059649_0.gif?alt=media&token=cbde36f7-8aff-4ed0-a72f-eae0462814bc)

## Prerequisites:

This course assumes a foundational knowledge in HTML, CSS and JavaScript.

## Our Goal

In this lesson, we’ll show you how to use Vue to display data onto a webpage.

## Our Starting Code

We’re going to start with some very simple HTML and JS code, which looks like this:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365072475_1.png?alt=media&token=49593fca-ee32-497e-ad87-6cb758c58011)

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365072476_2.png?alt=media&token=c2c1d1f6-eee0-4f2b-ab3d-8afc1f1d2793)

## Problem

We need a way to take the variable `product` from our JavaScript and have it show up in the `h1` of our HTML.

Our first step is to include Vue in our project, which we’ll do by adding this line at the bottom of our `index.html` file.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365076671_3.png?alt=media&token=5f8e62c1-f7d1-42f1-9fca-5b6e2812e038)

Next in our main.js we’ll write the following:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365079174_4.png?alt=media&token=5b0b293c-6d64-4a9f-983b-b6aa0008595a)

And then in our index.html we’ll use our first JavaScript expression:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365084775_5.png?alt=media&token=e337448a-bac5-439b-aa19-45219ca110d4)

When we save this, we’ll see “Socks” appear on our webpage.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365088605_6.png?alt=media&token=172d5723-3b4e-4789-930e-e803633fe440)

It worked. Data from our JavaScript is showing up in our HTML. But what did we just do? Let’s break it down:

## The Vue Instance

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365092853_7.png?alt=media&token=92417bd5-de5e-49c5-a383-c13cba3c3a3e)

A Vue instance is the root of our application.  It is created by  passing an options object into it. Just like it sounds, this object has a variety of **optional** properties that give the instance the ability to store data and perform actions.

## Plugging in to an Element

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365092854_8.png?alt=media&token=ebc185f2-0482-477b-86a5-b729bf669c0f)

The Vue instance is then plugged into an element of your choosing,  forming a relationship between the instance and that portion of the DOM.  In other words, we’re activating Vue on the div with the id of `app` by setting `'``#app``'` as the element ( `el` ) that our instance is plugged into.

## Putting our data in its place

A Vue instance has a place for data, in its data property.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365096688_9.png?alt=media&token=cecaa398-fbd6-4541-96f1-11a938fccfef)

The instance’s data can be accessed from inside the element that the instance is plugged into.

## Using an Expression

If we want our `product` to appear in our `h1`,  we can put `product`  inside these double curly braces.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365101298_10.png?alt=media&token=50383331-c8bd-486b-9895-9b2d40ca8ae5)

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365101299_11.png?alt=media&token=e1978618-a974-422c-a765-1f49ef3fe316)

See? It works. Simple huh?

How does it work? Inside the double curly braces, we’re using a JavaScript expression.

## Important Term:  Expression

Expressions allow us to utilize existing data values, together with logic, to produce new data values.

When Vue sees the expression  `{{ product }}`, it recognizes that we are referencing the associated Vue instance’s data, and it replaces that expression with the **value** of product instead, in this case: “Socks”.

## Some other ways expressions can be used:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365104616_12.png?alt=media&token=0cb9e6ec-eeb1-445c-8b42-cfd5a5884bb8)

## Introducing Reactivity

The reason Vue is able to display `product` ‘s value immediately is because Vue is **reactive**. In other words, the instance’s data is linked to every place that data  is being referenced. So not only can Vue make its data appear within the HTML that references it, but that HTML will be updated to display new  values any time that referenced data changes.

To prove that, let’s open the console and change the value of our product string. Look what happens.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365106949_13.gif?alt=media&token=46ae2448-9c68-482b-94d7-d0829cf21e07)

See how easy that was?

## What have we learned?

- How to begin writing a Vue application with a Vue instance, and how to load basic data onto the webpage.
- The Vue instance is the root of every Vue application
- The Vue instance plugs into an element in the DOM
- The Vue instance’s data can be displayed using the mustache-like syntax `{{ }}` called an expression.
- Vue is reactive

## Learn by doing

### Challenge

Add a `description` key to our existing data object with the value “A pair of warm, fuzzy socks”. Then display `description` using an expression in an `p` element, underneath the `h1`.

---

### Coding Challenge

[Start the Challenge](https://codepen.io/VueMastery/pen/qxwZBQ) 

------

[View the Solution](https://codepen.io/VueMastery/pen/JpVXXw)

