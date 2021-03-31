$(document).ready(fetchOccupations());

const week = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  function fetchOccupations()
  {
    var occupationApi = 'http://sandbox.gibm.ch/berufe.php';
    var occupationSelectionCode = '<h2>Berufsauswahl</h2>' +
                                  '<select class="form-control" name="occupationSelection" id="occupationSelection">' +
                                    '<option value="">Bitte wählen Sie eine Berufsgruppe aus...</option>' +
                                  '</select>' +
                                  '<br>';
                                  
    $('#occupation').append(occupationSelectionCode);

    $.getJSON(occupationApi)
      .done(function(occupationsData) 
      { 
        $.each(occupationsData, function(_occupationIndex, occupationsData)
        {
          $('<option value="' + occupationsData.beruf_id + '">' + occupationsData.beruf_name + '</option>')
          .appendTo($('#occupationSelection'));
        })
      })
      .fail(function(error)
      {
        console.log("Request Failed: " + error);
      })
  }

  function fetchClasses()
  {
    var classApi = 'http://sandbox.gibm.ch/klassen.php?beruf_id=';
    var occupationId = occupationId >= 0 && occupationId !== "" 
                        ? $('#occupationSelection').val() 
                        : null; 
    var classSelectionCode =  '<h2>Klassenauswahl</h2>' +
                              '<select class="form-control" name="classSelection" id="classSelection">' +
                                '<option value="">Bitte wählen Sie eine Klasse aus...</option>' +
                              '</select>' + 
                              '<br>'

      $('#class').html(classSelectionCode);

      $.getJSON(classApi + occupationId)
        .done(function(classesData) 
        {
          $.each(classesData, function(_classIndex, classData)
          {
            $('<option value="' + classData.klasse_id + '">' + classData.klasse_longname + '</option>')
            .appendTo($('#classSelection'));
          })
        })
        .fail(function(error)
        {
          console.log("Request Failed: " + error);
        })
  }

  function fetchTimetable()
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

  function weekGet() { return moment( moment(storageGet('date')).format('WW-YYYY') ); }

  function weekUpdate() { return $('#week').text(`Woche ${moment( moment(storageGet('date').format('WW-YYYY'))) }` ); }

  function dateFormat(dateValue) 
  {
    const date = new Date(dateValue);
    return `${date.getDate()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
  }

  function weekday(dayIndex) {return week[dayIndex];}

  function storageGet(key) {localStorage.getItem(key);}

  function storageSave(key, value) {localStorage.setItem(key, value);}

  function storageRemove(key) {localStorage.removeItem(key);}

  $('#occupationSelection').change(function(){
      fetchClasses();
      $('#class').fadeTo("slow", 1);
    })

  $('#classSelection').change(function(){
      console.log('test');
      fetchTimetable();
      $('#timeTable').fadeTo("slow", 1);
    })

  $('#paginationSelection').change(function(){
      fetchTimetable();
    })
