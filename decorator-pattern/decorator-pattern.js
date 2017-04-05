function Cake() { // constructor with defaults
	this.price = function() {
		return 36;
	};
	this.tiers = function() {
		return 1;
	};
	this.candles = function() {
		return 0;
	};
	this.flavors = function() {
		return ["vanilla"];
	};
	this.flowers = function() {
		return [];
	};
	this.sprinkles = function() {
		return false;
	};
	this.delivery = function() {
		return false;
	};
	this.stateTax = function() {
		return 0;
	};
	this.localTax = function() {
		return 0;
	};
}

function displayCharges(id, cake) { /* TODO: Clean up the templates below */
	var box = document.getElementById(id),
		tiers = cake.tiers(),
		candles = cake.candles(),
		flavors = cake.flavors(),
		flowers = cake.flowers(),
		sprinkles = cake.sprinkles(),
		delivery = cake.delivery(),
		stateTax = cake.stateTax(),
		localTax = cake.localTax(),
		price = cake.price();

	var flavorsTemplate = flavors.map(function(flavor) {
		return flavor.name;
	}).join(", ");

	var flowersTemplate = flowers.map(function(flower) {
		return flower.name;
	}).join(", ");

	var template = '<tbody>' +
						'<tr>' +
							'<th>Tiers</th>' +
							'<td>' + tiers + '</td>' +
						'</tr>' +
						'<tr>' +
							'<th>Candles</th>' +
							'<td>' + candles + '</td>' +
						'</tr>';

	template +=			'<tr>' +
							'<th>Flavors</th>' +
							'<td>' + flavorsTemplate + '</td>' +
						'</tr>' +
						'<tr>' +
							'<th>Flowers</th>' +
							'<td>' + flowersTemplate + '</td>' +
						'</tr>';

	if (sprinkles) {
		template += '<tr>' +
						'<th>Sprinkles</th>' +
						'<td>$4.00</td>' +
					'</tr>';
	}

	if (delivery) {
		template += '<tr>' +
						'<th>Delivery</th>' +
						'<td>$20.00</td>' +
					'</tr>';
	}

	template +=		'<tr>' +
						'<th>State Tax</th>' +
						'<td>' + stateTax + '</td>' +
					'</tr>' +
					'<tr>' +
						'<th>Local Tax</th>' +
						'<td>' + localTax + '</td>' +
					'</tr>' +
					'<tr>' +
						'<th>Total</th>' +
						'<td>' + price + '</td>' +
					'</tr>' +
			   '</tbody>';

	box.innerHTML = template;
}

function rounded(x) {
	return Math.round(x * 100)/100;
}

/* TODO: Create formatPrice & capitalize helper functions */

function chosenItems(arg) {
	var items = Array.prototype.slice.call(arg);
	var chosen = items.filter(function(item) {
		if (item.checked) {
			return item;
		}
	});
	return chosen;
}

function Tiers(cake, num) {
	var c = cake.price();
	var tiersCost = 18 * num; // $18 per tier
	cake.tiers = function() {
		return num;
	};
	cake.price = function() {
		return c + rounded(tiersCost);
	};
}

function Candles(cake, num) {
	var c = cake.price();
	var candleCost = 0.5; // $0.50 per candle
	cake.candles = function() {
		return num;
	};
	cake.price = function() {
		return c + rounded((candleCost * num));
	};
}

function Flavors(cake, flavors) {
	var c = cake.price();
	var flavorsCost = flavors.reduce(function(sum, flavor) {
		return sum + parseInt(flavor.defaultValue);
	}, 0);
	cake.flavors = function() {
		return flavors;
	};
	cake.price = function() {
		return c + flavorsCost;
	};
}

function Flowers(cake, flwrs) {
	var c = cake.price();
	var flowers = Array.prototype.slice.call(flwrs);
	var flowersCost = flowers.reduce(function(sum, flower) {
		if (flower.checked) {
			return sum + parseInt(flower.defaultValue);
		}
		return sum;
	}, 0);
	cake.flowers = function() {
		return flowers;
	};
	cake.price = function() {
		return c + flowersCost;
	};
}

function Sprinkles(cake) {
	var c = cake.price();
	cake.sprinkles = function() {
		return true;
	};
	cake.price = function() {
		return c + 4; // $4 for sprinkles
	};
}

function Delivery(cake) {
	var c = cake.price();
	cake.delivery = function() {
		return true;
	};
	cake.price = function() {
		return c + 20; // $20 for delivery
	};
}

function StateTax(cake) {
	var c = cake.price();
	var tax = rounded(c * 0.0725); // California sales tax is currently 7.25%
	cake.stateTax = function() {
		return tax;
	};
	cake.price = function() {
		return c + tax;
	};
}

function LocalTax(cake) {
	var c = cake.price();
	var tax = rounded(c * 0.085); // Santa Cruz sales tax is currently 8.5%
	cake.localTax = function() {
		return tax;
	};
	cake.price = function() {
		return c + tax;
	};
}

var ck = new Cake(); // instance of the Cake constructor

function handleForm(e) {
	var tiers = Number(e.target.tiers.value),
		candles = Number(e.target.candles.value),
		sprinkles = e.target.sprinkles.checked,
		delivery = e.target.delivery.checked,
		flavs = e.target.flavors.getElementsByTagName("input"),
		chosenFlavs = chosenItems(flavs),
		flwrs = e.target.flowers.getElementsByTagName("input"),
		chosenFlwrs = chosenItems(flwrs);
	if (tiers > 0) {
		Tiers(ck, tiers);
	}
	if (candles > 0) {
		Candles(ck, candles);
	}
	if (chosenFlavs.length) {
		Flavors(ck, chosenFlavs);
	}
	if (chosenFlwrs.length) {
		Flowers(ck, chosenFlwrs);
	}
	if (sprinkles) {
		Sprinkles(ck);
	}
	if (delivery) {
		Delivery(ck);
	}
	StateTax(ck);
	LocalTax(ck);

	displayCharges("charges", ck);
	ck = new Cake(); // reset so you can make new order without page refresh
}

var form = document.querySelector("form");
form.onsubmit = function(e) {
	e.preventDefault();
	handleForm(e);
};
