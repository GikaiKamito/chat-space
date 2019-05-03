$(function(){
  var search = $('#user-search-result')

  function appendUser(user){
    var html =`
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>
    `      
    search.append(html)
  }

  function addUser(name,user_id){
    var html =`
    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>
    `
    $("#chat-group-user-22").append(html)
  }
  
  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    $.ajax({ 
      url: '/users', 
      type: 'GET', 
      data: ('keyword=' + input), 
      processData: false, 
      contentType: false,
      dataType: 'json' 
    })

    .done(function(data){
      console.log(data)
      $("#user-search-result").empty();
        data.forEach(function(i,user){
          appendUser(i,user)
        })
      })
    .fail(function(){
      alert('検索失敗')
    });
  })

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(e){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    addUser(name,user_id);
    $(this).parent().remove();
  });
  $("#chat-group-users").on("click", ".js-remove-btn", function(e){
    $(this).parent().remove();
  });
})

