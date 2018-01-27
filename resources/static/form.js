
$(document).ready(function () {
  var data = getData()
})

var getData = function () {
  var uuid = window.location.pathname.split('/')[1]
  $.get('get-json/' + uuid, function (data) {
  	sliceData(JSON.parse(data))
  })
}

var sliceData = function (data) {
  for (item in data) {
    createContainer(item, '.col-sm-10')
    showQuestion(data[item]['ques'], item)
    showOptions(data[item]['options'], item)
  }
}

var createContainer = function (qid, appender) {
  $qBody = $('<div class="' + 'container' + qid.substring(1) + '"id="cont' + '">').appendTo(appender)
}

var showQuestion = function (que, qid) {
  $qBody = $('<div id="' + qid + '">' + que + '<div class="' + qid + '-answer"></div></div><br><br>').appendTo('.' + 'container' + qid.substring(1))
}

var showOptions = function (ans, qid) {
  for (item in ans) {
    $qBody.find('.' + qid + '-answer').append('<div class="' + qid + '-' + ans[item] + '"><input type="radio" id="' + qid + '_ans_' + item + '"value = ' + item + '>' + '  ' + ans[item] + '</div>')
  }
}
function submit () {
  var uuid = window.location.pathname.split('/')[1]
  let answers = []
  var radio
  var q_count = 1
  var nxtQ = document.getElementById('q' + q_count)
  while (nxtQ != undefined) {
    var op_count = 0
    var nxtOp = document.getElementById('q' + q_count + '_ans_' + op_count)
    while (nxtOp != undefined) {
      let radio = document.getElementById('q' + q_count + '_ans_' + op_count).checked
      if (radio == true) {
        let qaPair = [q_count, op_count]
        answers[q_count] = qaPair
        break
      }
      op_count++
      var nxtOp = document.getElementById('q' + q_count + '_ans_' + op_count)
    }
    q_count++
    nxtQ = document.getElementById('q' + q_count)
  }
  console.log(answers)
  console.log('uuid', uuid)
  var k = JSON.stringify({answers})
  console.log(typeof (k))
  console.log('json ', JSON.stringify({answers: answers}))
  $.post('post-results/' + uuid, k, null)
}
