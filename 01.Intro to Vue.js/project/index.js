console.log("Hello vue");

var app = new Vue({
    el: '#app',
    data() {
        return {
            product: 'Socks',
            image: './assets/vmSocks-green.jpg',
            altText: "A pair of socks",
            link: "https://www.google.com",
            inStock: true,
            inventory: 100,
            onSale: true
        }
    }
});

/*
01.Intro to Vue.js
- 01-The Vue Instance
- 02-Attribute Binding
- 03-Conditional Rendering
- 04-List Rendering.md
*/