// 点赞
function like (btn,entityType) {
  let entityId = $(btn).find('.id').val();
  let userId = $(btn).find('.userId').val();
  $.post(
    "http://localhost:8081/communityPlatform/like",
    {"entityType":entityType,"entityId":entityId,"userId":userId},
    function (data) {
      data = $.parseJSON(data);
      if (data.code === 0) {
        $(btn).children("i").text(data.likeCount);
        $(btn).children("b").text(data.likeStatus === 1 ? '已赞' : '赞')
      } else {
        alert(data.msg);
      }
    }
  );
}
