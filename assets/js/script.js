$(document).ready(
  fetchOccupations()
  );

  function fetchOccupations()
  {
    var occupationApi = 'http://sandbox.gibm.ch/berufe.php';

    $('#occupation').append('<h1>Berufsauswahl</h1>' +
                            '<select class="form-control" name="occupationSelection" id="occupationSelection"' +
                              '<option value="">Bitte wählen Sie eine Berufsgruppe aus...</option>' +
                            '</select>');

    $.getJSON(occupationApi, function(occupationsData){
      $.each(occupationsData, function(_occupationIndex, occupationsData){
        $('<option value="' + occupationsData.beruf_id + '">' + occupationsData.beruf_name + '</option>')
        .appendTo($('#occupationSelection'));
      })
    })
  }

  function fetchClasses()
  {
    var classApi = 'http://sandbox.gibm.ch/klassen.php';
    var occupationId = $('#occupationSelection').val();

    if(occupationId >= 0 && occupationId !== "")
    {
      
    }
  }

  function createTimetable()
  {

  }