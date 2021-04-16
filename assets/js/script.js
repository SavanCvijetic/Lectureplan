//API Urls
const occupationApi = "http://sandbox.gibm.ch/berufe.php";
const classApi = "http://sandbox.gibm.ch/klassen.php?beruf_id=";
const tableUrl = "https://sandbox.gibm.ch/tafel.php?klasse_id=";

//Wochentage
const weekdays = {1: "Montag", 2: "Dienstag", 3: "Mittwoch", 4: "Donnerstag", 5: "Freitag", 6: "Samstag", 0: "Sonntag"};

//LocalStorage auslesen
const storageOccupation = localStorage.getItem("occupation");
const storageClass = localStorage.getItem("class");

//Aktuelles Datum
let currentWeek = moment();

//Fehlermeldung welche im HTML angezeigt wird
let errorMessage = "";

$(document).ready(fetchOccupations());

  function fetchOccupations()
  {
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
            $('#occupationSelection').append($('<option value="' + occupationsData.beruf_id + '">' + occupationsData.beruf_name + '</option>'));
        })
      })
      .fail(function(error)
      {
        console.log("Request Failed: " + error);
      })
  }

  $('#occupationSelection').on('change', function(){
    localStorage.setItem("occupation", $('#occupationSelection').val());
    fetchClasses();
    $('#class').fadeTo("slow", 1);
  })

  function fetchClasses()
  {
    var occupationId = $('#occupationSelection').val() >= 0 && $('#occupationSelection').val() !== "" ? $('#occupationSelection').val() : null; 
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
            $('#classSelection').append($('<option value="' + classData.klasse_id + '">' + classData.klasse_longname + '</option>'));
            console.log(classData.klasse_id + classData.klasse_longname);
          })
        })
        .fail(function(error)
        {
          console.log("Request Failed: " + error);
        })
  }

$('#classSelection').on('change', function(){
    if($('#classSelection').val() != null || $('#classSelection').val() != "Bitte wählen Sie eine Klasse aus...")
    {
        console.log($('#classSelection').value);
        localStorage.setItem('class', $('#classSelection').val());
        fetchTimeTable();
        $('#timeTable').fadeTo("slow", 1);
    }
  })

function fetchTimeTable() {

    var timeTableHead = '<table class="table table-striped">' +
                            '<tr>' +
                                '<th> Datum </th>' +
                                '<th> Von </th>' +
                                '<th> Bis </th>' +
                                '<th> Lehrer </th>' +
                                '<th> Fach </th>' +
                                '<th> Raum </th>' +
                                '<th> Bemerkung </th>' +
                            '</tr>'+
                        '</table>';

    $('#timetable').append(timeTableHead);
    $.getJSON('http://sandbox.gibm.ch/tafel.php?klasse_id=3175962')
    .done(function(timeTablesData)
    {
            $.each(timeTablesData, function(_timeTableIndex, timeTableData)
            {
                $('#timetable > table').append('<tr>' +
                                                    '<td>' + timeTableData.tafel_datum + '</td>' +
                                                    '<td>' + timeTableData.tafel_von + '</td>' +
                                                    '<td>' + timeTableData.tafel_bis + '</td>' +
                                                    '<td>' + timeTableData.tafel_lehrer + '</td>' +
                                                    '<td>' + timeTableData.tafel_longfach + '</td>' +
                                                    '<td>' + timeTableData.tafel_raum + '</td>' +
                                                    '<td>' + timeTableData.tafel_kommentar + '</td>' +
                                                '</tr>')
            })
        })
    }
        





        // function weekGet() { return moment( moment(storageGet('date')).format('WW-YYYY') ); }
        
        // function weekUpdate() { return $('#week').text(`Woche ${moment( moment(storageGet('date').format('WW-YYYY'))) }` ); }
        
        // function dateFormat(dateValue) 
        // {
        //     const date = new Date(dateValue);
        //     return `${date.getDate()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
        // }
        
        // function weekday(dayIndex) {return week[dayIndex];}
        
        // function storageGet(key) {localStorage.getItem(key);}
        
        // function storageSave(key, value) {localStorage.setItem(key, value);}
        
        // function storageRemove(key) {localStorage.removeItem(key);}
        

    

    
    
