(function() {
	function Cake() { // constructor with defaults
		this.prices = {
			"tiers": 20,
			"candles": 0.5,
			"flavors": {
				"Vanilla": 7,
				"Chocolate": 10,
				"Lemon": 11,
				"Carrot": 8,
				"Marble": 12,
				"Coconut": 15,
				"Red Velvet": 14,
				"Cinnamon": 10
			},
			"flowers": {
				"Roses": 25,
				"Daisies": 15,
				"Orchids": 20,
				"Carnations": 14,
				"Marigolds": 16
			},
			"sprinkles": 4,
			"delivery": 20,
			"stateTax": 0.0725, // California sales tax is currently 7.25%
			"localTax": 0.085 // Santa Cruz sales tax is currently 8.5%
		};
		this.charges = {};
		this.price = function() {
			return 0;
		};
		this.tiers = function() {
			return 1; // defaults to one tier
		};
		this.candles = function() {
			return 0;
		};
		this.flavors = function() {
			return ["Vanilla"];
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
	}

	function rounded(x) {
		return Math.round(x * 100)/100;
	}

	function formatPrice(dollars) {
		var str = "$" + dollars.toFixed(2);
		return str;
	}

	function chosenItems(arg) {
		var items = Array.prototype.slice.call(arg);
		var chosenItems = items.filter(function(item) { // array of inputs
			if (item.checked) {
				return item;
			}
		});
		var chosen = chosenItems.map(function(item) { // array of values from array of inputs
			return item.value;
		});
		return chosen;
	}

	function Tiers(cake, num) {
		var p = cake.price();
		var tiersCost = rounded((cake.prices.tiers * num));
		cake.tiers = function() {
			return num;
		};
		cake.charges.tiers = tiersCost;
		cake.price = function() {
			return p + tiersCost;
		};
	}

	function Candles(cake, num) {
		var p = cake.price();
		var candlesCost = rounded((cake.prices.candles * num));
		cake.candles = function() {
			return num;
		};
		cake.charges.candles = candlesCost;
		cake.price = function() {
			return p + candlesCost;
		};
	}

	function Flavors(cake, flavors) {
		var p = cake.price();
		var flavorsCost = flavors.reduce(function(sum, flavor) {
			return sum + cake.prices.flavors[flavor];
		}, 0);
		cake.flavors = function() {
			return flavors;
		};
		cake.charges.flavors = flavorsCost;
		cake.price = function() {
			return p + flavorsCost;
		};
	}

	function Flowers(cake, flowers) {
		var p = cake.price();
		var flowersCost = flowers.reduce(function(sum, flower) {
			return sum + cake.prices.flowers[flower];
		}, 0);
		cake.flowers = function() {
			return flowers;
		};
		cake.charges.flowers = flowersCost;
		cake.price = function() {
			return p + flowersCost;
		};
	}

	function Sprinkles(cake) {
		var p = cake.price();
		var sprinklesCost = cake.prices.sprinkles;
		cake.sprinkles = function() {
			return true;
		};
		cake.charges.sprinkles = sprinklesCost;
		cake.price = function() {
			return p + sprinklesCost;
		};
	}

	function Delivery(cake) {
		var p = cake.price();
		var deliveryCost = cake.prices.delivery;
		cake.delivery = function() {
			return true;
		};
		cake.charges.delivery = deliveryCost;
		cake.price = function() {
			return p + deliveryCost;
		};
	}

	function StateTax(cake) {
		var p = cake.price();
		var tax = rounded((p * cake.prices.stateTax));
		cake.charges.stateTax = tax;
		cake.price = function() {
			return rounded((p + tax));
		};
	}

	function LocalTax(cake) {
		var p = cake.price();
		var tax = rounded((p * cake.prices.localTax));
		cake.charges.localTax = tax;
		cake.price = function() {
			return rounded((p + tax));
		};
	}

	var ck = new Cake(); // instance of the Cake constructor


	/* TODO: Update to use handlebars.js for templates */
	function displayCharges(selector, cake) {
		var table = document.querySelector(selector),
			tiers = cake.tiers(),
			candles = cake.candles(),
			flavors = cake.flavors(),
			flowers = cake.flowers(),
			sprinkles = cake.sprinkles(),
			delivery = cake.delivery(),
			stateTax = cake.charges.stateTax,
			localTax = cake.charges.localTax,
			price = cake.price(),
			template = '';

		template += '<thead>' +
						'<tr>' +
							'<th colspan="2" class="ui center aligned">Your Cake Order</th>' +
						'</tr>' +
						'<tr>' +
							'<th><span>Item</span></th>' +
							'<th class="right aligned"><span>Price</span></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>';

		template += '<tr>' +
						'<td>Tiers <span>' + tiers +'</span></td>' +
						'<td class="right aligned">' + formatPrice(cake.charges.tiers) + '</td>' +
					'</tr>';

		if (candles > 0) {
			template += '<tr>' +
							'<td>Candles<span>' + candles +'</span></td>' +
							'<td class="right aligned">' + formatPrice(cake.charges.candles) + '</td>' +
						'</tr>';
		}

		var flavorsString = flavors.join(", ");
		template += '<tr>' +
						'<td>' +
							'Flavors' + '<span>' + flavorsString + '</span>' +
						'</td>' +
						'<td class="right aligned">' +
							formatPrice(cake.charges.flavors) +
						'</td>' +
					'</tr>';

		if (flowers.length > 0) {
			var flowersString = flowers.join(", ");
			template += '<tr>' +
							'<td>' +
								'Flowers' + '<span>' + flowersString + '</span>' +
							'</td>' +
							'<td class="right aligned">' +
								formatPrice(cake.charges.flowers) +
							'</td>' +
						'</tr>';
		}

		if (sprinkles) {
			template += '<tr>' +
							'<td>Sprinkles</td>' +
							'<td class="right aligned">' + formatPrice(cake.charges.sprinkles) +'</td>' +
						'</tr>';
		}

		if (delivery) {
			template += '<tr>' +
							'<td>Delivery</td>' +
							'<td class="right aligned">' + formatPrice(cake.charges.delivery) +'</td>' +
						'</tr>';
		}

		template +=		'<tr>' +
							'<td>State Tax <span>(' + rounded(cake.prices.stateTax) +'%)</span></td>' +
							'<td class="right aligned">' + formatPrice(stateTax) + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Local Tax <span>(' + rounded(cake.prices.localTax) +'%)</span></td>' +
							'<td class="right aligned">' + formatPrice(localTax) + '</td>' +
						'</tr>' +
						'<tr class="last">' +
							'<td>Total</td>' +
							'<td class="right aligned"><strong>' + formatPrice(price) + '</strong></td>' +
						'</tr>' +
				   '</tbody>';

		table.innerHTML = template;
	}

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
		} else {
			Flavors(ck, ck.flavors()); // use default
			e.target.flavors.elements.vanilla.checked = true; // check Vanilla
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

		displayCharges("#charges table", ck);
		ck = new Cake(); // reset so you can make new order without page refresh
	}

	var form = document.getElementById("cakeForm");
	form.onsubmit = function(e) {
		e.preventDefault();
		handleForm(e);
	};
})();
