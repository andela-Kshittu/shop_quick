var userItem;
// var allow;
// THIS OBJECT HOLDS ALL METHODS
var count1 = $('.firstList').length;
var count2 = $('.secondList').length;
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
		$('.firstList').append("<li>"+ '<input type = "checkbox" class = "list" name ="list">'+"<span>"+userItem+"</span>"+'<input type="text" name="hiddenField" id="hiddentag"/>'+'<img src ="img/del.png" alt="" id ="delete">'+'<img src ="img/edit.png" alt="" id="edit">'+"</li>");

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
	// allow = true;
});
},
// DELETE ITEMS FROM LIST
del: function(){
	$(document).on('click','#delete',function(){
		$(this).parent().hide("slow",function(){$(this).remove();});
	});
},
// edit: function(){
// 	$(document).on('click','#edit',function(){
// 		if (allow === true){
// 		var value = $(this).parent().find($('span')).text();
// 		$('#userItem').val(value);
// 		$(this).parent().remove();
// 		$('ol').attr('disabled','disabled');
// 		allow = false;
// 	}
// 		else{return false;}
// 	});
// },

edit: function(){
	$(document).on('click','#edit',function(){
	$(this).parent().find($('span')).hide('slow');
	var value = $(this).parent().find($('span')).text();
	$(this).parent().find($('input[type="text"]')).val(value);
	$(this).parent().find($('input[type="text"]')).show('slow');
	$(this).parent().find($('input[type="text"]')).focus();
	$(this).parent().find($('input[type="text"]')).blur(function(){
		$.trim($(this).parent().find($('input[type="text"]')).val());
			if ($(this).parent().find($('input[type="text"]')).val()!== null){
				// console.log($('input[type="text"]').val());
			   $(this).parent().find($('span')).html( $(this).parent().find($('input[type="text"]')).val()).show(); 
			   $(this).hide('slow');
			// $(this).parent().find($('span'));

		    }
	});
});
},
// $('#hiddentag').val()
// // editvalue: function(){
// // 	$(this).parent().find($('input[type="text"]')).blur(function(){
// // 			if ($(this).parent().find($('input[type="text"]')).val()!== ""){
// //    console.log( $(this).parent().find($('span')).text($('#hiddentag').val()) );
// //  	}
// // 	$(this).remove().hide('slow');
// // 	$(this).parent().find($('span')).show();
// // });
// },
// MOVE ITEMS FROM BETWEEN TWO LISTS
moveItem: function(list1,list2){
	list1.on('change','input[type=checkbox]',function(){
		list2.append($(this).parent());

	});
}};
actions.init();
	console.log(count1);
	console.log(count2);


