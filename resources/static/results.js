$(document).ready(function () {
  data = getData()
})

var getData = function () {
  var uuid = window.location.pathname.split('/')[1]
  $.get('get-results/' + '001', function (data) {
  	sliceData(JSON.parse(data))
  })
}

var sliceData = function (data) {
  for (item in data) {
    createContainer(item)
    showQuestion(data[item]['ques'], item)
    showOptions(data[item]['options'], item, data[item]['results'])
  }
}

var showQuestion = function (que, qid) {
  $qBody = $('<div class="' + 'question' + qid.substring(1) + '"id="q' + '">' + 'Question' + qid.substring(1) + ': ' + que + '</div>').appendTo('.' + 'container' + qid.substring(1))
}

var showOptions = function (ans, qid, rcount) {
  for (item in ans) {
    $qBody = $('<div class="' + qid + '-' + ans[item] + '" id= "ans">' + ans[item] + ' ' + rcount[item] + '</div>').appendTo('.' + 'container' + qid.substring(1))
    $qBody = $('<div class="progress-bar" id= "bars" role="progressbar1" aria-valuenow="70"aria-valuemin="0" aria-valuemax="100" style="width:70%">70%' + '</div>').appendTo('.' + qid + '-' + ans[item])
  }
}

var createContainer = function (qid) {
  $qBody = $('<div class="' + 'container' + qid.substring(1) + '"id="cont' + '">').appendTo('.col-sm-8')
}
/*
<div class= "container1">
	  	<div class="question1">Question 1 : What is your gender?</div>
	  	<div class = "option1">Male
	  		<div class="progress">
  				<div class="progress-bar" role="progressbar1" aria-valuenow="70"
  				aria-valuemin="0" aria-valuemax="100" style="width:70%">
    			70%
  			</div>
  			</div>
  		</div> */
