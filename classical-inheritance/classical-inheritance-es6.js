/* jshint esversion: 6 */

{ // block scope is the new IIFE :)
	// superclass
	class Shape {
		constructor() {
			this.greeting = 'Hello';
		}

		// superclass method
		greet() {
			return `${this.greeting} from ${this.constructor.name}`;
		}
	}

	// subclass
	class Rectangle extends Shape {
		constructor() {
			super(); // call super constructor
			this.greeting = 'Hey'; // can use 'this' because of super() call
		}
	}

	const shp = new Shape();
	const rect = new Rectangle();

	const superClass = document.getElementById('parent');
	superClass.innerHTML += shp.greet();

	const subClass = document.getElementById('child');
	subClass.innerHTML += rect.greet();
}
