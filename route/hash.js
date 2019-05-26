class Routers {
    constructor() {
        this.currentUrl = '';
        this.router = {};
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    route(path, callback) {
        this.router[path] = callback || function() {};
    }

    refresh() {
        this.currentUrl = location.hash.slice(1) || '/';
        this.router[this.currentUrl]();
    }
    
    backOff() {
        history.back();
    }
}