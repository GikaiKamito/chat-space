$(function(){
  function buildHTML(message){
    var image = message.image == null ?  "" : `<img src= ${ message.image}>`;
    var content = message.content == null ?  "" : `${ message.content }`;
    var html = `
    <div class = message data-id=${message.id}>
    <div class = message__name>${message.user_name}</div>
    <div class = message__date>${message.date}</div>
    <div class = message__text>${content}</div>
    ${ image}
    </div>
    `
    return html;
  }
  
  function scroll(){
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html)
      $('.new_message')[0].reset()
      $('.form__submit').removeAttr("disabled")
      scroll();
    })
    .fail(function(){
      alert('送信失敗')
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.message').last().data('id')
    $.ajax({
      url: "/groups/:group_id/api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(data) {
      if (data.empty){
        scroll();
      }
      else{
        data.forEach(function(message) {
          $('.messages').append(buildHTML(message));
          scroll();
        })
      }
    })
    .fail(function() {
      alert('更新できませんでした');
    });
  };
  if (location.pathname.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 5000)}
});
