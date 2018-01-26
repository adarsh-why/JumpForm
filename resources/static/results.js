$(document).ready(function () {
  data = getData()
})

var getData = function () {
  var uuid = window.location.pathname.split('/')[1]
  $.get('get-results/' + '001', function (data) {
  	sliceData(JSON.parse(data))
  })
}

// {"q1":{"ques":"What is your gender","options":["Male","Female"],"results":[3,5]},
// "q2":{"ques":"What is your favourite icecream","options":["Vanilla","Chocolate","Strawberry"],"results":[2,0,4]},
// "q3":{"ques":"Which laptop do you use","options":["Apple","Lenovo","HP","Microsoft"],"results":[2,2,2,2]},
// "q4":{"ques":"What is your Favourite Language","options":["JS","Ruby","Clojure","Python","Go"],"results":[4,1,2,1,0]},
// "q5":{"ques":"How many questions did you answer so far","options":[1,2,3,4],"results":[0,0,1,7]}}
// window.console.log(data)

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
    $qBody = $('<div class="' + qid + '-' + ans[item] + '">' + ans[item] + ' ' + rcount[item] + '</div>').appendTo('.' + 'container' + qid.substring(1))
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
