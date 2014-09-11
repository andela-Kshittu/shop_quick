var userItem;
// THIS OBJECT HOLDS ALL METHODS
var actions ={
init: function(){
actions.addtoList();
actions.del();
actions.edit();
actions.moveItem($('.firstList'),$('.secondList'));
actions.moveItem($('.secondList'),$('.firstList'));
},
// FETCH USER INPUT
getUserItem: function(){
	userItem = $.trim($('#userItem').val());
},
// INPUT VALIDATION METHOD
validation: function(){

	if (( userItem.length < 2)||(userItem.length > 25)){
		alert("invalid description. \ndescription should not be more than 25 characters or less than two characters");
	}
	else 
	{
		$('.firstList').append("<li>"+ '<input type = "checkbox" class = "list" name ="list">'+"<span>"+userItem+"</span>"+'<img src ="img/del.png" alt="" id ="delete">'+'<img src ="img/edit.png" alt="" id="edit">'+"</li>");
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
		$(this).parent().remove().hide("slow","ease-out");
	});
},
edit: function(){
	$(document).on('click','#edit',function(){
		var value = $(this).parent().find($('span')).text();
		$('#userItem').val(value);
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



