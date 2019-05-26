class Emitter {
    constructor() {
        this._events = this._events || new Map(); // 储存事件/回调键值对
        this._maxListeners = this._maxListeners || 10; // 设立监听上限
    }

    emit(type, ...args) {
        const handler = this._events.get(type);
        if(Array.isArray(handler)) {
            handler.forEach(fn => fn.apply(this, args))
        } else {
            handler.apply(this, args)
        }
    }

    addListener(type, fn) {
        const handler = this._events.get(type);
        const addHandler = handler ? Array.isArray(handler) ? [...handler, fn] : [handler, fn] : fn;
        this._events.set(type, addHandler);
        return true
    }

    removeListener(type, fn) {
        const handler = this._events.get(type);
        if(!handler) return false;
        if(Array.isArray(handler)) {
            const filterHandler = handler.filter(fns => fns !== fn);
            if(filterHandler.length === handler.length) return false;
            return this._events.set(type, filterHandler);
        } else {
            if(handler !== fn) return false;
            return this._events.delete(fn);
        }
    }
}