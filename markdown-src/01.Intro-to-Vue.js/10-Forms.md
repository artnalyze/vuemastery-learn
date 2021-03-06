# Forms

In this lesson we’ll be learning how to work with forms in Vue in order to collect user input, and also learn how to do some custom form  validation.

------

## Goal

We’ll be creating a form that allows users to submit a review of a  product, but only if they have filled out the required fields.

------

## Starting Code

Our app now looks like this:

**index.html**

```html
      <div id="app">
        <div class="cart">
          <p>Cart({{ cart.length }})</p>
        </div>
        <product :premium="premium" @add-to-cart="updateCart"></product>    
      </div>
```

**main.js**

```javascript
    Vue.component('product', {
        props: {
          premium: {
            type: Boolean,
            required: true
          }
        },
        template: `
         <div class="product">
              
            <div class="product-image">
              <img :src="image" />
            </div>
      
            <div class="product-info">
                <h1>{{ product }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
      
                <ul>
                  <li v-for="detail in details">{{ detail }}</li>
                </ul>
      
                <div class="color-box"
                     v-for="(variant, index) in variants" 
                     :key="variant.variantId"
                     :style="{ backgroundColor: variant.variantColor }"
                     @mouseover="updateProduct(index)"
                     >
                </div> 
      
                <button v-on:click="addToCart" 
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }"
                  >
                Add to cart
                </button>
      
             </div>  
          
          </div>
         `,
        data() {
          return {
              product: 'Socks',
              brand: 'Vue Mastery',
              selectedVariant: 0,
              details: ['80% cotton', '20% polyester', 'Gender-neutral'],
              variants: [
                {
                  variantId: 2234,
                  variantColor: 'green',
                  variantImage: './assets/vmSocks-green.jpg',
                  variantQuantity: 10     
                },
                {
                  variantId: 2235,
                  variantColor: 'blue',
                  variantImage: './assets/vmSocks-blue.jpg',
                  variantQuantity: 0     
                }
              ]
          }
        },
          methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            },
            updateProduct(index) {  
                this.selectedVariant = index
            }
          },
          computed: {
              title() {
                  return this.brand + ' ' + this.product  
              },
              image(){
                  return this.variants[this.selectedVariant].variantImage
              },
              inStock(){
                  return this.variants[this.selectedVariant].variantQuantity
              },
              shipping() {
                if (this.premium) {
                  return "Free"
                }
                  return 2.99
              }
          }
      })
      
      var app = new Vue({
          el: '#app',
          data: {
            premium: true,
            cart: []
          },
          methods: {
            updateCart(id) {
              this.cart.push(id)
            }
          }
      })
```

------

## Problem

We want our users to be able to review our product, but we don’t yet  have a way to collect user input. We’ll need to create a form for that.

------

## Solution

We’ll create a new component for our form, which will be called `product-review` since it is the component that collects product reviews. `product-review` will be nested within our `product` component.

Let’s register our new component, start building out its template, and give it some data.

```javascript
    Vue.component('product-review', {
      template: `
        <input>
      `,
      data() {
        return {
          name: null
        }
      }
    })
```

As you can see, our component has an input element, and `name` within its data.

How can we bind what the user types into the input field to our `name` data?

Earlier we learned about binding with `v-bind` but that was only for one-way binding, **from the data** to the template. Now, we want whatever the user inputs to be bound to `name` in our data. In other words, we want to add a dimension of data binding, from the template **to the data**.

## The v-model directive

Vue’s `v-model` directive gives us this two-way binding.  That way, whenever something new is entered into the input, the data  changes. And whenever the data changes, anywhere using that data will  update.

So let’s add  `v-model` to our input, and bind it to `name` in our component’s data.

```javascript
    <input v-model="name">
```

So far so good. Let’s add a complete form to our template.

```javascript
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
```

As you can see, we’ve added `v-model` to our `input`, `textarea` and `select`. Note on the `select` we’ve used the `.number` modifier (more on this below). This ensures that the data will be converted into an integer versus a string.

These elements are now bound to this data:

```javascript
    data() {
      return {
        name: null,
        review: null,
        rating: null
      }
    }
```

At the top of the form, you can see that our `onSubmit` method will be triggered when this form is submitted. We’ll build out the `onSubmit`  method in a moment. But first, what’s that `.prevent` doing?

That is an **event modifier**, which is used to prevent the submit event from reloading our page. There are several other useful [event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers), which we won’t cover in this lesson.

We’re now ready to build out our `onSubmit` method. We’ll start out with this:

```javascript
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      this.name = null
      this.review = null
      this.rating = null
    }
```

As you can see, `onSubmit` is creating an object of our user-inputted data, stored within a variable called `productReview`. We’re also resetting the values of `name`, `review` and `rating` to be null. But we’re not done yet. We need to send this `productReview` somewhere. Where do we want to send it?

It makes sense for our product reviews to live within the data of the `product` itself. Considering `product-review` is nested within `product`, that means that `product-review` is a child of `product`. As we learned in the previous lesson, we can use `$emit` to send up data from our child to our parent when an event occurs.

So let’s add `$emit` to our `onSubmit` method:

```javascript
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      this.$emit('review-submitted', productReview)
      this.name = null
      this.review = null
      this.rating = null
    }
```

We’re now emitting an event announcement by the name of “review-submitted”, and passing along with it the `productReview` object we just created.

Now we need to listen for that announcement on `product-review`.

```javascript
    <product-review @review-submitted="addReview"></product-review>    
```

This translates to: when the “review-submitted” event happens, run `product`'s `addReview` method.

That method looks like this:

```javascript
    addReview(productReview) {
      this.reviews.push(productReview)
    }
```

This function takes in the `productReview` object emitted from our `onSubmit` method, then pushes that object into the `reviews` array on our `product` component’s data. We don’t yet have `reviews` on our product’s data, so all that’s left is to add that now:

```javascript
    reviews: []
```

Awesome. Our form elements are bound to the `product-review` component’s data, that data is used to create a `productReview` object, and that `productReview` is being sent up to `product` when the form is submitted. Then that `productReview` is added to `product`'s `reviews` array.

------

## Displaying the Reviews

Now all that’s left to do is to display our reviews. We’ll do so in our `product` component, just above where the `product-review` component is nested.

```javascript
       <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
       </div>
```

Here, we are creating a list of our reviews with `v-for` and printing them out using dot notation, since each review is an object.

In the p tag, we’re checking if the `reviews` array has a length (has any `productReview` objects in it), and it if does not, we’ll display: “There are no reviews yet.”

------

## Form Validation

Often with forms, we’ll have required fields. For instance, we  wouldn’t want our user to be able to submit a review if the field they  were supposed to write their review in is empty.

Fortunately, HTML5 provides you with the `required` attribute, like so:

```html
    <input required >
```

This will provide an automatic error message when the user tries to submit the form if that field is not filled in.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578365475785_0.png?alt=media&token=949c4be5-ff5e-455e-a4c1-71d7fad53d11)

While it is nice to have form validation handled natively in the  browser, instead of in your code, sometimes the way that the native form validation is happening may not be the best for your use-case. You may  prefer writing your own custom form validation.

## Custom Form Validation

Let’s take a look at how you can build out your own custom form validation with Vue.

In our `product-review` component’s data we’ll add an array for errors:

```javascript
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    }
```

We want to add an error into that array whenever one of our fields is empty. So we can say:

```javascript
    if(!this.name) this.errors.push("Name required.")
    if(!this.review) this.errors.push("Review required.")
    if(!this.rating) this.errors.push("Rating required.")
```

This translates to: if our `name` data is empty, push “Name required.” into our `errors` array. The same goes for our `review`  and `rating` data. If either are empty, an error string will be pushed into our `errors` array.

But where will we put these lines of code?

Since we only want errors to be pushed if we don’t have our `name`, `review` or `rating` data filled in, we can place this code within some conditional logic in our `onSubmit` method.

```javascript
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
      }
    }
```

Now, we are checking to see if we have data filled in for our `name`, `review` and `rating`. If we do, we create the `productReview` object, and send it up to our parent, the `product` component. Then we reset the data values to null.

If we don’t have `name`,  `review` and `rating`, we’ll push errors into our `errors` array, depending on which data is missing.

All that remains is to display these errors, which we can do with this code:

```javascript
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
```

This uses the `v-if` directive to check if there are any  errors. In other words, if our errors array is not empty, then this p  tag is displayed, which renders out a list with `v-for`, using the `errors` array in our data.

Great. Now we’ve implemented our own custom form validation.

## Using `.number`

Using the `.number` modifier on `v-model` is a  helpful feature, but please be aware there is a known bug with it. If  the value is blank, it will turn back into a string. The Vue.js [Cookbook](https://vuejs.org/v2/cookbook/form-validation.html#Another-Example-of-Custom-Validation) offers the solution to wrap that data in the `Number` method, like so:

```javascript
    Number(this.myNumber)
```

------

## What’d we learn

- We can use the `v-model` directive to create two-way binding on form elements
- We can use the `.number` modifier to tell Vue to cast that value as a number, but there is a bug with it
- We can use the `.prevent` event modifier to stop the page from reloading when the form is submitted
- We can use Vue to do fairly simple custom form validation

------

## Learn by doing

### Challenge

Add a question to the form: “Would you recommend this product”. Then  take in that response from the user via radio buttons of “yes” or “no”  and add it to the `productReview` object, with form validation.

----

### Lesson Resources

- [Learn about Input Binding Modifiers](https://vuejs.org/v2/guide/forms.html#Modifiers)
- [Learn about Event Modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers)
- [The .number bug workaround](https://vuejs.org/v2/cookbook/form-validation.html#Another-Example-of-Custom-Validation)

---

### Coding Challenge

[Start the Challenge](https://codepen.io/GreggPollack/pen/jdgqKY?editors=1010) 

------

[View the Solution](https://codepen.io/GreggPollack/pen/zegqae?editors=1010)

---

