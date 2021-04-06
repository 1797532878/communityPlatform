// 关注
$(function(){
  $(".follow-btn").click(follow);
});

function follow() {
  var btn = this;
  if($(btn).hasClass("btn-info")) {
    // 关注TA
    $.post(
      'http://localhost:8081/communityPlatform/follow',
      {"entityType":3,"entityId":$(btn).prev().val(),"loginUserId":$(btn).next().val()},
      function (data) {
        data = $.parseJSON(data);
        if (data.code === 0) {
          $(btn).text("已关注").removeClass("btn-info").addClass("btn-secondary");
          window.location.reload();
        } else {
          alert(data.msg)
        }
      }
    );
  } else {
    // 取消关注
    $.post(
      'http://localhost:8081/communityPlatform/unfollow',
      {"entityType":3,"entityId":$(btn).prev().val(),"loginUserId":$(btn).next().val()},
      function (data) {
        data = $.parseJSON(data);
        if (data.code === 0) {
          $(btn).text("关注TA").removeClass("btn-secondary").addClass("btn-info");
          window.location.reload();
        } else {
          alert(data.msg)
        }
      }
    );
  }
}

// 发布
$(function(){
  $("#publishBtn").click(publish);
});

function publish() {
  $("#publishModal").modal("hide");
  $("#hintModal").modal("show");
  setTimeout(function(){
    $("#hintModal").modal("hide");
  }, 2000);
}


window.alert = function(message) {
	if(!$(".alert-box").length) {
		$("body").append(
			'<div class="modal alert-box" tabindex="-1" role="dialog">'+
				'<div class="modal-dialog" role="document">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<h5 class="modal-title">提示</h5>'+
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
							'<span aria-hidden="true">&times;</span>'+
						'</button>'+
					'</div>'+
					'<div class="modal-body">'+
						'<p></p>'+
					'</div>'+
					'<div class="modal-footer">'+
						'<button type="button" class="btn btn-secondary" data-dismiss="modal">确定</button>'+
					'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);
	}

    var h = $(".alert-box").height();
	var y = h / 2 - 100;
	if(h > 600) y -= 100;
    $(".alert-box .modal-dialog").css("margin", (y < 0 ? 0 : y) + "px auto");

	$(".alert-box .modal-body p").text(message);
	$(".alert-box").modal("show");
}
