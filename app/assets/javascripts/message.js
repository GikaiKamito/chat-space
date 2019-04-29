$(function(){
  function buildHTML(message){
    var image = message.image == null ?  "" : `<img src= ${ message.image}>`;
    var content = message.content == null ?  "" : `${ message.content }`;
    var html = `
    <div class = message>
    <div class = message__name>${message.user_name}</div>
    <div class = message__date>${message.date}</div>
    <div class = message__text>${content}</div>
    ${ image}
    </div>
    `
    return html;
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
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('送信失敗')
    })
  })
})