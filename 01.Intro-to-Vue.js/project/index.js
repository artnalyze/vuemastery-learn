console.log("Hello vue");

var app = new Vue({
  el: "#app",
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(variantImage) {
      // es6 shorthand
      // like updateProduct: function(varaintImage)
      this.image = variantImage;
    },
  },
  data() {
    return {
      product: "Socks",
      image: "./assets/vmSocks-green.jpg",
      altText: "A pair of socks",
      link: "https://www.google.com",
      inStock: true,
      inventory: 100,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          vatiantId: 2234,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green.jpg",
        },
        {
          vatiantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue.jpg",
        },
      ],
      cart: 0,
    };
  },
});

/*
01.Intro to Vue.js
- 01-The Vue Instance
- 02-Attribute Binding
- 03-Conditional Rendering
- 04-List Rendering
*/
