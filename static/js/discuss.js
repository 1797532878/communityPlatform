// 点赞
function like (btn,entityType) {
  let entityId = $(btn).find('.id').val();
  let userId = $(btn).find('.userId').val();
  let entityUserId = $(btn).find('.entityUserId').val();
  let postId = $(btn).find('.postId').val();
  $.post(
    "http://localhost:8081/communityPlatform/like",
    {"entityType":entityType,"entityId":entityId,"userId":userId,
    "entityUserId":entityUserId,"postId":postId},
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
