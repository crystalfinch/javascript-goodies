(function() {
	var viewProto = {
		init: function init(options) {
			this.title = options.title;
			this.content = options.content;
			if (options.color) {
				this.color = options.color;
			}
		},
		/* TODO: Update to use handlebars.js for template */
		getTemplate: function getTemplate() {
			return (
				'<span class="trigger"></span>' +
				'<dt>' + this.title + '</dt>' +
				'<dd>' + this.content + '</dd>'
			);
		},
		render: function render(location) {
			var node = document.createElement("dl");
			node.classList = "ui card";
			if (this.color) {
				node.style.backgroundColor = this.color;
			}
			node.innerHTML = this.getTemplate();
			location.appendChild(node);
		}
	};

	var flashcards = document.getElementById("flashcards");
	flashcards.addEventListener("click", function cardHandler(event) {
		var target = event.target;
		if (target.nodeName === "SPAN") { // the .trigger span
			target.parentNode.remove();
		}
		if (!this.childNodes.length) { // no more cards!
			this.removeEventListener("click", cardHandler); // listener no longer needed
		}
	});

	function deal(deck) {
		deck.forEach(function(element, index) {
			var card = Object.create(viewProto);
			card.init(element);
			card.render(flashcards);
		});
	}

	var colors = {
		red: "#c53939",
		blue: "#3d529e",
		pink: "#d27fc0",
		green: "#3d9e64",
		orange: "#d69551"
	};

	var cardsArr = [
		{ title: "Bienvenue", content: "Welcome", color: colors.red },
		{ title: "Bonjour", content: "Hello", color: colors.blue },
		{ title: "L'Ordinateur", content: "Computer", color: colors.pink },
		{ title: "Au Revoir", content: "Goodbye", color: colors.green },
		{ title: "Bonsoir", content: "Goodnight", color: colors.orange },
		{ title: "Les Feuilles", content: "Leaves", color: colors.blue },
		{ title: "Choisir", content: "To choose", color: colors.green },
		{ title: "Le Cheveux", content: "Hair", color: colors.orange },
		{ title: "Le Papillon", content: "Butterfly", color: colors.red },
		{ title: "L'Argent", content: "Money", color: colors.pink }
	];

	deal(cardsArr);
})();
