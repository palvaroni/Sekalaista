function testiAjo() {
	let orkkiIndex = 0;
	let mayraIndex = 0;

	let meidanPinot = new FantsuTuplaPino();

	for (let i = 0; i < 40; i++) {
		orkkiIndex++;
		meidanPinot.push1(orkkiIndex);
	}

	for (let i = 0; i < 21; i++) {
		mayraIndex++;
		meidanPinot.push2(mayraIndex);
	}

	console.log(meidanPinot.getStuff());

	meidanPinot.pop2();
	meidanPinot.pop2();
	meidanPinot.pop2();

	meidanPinot.pop1();
	meidanPinot.pop1();
	meidanPinot.pop1();
	meidanPinot.pop1();
	meidanPinot.pop1();
	
	console.log(meidanPinot.top1());
	console.log(meidanPinot.top2());
	console.log(meidanPinot.getStuff());
}

function FantsuTuplaPino() {
	let memoryStuff = Array.apply(null, Array(99)).map(function () {}); // [100]
	let stackPointer1 = -1;
	let stackPointer2 = 100;
	
	this.pop1 = function() {
		return (stackPointer1 < 0) ? 
			null : memoryStuff[stackPointer1--];
	}
	this.pop2 = function() {
		return (stackPointer2 >= 100)?
			null : memoryStuff[stackPointer2++];
	}
	this.push1 = function(thing) {
		if (stackPointer1 + 1 >= stackPointer2) {
			return false;
		}
		memoryStuff[++stackPointer1] = thing;
		return true;
	}
	this.push2 = function(thing) {
		if (stackPointer2 - 1 <= stackPointer1) {
			return false
		}
		memoryStuff[--stackPointer2] = thing;
		return true;
	}
	this.isEmpty1 = function() {
		return stackPointer1 < 0;
	}
	this.isEmpty2 = function() {
		return stackPointer2 >= 100;
	}
	this.top1 = function() {
		return (stackPointer1 < 0) ? 
			null : memoryStuff[stackPointer1];
	}
	this.top2 = function() {
		return (stackPointer2 >= 100) ?
			null : memoryStuff[stackPointer2];
	}
	this.getStuff = () => memoryStuff;
}
