$(document).ready(function () {
		var data  = getData();
});

var getData = function () {
	var uuid = window.location.pathname.split( '/' )[1];
  $.get("get-json/"+uuid, function(data) {
  	sliceData(JSON.parse(data));
	});
};

var sliceData = function (data) {
    for (item in data) {
        showQuestion(data[item]['ques'], item);
        showOptions(data[item]['options'], item);
    }
};

var showQuestion = function (que, qid) {
    $qBody = $('<div class="'+qid+'">'+que+'<div class="'+qid+'-answer"></div></div><br><br>').appendTo('#question');
};

var showOptions = function (ans, qid) {
    for (item in ans) {
       $qBody.find('.'+qid+'-answer').append('<div class="'+qid+'-'+ans[item]+'"><input type="radio" id="'+qid+'_ans_'+item+'"value = '+item+'>'+ans[item]+'</div>');
    }
};
