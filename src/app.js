document.addEventListener('alpine:init', () => {
    Alpine.data('index', () => ({
        cartItems: 0,
        watchingItems: [],
        get watchlistItems(){
            return this.watchingItems.length
        },
        addToCart(){
            this.cartItems++;
            this.toast.show('The item was added into the cart');
        },
        addToWatchlist(id){
            if(this.watchingItems.includes(id)){
                this.watchingItems.splice(this.watchingItems.indexOf(id));
                this.toast.show('The item was removed from watchlist');
            }else{
                this.watchingItems.push(id);
                this.toast.show('The item was added into the watchlist');
            }
        },
        isInWatchlist(id) {
            return this.watchingItems.includes(id)
        },
        toast:{
                visible: false,
                delay: 5000,
                percent: 0,
                interval: null,
                message: null,
                timeout: null,
                close() {
                    this.toast.visible = false;
                    clearInterval(this.interval)
                },
                show(message) {
                    this.visible = true;
                    this.message = message;

                    if(this.interval){
                        clearInterval(this.interval);
                        this.interval = null;
                    }

                    if(this.timeout){
                        clearTimeout(this.timeout);
                    }

                    this.timeout = setTimeout(() => {
                       this.visible = false;
                       this.time = null;
                    }, this.delay)
                    const startDate = Date.now();
                    const futureDate = Date.now() + this.delay;
                    this.interval = setInterval(() => {
                        const date = Date.now();
                        this.percent = (date - startDate) * 100 / (futureDate - startDate);
                        if (this.percent >= 100) {
                            clearInterval(this.interval)
                            this.interval = null
                        }
                    }, 30)
                }
        }
    }))
})