var userItem;
var allow=true;
// THIS OBJECT HOLDS ALL METHODS
var actions ={
init: function(){
	$('#mainhead').show(1700);
actions.addtoList();
actions.del();
actions.edit();
actions.moveItem($('.firstList'),$('.secondList'));
actions.moveItem($('.secondList'),$('.firstList'));
actions.hideitems();
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
		$('.firstList').append("<li>"+ '<input type = "checkbox" class = "list" name ="list">'+"<span>"+userItem+"</span>"+'<input type="text" name="hiddenField" id="hiddentag"/>'+'<img src ="img/del1.png" alt="" id ="delete">'+'<img src ="img/edit.png" alt="" id="edit">'+"</li>");
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
    $('li input[type="text"]').hide();
});
},
// DELETE ITEMS FROM LIST
del: function(){
	$(document).on('click','#delete',function(){
		$(this).parent().hide("slow",function(){$(this).remove();});
	});
},
// EDIT ITEMS ON LIST
edit: function(){
	$(document).on('click','#edit',function(){
	$(this).parent().find($('span')).hide('slow');
	var value = $(this).parent().find($('span')).text();
	var hiddentag = $(this).parent().find($('input[type="text"]'));
	hiddentag.val(value);
	hiddentag.show('slow');
	$(this).hide('slow')
	hiddentag.focus();
	hiddentag.blur(function(){
		$(this).siblings($('#edit')).show('slow');
		var valid = $.trim(hiddentag.val()).length;
			if ((valid !== 0)&&(valid<26)){
			   $(this).parent().find($('span')).html( hiddentag.val()).show(); 
			   $(this).hide('slow');   
		    }
		    else{
		 $(this).parent().find($('span')).html( value).show('slow'); 
		 $(this).hide('slow');
		 $(this).parent().find($('#edit')).show('slow');
		 alert('Unable to edit, description is not valid\ndescription should not be more than 25 characters or less than 2 characters');
			}
	});
});
},
// MOVE ITEMS FROM BETWEEN TWO LISTS
moveItem: function(list1,list2){
	list1.on('change','input[type=checkbox]',function(){
		list2.append($(this).parent());
	});
},
hideitems:function(){
	$('.hideicon').click(function(event){
		event.preventDefault();
		if (allow===true)
		{
	$(this).siblings('ol').hide('slow');
		allow = false;
	}
		else{
		$(this).siblings('ol').show('slow');
		allow = true;	
}
});}
};
actions.init();

