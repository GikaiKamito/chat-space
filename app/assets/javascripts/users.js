$(function(){

  function buildHTML(users){
    var html =`
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${users.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="user_name" data-user-name="">追加</div>
    </div>
    `      
    return html;
  }

  function buildHtml22(users){
    var html22 =`
    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
    <p class='chat-group-user__name'>${users.name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>
  `
  return html22;
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
      $(data).each(function(i,user){
        var html = buildHTML(user)
        $('#user-search-result').append(html)
      })

      $('.user-search-add.chat-group-user__btn.chat-group-user__btn--add').on("click", function () {
        $(data).each(function(i,user){
        var html22 = buildHtml22(user)
        $('#chat-group-user-22.chat-group-user.clearfix').append(html22)
        })
      });

    })
    .fail(function(){
      alert('検索失敗')
  });
})
})
