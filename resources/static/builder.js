var formData = {};

jQuery(function($) {
  var fbEditor = document.getElementById('build-wrap');
  var options = {
    disableFields: [
      'autocomplete',
      'button',
      'checkbox-group',
      'date',
      'file',
      'header',
      'hidden',
      'paragraph',
      'number',
      'select',
      'text',
      'textarea'
    ]
  };
  var formBuilder = $(fbEditor).formBuilder(options);
    document.getElementById('publish').addEventListener('click', function() {
    processFormData(formBuilder.actions.getData());
  });
});

var processFormData = function (data) {
  for (item in data) {
    setFormData(item, data[item]);
  };
  sendFormData(formData);
};

var setFormData = function (qId, qObj) {
  var id = 'q'+(parseInt(qId)+1);
  formData[id] = {
    "ques": qObj["label"],
    "options": setOptions(qObj["values"])
  };
};


var setOptions = function (options) {
  array = [];
  for(item in options) {
    array.push(options[item].label);
  };
  return array;
};

var sendFormData = function (formData) {
  console.log(111, formData);
  console.log(222,JSON.stringify({formData}));
  $.ajax({
      url: "create-form",
      type: "POST",
      data: JSON.stringify({formData}),
      complete: function(formData,status){
          alert("Data: " + JSON.stringify(formData) + "\nStatus: " + status);
      },
  });
};
