# Computed Properties

In this lesson, we’ll be covering Computed Properties. These are  properties on the Vue instance that calculate a value rather than store a value.

## Goal

Our first goal in this lesson is to display our `brand` and our `product` as one string.

## Starting Code

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365685556_0.png?alt=media&token=4582800e-d1db-4207-9f64-c6c6c22ba34b)

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365685557_1.png?alt=media&token=d43b2f2e-59ae-4771-8f96-5a3ad66c3320)

------

Notice we’ve added a `brand`.

## Problem

We want `brand` and `product` to be combined into one string. In other words, we want to display “Vue Mastery Socks” in our `h1` instead of just “Socks. How can we concatenate two values from our data?

------

## Solution

Since **computed properties** *calculate* a value rather than store a value, let’s add the `computed` option to our instance and create a computed property called `title`.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365699583_2.png?alt=media&token=49c5f579-4441-4348-a5dd-23c5ce2e8a8e)

This is pretty straightforward. When `title` is called, it will concatenate `brand` and `product` into a new string and return that string.

Now all we need to do is put `title`  within the `h1` of our page.

So instead of:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365706509_3.png?alt=media&token=c7a73323-4a91-401c-9c8c-a1288074fe59)

We now have:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365709761_4.png?alt=media&token=ffdf67dd-bb58-4f33-84fe-6ff24e091a36)

It works! “Vue Mastery Socks” is appearing in our `h1`.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365709762_5.png?alt=media&token=56474a36-95ca-40b9-a552-3e93e0217b3c)

We’ve taken two values from our data and computed them in such a way that we’ve created a new value. If `brand` were to update in the future, let’s say to “Vue Craftery”, our computed property would not need to be refactored. It would still return the  correct string: “Vue Craftery Socks”. Our computed property `title` would still be using `brand`, just like before, but now `brand` would have a new value.

That was a pretty simple but not entirely practical example, so let’s work through a more complex usage of a computed property.

------

## A More Complex Example

Currently, the way we are updating our image is with the `updateProduct` method. We are passing our `variantImage` into it, then setting the image to be whichever variant is currently hovered on.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365713145_6.png?alt=media&token=13e15d76-7789-4904-b162-d2c9f050a251)

This works fine for now, but if we want to change more than just the  image based on which variant is hovered on, then we’ll need to refactor  this code. So let’s do that now.

Instead of having `image` in our data, let’s replace it with `selectedVariant`, which we’ll initialize as 0.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365715243_7.png?alt=media&token=3e89e35c-a032-40e8-bef4-e26fc711a6b6)

Why 0? Because we’ll be setting this based on the index that we hover on. We can add index to our v-for here, like so.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365719973_8.png?alt=media&token=4f198613-4ceb-47e6-8d9d-1e9f036c4d48)

Now instead of passing in the variantImage, we’ll pass in the index.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365719974_9.png?alt=media&token=5bf20708-4eae-41b7-9994-36cc8aed52bd)

In our `updateProduct` method, we’ll pass in the index,  and instead of updating this.image, we’ll update this.selectedVariant  with the index of whichever variant is currently hovered on. Let’s put a console.log in here too, to make sure it’s working.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365725858_10.png?alt=media&token=74f9c1d5-6fc8-4197-aa63-8153041e147b)

Now when we refresh and open up the console, we can see that it works. We’re logging 0 and 1 as we hover on either variant.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365725859_11.gif?alt=media&token=bb70064b-eade-49d9-b26a-30a391f58416)

But notice this warning here in the console:

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365729845_12.png?alt=media&token=a4219731-5b16-4c03-a52d-121f3efb3472)

That’s because we deleted `image` and replaced it with `selectedVariant`.  So let’s turn `image` into a computed property.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365760521_13.png?alt=media&token=7f1bd2c6-bdad-4ecc-9cf4-0969af989b2e)

Inside, we are returning `this.variants`, which is our array of variants, and we are using our `selectedVariant`, which is either 0 or 1, to target the first or second element in that  array, then we’re using dot notation to target its image.

When we refresh, our image is toggling correctly like it was before,  but now we’re using a computed property to handle this instead.

Now that we have refactored the `updateProduct` method to update the `selectedVariant`, we can access other data from the variant, such as the `variantQuantity` they both now have.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365760522_14.png?alt=media&token=1c296468-9f27-4811-b3ca-fa1e0e1a8fb1)

Just like we did with `image`, let’s remove `inStock` from our data and turn it into a computed property that uses our variant’s quantities.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365763772_15.png?alt=media&token=f5838dd2-d80e-444b-873e-c0a4e655aa1a)

This is very similar to our `image`  computed property, we’re just targeting the `variantQuantity` now rather than the `variantImage`.

Now when we hover on the blue variant, which has a quantity of zero,  inStock will evaluate to false since 0 is “falsey”, so we’ll now see Out of Stock appear.

Notice how our button is still conditionally turning gray whenever `inStock` is false, just like before.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365768585_16.gif?alt=media&token=f4cd74aa-6afe-4275-af41-c6f70b347cb0)

Why? Because we’re still using `inStock` to bind the `disabledButton` class to that button. The only difference is that now `inStock` is a computed property rather than a data value.

------

## What’d we learn

- Computed properties calculate a value rather than store a value.
- Computed properties can use data from your app to calculate its values.

## What else should we know?

Computed properties are cached, meaning the result is saved until its dependencies change. So when `quantity` changes, the cache will be cleared and the **next time you access the value of `inStock` , it will return a fresh result, and cache that result.

With that in mind, it’s more efficient to use a computed property  rather than a method for an expensive operation that you don’t want to  re-run every time you access it.

It is also important to remember that you should not be mutating your data model from within a computed property. You are merely computing  values based on other values. Keep these functions pure.

## Learn by doing

### Challenge:

Add a new boolean data property `onSale` and create a computed property that takes `brand`, `product` and `onSale` and prints out a string whenever `onSale` is true.

---

### Coding Challenge

[Start the Challenge](https://codepen.io/GreggPollack/pen/bzXpvR?editors=1011) 

------

[View the Solution](https://codepen.io/GreggPollack/pen/KJOzoQ?editors=1011)

---

