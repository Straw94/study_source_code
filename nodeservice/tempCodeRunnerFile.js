class AAA {
	constructor(a, b, c) {
		this.aa = a;
		this.bb = b;
		this.cc = c;
	}
	static b() {
		console.log(this.bb)
	}
	c() {
		console.log(this.cc)
	}
}

var bbb = new AAA(1,2,3);
console.log(bbb)