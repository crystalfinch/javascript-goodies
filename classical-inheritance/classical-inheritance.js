(function() {
	// superclass
	function Shape() {
		this.greeting = 'Hello';
	}

	// superclass method
	Shape.prototype.greet = function greet() {
		return this.greeting + " from " + this.constructor.name;
	};

	// WITHOUT extend()
	// subclass
	/*
	function Rectangle() {
		Shape.call(this); // call super constructor
		this.greeting = 'Hey';
	}
	*/
	// subclass extends superclass
	/*
	Rectangle.prototype = Object.create(Shape.prototype);
	Rectangle.prototype.constructor = Rectangle; // set the constructor pointer
	*/


	// WITH extend()
	function Rectangle() {
		this.greeting = 'Hey';
	}

	function extend(child, parent) {
		for (var prop in parent) { // equivalent of calling parent constructor
			if (parent.hasOwnProperty(prop)) {
				child[prop] = parent[prop];
			}
		}
		/* to use the parent prototype for the child
		 * but avoid possibly mutating parent's constructor,
		 * use F:
		*/
		function F() {
			this.constructor = child; // set the constructor pointer
		}
		F.prototype = parent.prototype;
		child.prototype = new F();
	}

	extend(Rectangle, Shape);

	var shp = new Shape();
	var rect = new Rectangle();

	var superClass = document.getElementById('parent');
	superClass.innerHTML += shp.greet();

	var subClass = document.getElementById('child');
	subClass.innerHTML += rect.greet();
})();
