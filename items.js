//
// Base Class - Item
//
function Item() {
	this.name = "";
	this.description = "";
	this.has = false;
	
	this.take = 	function() {
							this.has = true;
						}
}

function initItems() {
	
}