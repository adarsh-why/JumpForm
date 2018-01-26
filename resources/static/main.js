$(document).ready(function () {
    var data = {'q1': {'ques': 'What is your gender', 'options': ['Male', 'Female']}, 'q2': {'ques': 'What is your favourite icecream', 'options': ['Vanilla', 'Chocolate', 'Strawberry']}, 'q3': {'ques': 'Which laptop do you use', 'options': ['Apple', 'Lenovo', 'HP', 'Microsoft']}, 'q4': {'ques': 'What is your Favourite Language', 'options': ['JS', 'Ruby', 'Clojure', 'Python', 'Go']}, 'q5': {'ques': 'How many questions did you answer so far', 'options': [1, 2, 3, 4]}}
    sliceData(data);
})

var sliceData = function (data) {
    for (item in data) {
        showQuestion(data[item]['ques'], item);
        showOptions(data[item]['options'], item);
    }
};

var showQuestion = function (que, qid) {
    $qBody = $('<div class="'+qid+'">'+que+'<div class="'+qid+'-answer"></div></div>').appendTo('#question');
};

var showOptions = function (ans, qid) {
    for (item in ans) {
        $qBody.find('.'+qid+'-answer').append('<div class="'+qid+'-'+ans[item]+'">'+ans[item]+'</div>');
    }
};