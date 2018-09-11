window.onload = function(){
    var userItem;
    var allow=true;
    // Arrays 
    let uncompleted = JSON.parse(localStorage.getItem('firstList'));
    let completed = JSON.parse(localStorage.getItem('secondList'));

    if(!uncompleted){
        uncompleted = [];
        localStorage.setItem('firstList', JSON.stringify(uncompleted));
      }

    if(!completed){
        completed = [];
        localStorage.setItem('secondList', JSON.stringify(completed));
     }
    
    showItem(uncompleted, '.firstList');
    showItem(completed, '.secondList');
    var editbox = $('.editbox');
    editbox.hide();

      
  // TO DISPLAY ITEMS   
    function showItem(userItem, type){
     let i = 0;
     for(i = 0; i < userItem.length; i++){
         $(type).append("<li>"+ '<input type = "checkbox" class = "list" name ="list">'+"<span>"+userItem[i]+"</span>"+'<input type="text" name="hiddenField" id="hiddentag" class="editbox"/>'+'<img src ="img/del1.png" alt="" id ="delete">'+'<img src ="img/edit.png" alt="" id="edit">'+"</li>");
          let ischecked = '.secondList'
          if(type == ischecked){
             $('.secondList input[type="checkbox"]').attr('checked','checked');
            }
         }
     edit();
    }
    
// TO EDIT NAME OF ITEM
    function edit(){
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
                if ((valid !== 0)&&(valid<14)){
                   $(this).parent().find($('span')).html( hiddentag.val()).show(); 
                   $(this).hide('slow');   
                }
                else{
                 $(this).parent().find($('span')).html( value).show('slow'); 
                 $(this).hide('slow');
                 $(this).parent().find($('#edit')).show('slow');
                 alert('Unable to edit, description is not valid\ndescription should not be more than 13 characters or less than 2 characters');
                }
        });
    });
    }
    


    // THIS OBJECT HOLDS ALL METHODS
    var actions ={
    init: function(){
        $('#mainhead').show(1700);
    actions.addtoList();
    actions.del();
    actions.moveItem($('.firstList'),$('.secondList'));
    actions.moveItem($('.secondList'),$('.firstList'));
    actions.moveItemSto();
    actions.hideitems();
    },
    // FETCH USER INPUT AND STORE IN LOCALSTORAGE
    getUserItem: function(){
        userItem = $.trim($('#userItem').val());
        let uncompleted = JSON.parse(localStorage.getItem('firstList'));
        uncompleted.push(userItem);
        localStorage.setItem('firstList', JSON.stringify(uncompleted));
    },

    // INPUT VALIDATION METHOD
    validation: function(){
        if (( userItem.length < 2)||(userItem.length > 12)){
            alert("invalid description. \ndescription should not be more than 12 characters or less than two characters");
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
    // DELETE ITEMS FROM LIST1
    del: function(){
        $('.firstList').on('click','#delete',function(){
            $(this).parent().hide("slow",function(){$(this).remove();});
    // DELETE ITEMS FROM LOCALSTORAGE
            let userItem = $(this).parent().text().trim();
            let uncompleted = JSON.parse(localStorage.getItem('firstList'));
            let index = uncompleted.indexOf(userItem);
            uncompleted.splice(index, 1);
            localStorage.setItem('firstList', JSON.stringify(uncompleted));
        });
    //DELETE ITEMS FROM LIST2
        $('.secondList').on('click', '#delete', function(){
            $(this).parent().hide("slow",function(){$(this).remove();});
    // DELETE ITEMS FROM LOCALSTORAGE
            let userItem = $(this).parent().text().trim();
            let completed = JSON.parse(localStorage.getItem('secondList'));
            let index = completed.indexOf(userItem);
            completed.splice(index, 1);
            localStorage.setItem('secondList', JSON.stringify(completed));
        });
    },
        
    // MOVE ITEMS IN BETWEEN THE TWO LISTS (DOM)
    moveItem: function(list1,list2){
        list1.on('change','input[type=checkbox]',function(){
            list2.append($(this).parent());
        });
    },
        
    // MOVE ITEMS IN BETWEEN THE TWO ARRAYS (LOCALSTORAGE)
    moveItemSto: function(){ 
        $('ol').on('change','input[type=checkbox]',function(){
          if($(this).is(':checked')){ 
            let userItem = $(this).parent().text().trim();
            let uncompleted = JSON.parse(localStorage.getItem('firstList'));
            let index = uncompleted.indexOf(userItem);
            uncompleted.splice(index, 1);
            localStorage.setItem('firstList', JSON.stringify(uncompleted));
            let completed = JSON.parse(localStorage.getItem('secondList'));
            completed.push(userItem);
            $('.secondList input[type="checkbox"]').attr('checked','checked');
            localStorage.setItem('secondList', JSON.stringify(completed)); 
       } else {  
            let userItem = $(this).parent().text().trim();
            let completed = JSON.parse(localStorage.getItem('secondList'));
            let index = completed.indexOf(userItem);
            completed.splice(index, 1);
            localStorage.setItem('secondList', JSON.stringify(completed));
            let uncompleted = JSON.parse(localStorage.getItem('firstList'));
            uncompleted.push(userItem);
            localStorage.setItem('firstList', JSON.stringify(uncompleted));
           }
        });
    },
        
        
// TO HIDE LIST 
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
}
