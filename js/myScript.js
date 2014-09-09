var userItem;
// THIS OBJECT HOLDS ALL METHODS
var actions ={
init: function(){
actions.addtoList();
actions.del();
actions.moveItem($('.firstList'),$('.secondList'));
actions.moveItem($('.secondList'),$('.firstList'));
},
// FETCH USER INPUT
getUserItem: function(){
	userItem = $('#userItem').val();
},
// INPUT VALIDATION METHOD
validation: function(){
	if (( userItem.length < 2)||(userItem.length > 30)){
		alert("invalid description");
	}
	else 
	{
		$('.firstList').append("<li>"+ '<input type = "checkbox" class = "list" name ="list">'+userItem+'<button type = "delete" id = "delete">'+"Delete"+"</button>"+"</li>");
	}
},
// ADD ITEMS TO LIST
addtoList: function(){
	$('#addItem').click(function(event){
	event.preventDefault();
	actions.getUserItem();
	actions.validation();
// SET TEXT BOX TO EMPTY 
	$('#userItem').val("");
});
},
// DELETE ITEMS FROM LIST
del: function(){
	$(document).on('click','#delete',function(){
		$(this).parent().remove();
	});
},
// MOVE ITEMS FROM BETWEEN TWO LISTS
moveItem: function(list1,list2){
	list1.on('change','input[type=checkbox]',function(){
		list2.append($(this).parent());
	});
}};
actions.init();



