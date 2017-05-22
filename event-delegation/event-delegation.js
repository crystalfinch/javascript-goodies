(function() {
	// cross-browser matches() support
	function match(el, selector) {
		var p = Element.prototype;
		var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector;
		return f.call(el, selector);
	}

	function highlightToggle(item) {
		item.className = match(item, '.highlight') ? "" : "highlight";
	}

	function delegate(id, evt, node, func) {
		var el = document.getElementById(id);
		el.addEventListener(evt, function(event) {
			var target = event.target;
			if (target.nodeName == node) {
				event.preventDefault();
				func(target);
			}
		});
	}

	delegate("beatles", "click", "A", highlightToggle); // list version
	delegate("shows", "click", "TD", highlightToggle); // table version
})();
