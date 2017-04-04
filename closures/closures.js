(function() {
	// EXAMPLE 1
	// ==================================
	function password(input) {
		var magicWord = "please";
		function check(input) {
			if (input === magicWord) {
				updateMsg("success","Correct!");
			} else {
				updateMsg("warning","Ah ah ah, you didn't say the magic word!"); // Jurassic Park! :D
			}
		}
		return check(input);
	}

	var form = document.querySelector("form");
	form.onsubmit = function(e) {
		e.preventDefault();
		var value = e.target[0].value;
		password(value);
	};

	var msg = document.querySelector("#message");
	function updateMsg(type, str) {
		msg.className = type;
		msg.innerHTML = str;
	}

	// EXAMPLE 2
	// ==================================
	function counter() {
		var count = 0;
		return {
			getCount: function() {
				return count;
			},
			addCount: function(num) {
				count += num;
			},
			subtractCount: function(num) {
				if(count > 0) {
					count -= num;
				} else { // avoid negative number
					count = 0;
				}
			},
			resetCount: function() {
				count = 0;
			}
		};
	}

	var donuts = counter();

	function updateOrderMsg() {
		var orderTotal = document.querySelector("#order .total");
		var total = donuts.getCount();
		var emoji = document.querySelector("#order .fa");
		var descriptor = "donuts";
		if(total === 0) {
			emoji.className = "fa fa-frown-o"; // no donuts?!
		} else if(total === 1) {
			emoji.className = "fa fa-meh-o"; // just one? really?
			descriptor = "donut";
		} else if(total > 1) {
			emoji.className = "fa fa-smile-o"; // now that's more like it!
		}
		orderTotal.innerHTML = total + " " + descriptor;
	}

	function handleDonutBtn(btn, callback) {
		if(btn.className == "add") {
			donuts.addCount(1);
		} else if(btn.className == "subtract") {
			donuts.subtractCount(1);
		} else if(btn.className == "reset") {
			donuts.resetCount();
		}
		if (typeof callback === "function") {
			callback();
		} else {
			throw new TypeError("Callback passed to handleDonutBtn is not a function");
		}
	}

	function delegate(id, evt, node, func, cb) {
		var el = document.getElementById(id);
		el.addEventListener(evt, function(event) {
			var target = event.target;
			if (target.nodeName == node) {
				if (typeof cb == "function") {
					func(target, cb);
				} else {
					func(target);
				}
			}
		});
	}

	updateOrderMsg(); // initial message
	delegate("order", "click", "BUTTON", handleDonutBtn, updateOrderMsg);
})();
