$(document).ready(function () {
  data = getData()
})

var getData = function () {
  var uuid = window.location.pathname.split('/')[1]
  $.get('get-results/' + '001', function (data) {
  	sliceData(JSON.parse(data))
  })
}

// Instantiate blocks questions, answers etc.
var sliceData = function (data) {
  dashboardBuilder(data, '.col-sm-4')
  for (item in data) {
    createContainer(item, '.col-sm-8')
    showQuestion(data[item]['ques'], item)
    showOptions(data[item]['options'], item, data[item]['results'])
  }
}

// Question
var showQuestion = function (que, qid) {
  $qBody = $('<div class="' + 'question' + qid.substring(1) + '"id="q' + '">' + 'Question ' + qid.substring(1) + ': ' + que + '</div>').appendTo('.' + 'container' + qid.substring(1))
}

// Options and progress of responses
var showOptions = function (ans, qid, rcount) {
  let sum = rcount.reduce((a, b) => { return a + b })
  for (item in ans) {
  	let pval = Math.round(rcount[item] * 1000 / sum) / 10
  	$qBody = $('<div class="' + ans[item] + '" id= "ans">' + ans[item] + '</div>').appendTo('.' + 'container' + qid.substring(1))
    $qBody = $('<div class="' + qid + '-' + ans[item] + '" id= "anstxt">' + rcount[item] + ' responses' + '</div>').appendTo('.' + 'container' + qid.substring(1))
  	$qBody = $('<div class = "progress"><div class="progress-bar progress-bar-striped" id= "bars" role="progressbar1" aria-valuenow="' + pval + '"aria-valuemin="0" aria-valuemax="100" style="width:' + pval + '%">' + pval + '%' + '</div></div>').appendTo('.' + 'container' + qid.substring(1))
  }
}

// Builds block to accomodate question and answer
var createContainer = function (qid, appender) {
  $qBody = $('<div class="' + 'container' + qid.substring(1) + '"id="cont' + '">').appendTo(appender)
}

// Builds Result Summary Container
var dashboardBuilder = function (argument, appender) {
  let max = 0
  for (let x in argument) {
    if (max < argument[x]['results'].reduce((a, b) => { return Math.max(a, b) })) {
      max = argument[x]['results'].reduce((a, b) => { return Math.max(a, b) })
    }
  }

  $qBody = $('<div class="probCount " id= "pC">' + 'Number of questions: ' + Object.keys(argument).length + '</div>').appendTo(appender)
  $qBody = $('<div class="ansCount " id= "aC">' + 'Number of responses: ' + max + '</div>').appendTo(appender)
}

// scroll to the top
window.onscroll = function () { scrollFunction() }

function scrollFunction () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('myBtn').style.display = 'block'
  } else {
    document.getElementById('myBtn').style.display = 'none'
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction () {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
