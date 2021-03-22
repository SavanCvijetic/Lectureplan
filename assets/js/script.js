$(document).ready(fetchOccupations());

const 	weekday = new Array(7);
weekday[0] = "Sonntag";
weekday[1] = "Montag";
weekday[2] = "Dienstag";
weekday[3] = "Mittwoch";
weekday[4] = "Donnerstag";
weekday[5] = "Freitag";
weekday[6] = "Samstag";

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
    var classApi = 'http://sandbox.gibm.ch/klassen.php?beruf_id=';
    var occupationId = $('#occupationSelection').val();
    var classSelectionCode =  '<h2>Klassenauswahl</h2>' +
                              '<select class="form-control" name="classSelection" id="classSelection">' +
                                '<option value="">Bitte wählen Sie eine Klasse aus...</option>' +
                              '</select>' + 
                              '<br>'

    if(occupationId >= 0 && occupationId !== "")
    {
      $('#class').html(classSelectionCode);

      $.getJSON(classApi + occupationId, function(classesData) 
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
    var timeTableApi = 'http://sandbox.gibm.ch/tafel.php?klasse_id=';
    var classId = $('classSelection').val();
    console.log('test');

    $.getJSON(timeTableApi + classId, function(timeTablesData) 
    {
      $.each(timeTablesData, function(_timerTableIndex, timeTableData)
      {
        $('#idTableBody').append("<tr><td>" 
        + moment(val.tafel_datum).format("DD-MM-YYYY") 
        + "</td>" + "<td>" + weekday[timeTableData.tafel_wochentag] 
        + "</td>" + "<td>" + moment(timeTableData.tafel_von, "HH:mm:ss").format("HH:mm") 
        + "</td>" + "<td>" + moment(timeTableData.tafel_bis, "HH:mm:ss").format("HH:mm") 
        + "</td>" + "<td>" + timeTableData.tafel_longfach 
        + "</td>" + "<td>" + timeTableData.tafel_lehrer 
        + "</td>" + "<td>" + timeTableData.tafel_raum 
        + "</td>");

      })
    })
  }

  $('#occupationSelection').change(function(){
    fetchClasses();
    $('#class').fadeTo("slow", 1);
  })

  $('#classSelection').change(function() {
    console.log('test');
    createTimetable();
    $('#timeTable').fadeTo("slow", 1);

  })
