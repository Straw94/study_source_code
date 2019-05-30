function test() {
    return function() {
        console.log(this);
    }
}


function parent() {
    this.a = 123;
    test()();
    console.log(this.a);
}
parent();