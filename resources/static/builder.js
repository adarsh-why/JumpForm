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
  document.getElementById('getJS').addEventListener('click', function() {
    console.log(formBuilder.actions.getData());
  });
});


  $(fbTemplate).formBuilder(options);