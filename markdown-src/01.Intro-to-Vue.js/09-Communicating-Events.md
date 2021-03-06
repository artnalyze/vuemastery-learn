# Communicating Events

In our previous lesson, we learned how to create components and pass data  down into them via props. But what about when we need to pass  information back up? In this lesson we’ll learn how to communicate from a child component up to its parent.

## Goal

By the end of this lesson, our `product` component will be able to tell its parent, the root instance, that an event has occurred, and send data along with that event notification.

------

## Starting Code

Currently, our app looks like this:

```html
    <div id="app">
      <product :premium="premium"></product>    
    </div>
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div id="product">
  
    <div class="product-image">
    <img :src="image" />      
    </div>
    
    <div class="product-info">
      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
    
      <h1>{{ title }}</h1>
      <p>Shipping: {{ shipping }}</p>
      
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      
      <h2>Details</h2>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      <h3>Colors:</h3>
      <div v-for="variant in variants" :key="variant.variantId">
        <div class="color-box" :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)"></div>
      </div>
      <button :class="{ disabledButton: !inStock }" v-on:click="addToCart" :disabled="!inStock">Add to Cart</button>
    </div>
  </div>
  `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantQuantity: 15,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green.jpg"     
        },
        {
          variantId: 2235,
          variantQuantity: 0,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue.jpg"
        }
      ],
      cart: 0
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      if (this.quantity > 0) {
        return true
      } else {
        return false
      }
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } else {
        return 2.99
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
})
```

------

## Problem

Now that `product` is its own component, it doesn’t make sense for our cart to live within `product`. It would get very messy if every single product had its own cart that  we had to keep track of. Instead, we’ll want the cart to live on the  root instance, and have `product` communicate up to that cart when its “Add to Cart” button is pressed.

------

## Solution

Let’s move the cart back to our root instance.

```javascript
    var app = new Vue({
      el: '#app',
      data: {
        premium: true,
        cart: 0
      }
    })
```

And we’ll move our cart’s template into our index.html:

```html
      <div id="app">
        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>

        <product :premium="premium"></product>    
      </div>
```

As expected, now if we click on the “Add to Cart” button, nothing happens.

What do we want to happen? When the “Add to Cart” button is pressed in `product`, the root instance should be notified, which then triggers a method it has to update the `cart`.

First, let’s change out the code we have in our component’s `addToCart` method.

It was this:

```javascript
        addToCart() {
          this.cart += 1
        },
```

Now it’s this:

```javascript
        addToCart() {
          this.$emit('add-to-cart')
        },
```

What does this mean?

It means: when `addToCart` is run, `emit` an  event by the name of “add-to-cart”. In other words, when the “Add to  Cart” button is clicked, this method fires, announcing that the click  event just happened.

But right now, we have nowhere *listening* for that announcement that was just emitted. So let’s add that listener here:

```html
    <product :premium="premium" @add-to-cart="updateCart"></product>    
```

Here we are using `@add-to-cart` in a similar way as we are using `:premium`. Whereas `:premium` is a funnel on `product` that data can be passed down into, `@add-to-cart` is essentially a radio that can receive the event emission from when  the “Add to Cart” button was clicked. Since this radio is on `product`, which is nested within our root instance, the radio can blast the announcement that a click happened, which will trigger the `updateCart` method, which lives on the root instance.

```html
    @add-to-cart="updateCart"
```

This code essentially translates to: “When you hear that the “Add to Cart” event happened, run the `updateCart` method.

That method should look familiar:

```javascript
      methods: {
        updateCart() {
          this.cart += 1
        }
      }
```

It’s the method that used to be on `product`. Now it lives on our root instance, and is called whenever the “Add to Cart” button is pressed.

Now when our button is pressed, it triggers `addToCart`, which emits an announcement. Our root instance hears the announcement through the radio on its `product` component, and the `updateCart` method runs, which increments the value of `cart`.

So far so good.

But in a real application, it’s not helpful to only know that a product was added to the cart, we’d need to know *which* product was just added to the cart. So we’ll need to pass data up along with the event announcement.

We can add that in as a second argument when we emit an event:

```javascript
        addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
```

Now, along with the announcement that the click event occurred, the  id of the product that was just added to the cart is sent as well.  Instead of just incrementing the number of cart, we can now make cart an array:

```javascript
    cart: []
```

And push the product’s id into our cart array:

```javascript
      methods: {
        updateCart(id) {
          this.cart.push(id)
        }
      }
```

Now our array has one product within it, whose `id` is being displayed on the page.

![img](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578369060353_0.png?alt=media&token=4b2f292d-bb3f-4896-8fc7-950890462ca9)

But we don’t need to display the contents of our array here. Instead, we just want to display the amount of products in our array, so we can  say this in our template instead:

```html
    <p>Cart({{ cart.length }})</p>
```

Now we’re just displaying the length of the array, or in other words: the number of products in the cart. It looks just like it did before,  but instead of only incrementing the value of `cart` by 1, now we’re actually sending data about which product was just added to the cart.

Great work!

## What’d we learn

- A component can let its parent know that an event has happened with `$emit`
- A component can use an event handler with the  `v-on` directive ( `@` for short) to listen for an event emission, which can trigger a method on the parent
- A component can `$emit` data along with the announcement that an event has occurred
- A parent can use data emitted from its child

## Learn by doing

### Challenge:

Add a button that removes the product from the cart array by emitting an event with the id of the product to be removed.

---

### Coding Challenge

[Start the Challenge](https://codepen.io/GreggPollack/pen/XOvdqy) 

------

[View the solution](https://codepen.io/GreggPollack/pen/JxgXvq)

---

