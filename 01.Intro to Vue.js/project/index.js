console.log("Hello vue");

var app = new Vue({
    el: '#app',
    data() {
        return {
            product: 'Socks',
            image: './assets/vmSocks-green.jpg',
            altText: "A pair of socks"
        }
    }
})