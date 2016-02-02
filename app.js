
var itemInput = document.getElementById("new-item");
var addButton = document.getElementsByTagName("button")[0];
var toGetHolder = document.getElementById("to-get");
var boughtHolder = document.getElementById("bought");

//create new list item
var createNewItemElement = function(itemString){

	var listItem = document.createElement("li");
	
	var checkbox = document.createElement("input");
	var label = document.createElement("label");
	var editInput = document.createElement("input");
	var editButton = document.createElement("button");
	var deleteButton = document.createElement("button");

	//each element needs modifying
	checkbox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = itemString;

	//each element needs appending
	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//add a new item
var addItem = function(){
	//create a new li with the input text from new item
	var listItem = createNewItemElement(itemInput.value);

	if (itemInput.value == "") {
		alert("Oops, did you mean to add an item?");
	} else {
		//append list item to incompleteTaskHolder
		toGetHolder.appendChild(listItem);
		bindItemEvents(listItem, itemBought);	
	}
	
	itemInput.value = "";
}

//edit an existing item
var editItem = function(){
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var editButton = listItem.querySelector("button.edit");
	var containsClass = listItem.classList.contains("editMode");

	if (containsClass) {
		//Switch from .editMode
    	//label text become the input's value
		label.innerText = editInput.value;
		editButton.textContent = "Edit";
	} else {
		//Switch to .editMode
    	//input value becomes the label's text
		editInput.value = label.innerText;
		editButton.textContent = "Save";
	}

	//press enter to trigger edit/save button
	editInput.addEventListener("keypress", function(event) {
    	if (event.keyCode == 13) {
    		editButton.click();
    	return false;
    	}	
    	return true;    
	});	

	listItem.classList.toggle("editMode");
}	

//delete an existing item
var deleteItem = function(){
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	ul.removeChild(listItem);
}

//mark item as bought
var itemBought= function(){
	var listItem = this.parentNode;
	boughtHolder.appendChild(listItem);
	bindItemEvents(listItem, itemToGet);	
}

//mark item as to get
var itemToGet = function(){
	var listItem = this.parentNode;
	toGetHolder.appendChild(listItem);
	bindItemEvents(listItem, itemBought);
}

var bindItemEvents = function(ListItem, checkboxEventHandler){
	var checkbox = ListItem.querySelector("input[type=checkbox]");
	var editButton = ListItem.querySelector("button.edit");
	var deleteButton = ListItem.querySelector("button.delete");

	//bind editItem to editButton
	editButton.addEventListener("click", editItem);

	//bind deleteItem to deleteButton
	deleteButton.addEventListener("click", deleteItem);

	//bind checkboxEventHandler to checkbox
	checkbox.addEventListener("change", checkboxEventHandler);
}

//set click event to the addItem function
addButton.addEventListener("click", addItem);

//press enter to trigger add button
itemInput.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
    	addButton.click();
    	return false;
    }	
    return true;    
});

//cycle over toGetHolder ul list items
for (var i = 0; i < toGetHolder.children.length; i++){
	bindItemEvents(toGetHolder.children[i], itemBought);
}

//cycle over boughtHolder ul list items
for (var i = 0; i < boughtHolder.children.length; i++) {
	bindItemEvents(boughtHolder.children[i], itemToGet);
}
