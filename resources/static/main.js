$(document).ready(function () {
  var data = {'q1': {'ques': 'What is your gender', 'options': ['Male', 'Female']}, 'q2': {'ques': 'What is your favourite icecream', 'options': ['Vanilla', 'Chocolate', 'Strawberry']}, 'q3': {'ques': 'Which laptop do you use', 'options': ['Apple', 'Lenovo', 'HP', 'Microsoft']}, 'q4': {'ques': 'What is your Favourite Language', 'options': ['JS', 'Ruby', 'Clojure', 'Python', 'Go']}, 'q5': {'ques': 'How many questions did you answer so far', 'options': [1, 2, 3, 4]}}
  for (var item in data) {
    var element = document.createElement('h2')
    var element2 = document.createElement('h3')
    if (data.hasOwnProperty(item)) {
      element.innerHTML = data[item]['ques']
      element2.innerHTML = data[item]['options']
    }
    $('#questions').append(element)
    $('#questions').append(element2)
  }
})
