$(document).ready(
  fetchOccupations()
  );


  function fetchOccupations()
  {
    var occupationApi = 'http://sandbox.gibm.ch/berufe.php';
    var occupationSelectionCode = '<h2>Berufsauswahl</h2>' +
                                  '<select class="form-control" name="occupationSelection" id="occupationSelection">' +
                                    '<option value="">Bitte wählen Sie eine Berufsgruppe aus...</option>' +
                                  '</select>' +
                                  '<br>';

    $('#occupation').append(occupationSelectionCode);

    $.getJSON(occupationApi, function(occupationsData)
    {
      $.each(occupationsData, function(_occupationIndex, occupationsData)
      {
        $('<option value="' + occupationsData.beruf_id + '">' + occupationsData.beruf_name + '</option>')
        .appendTo($('#occupationSelection'));
      })
    })
  }

  function fetchClasses()
  {
    var classApi = 'http://sandbox.gibm.ch/klassen.php';
    var occupationId = $('#occupationSelection').val();
    var classSelectionCode =  '<h2>Klassenauswahl</h2>' +
                              '<select class="form-control" name="classSelection" id="classSelection">' +
                                '<option value="">Bitte wählen Sie eine Klasse aus...</option>' +
                              '</select>' + 
                              '<br>'

    if(occupationId >= 0 && occupationId !== "")
    {
      $('#class').html(classSelectionCode);

      $.getJSON(classApi,'beruf_id=' + occupationId, function(classesData) 
      {
        $.each(classesData, function(_classIndex, classData)
        {
          $('<option value="' + classData.klasse_id + '">' + classData.klasse_longname + '</option>')
          .appendTo($('#classSelection'));
        })
      })
    }
  }

  function createTimetable()
  {
    var classId = $('classSelection').val();
  }

  $('#occupationSelection').change(function(){
    fetchClasses();
    $('#class').fadeTo("slow", 1);
  })

  $('#classSelection').change(function() {
    createTimetable();
  })
