//API Urls
const occupationApi = "http://sandbox.gibm.ch/berufe.php";
const classApi = "http://sandbox.gibm.ch/klassen.php?beruf_id=";
const tableUrl = "https://sandbox.gibm.ch/tafel.php?klasse_id=";

let date = moment();

console.log(date.clone().subtract(1, 'week').format("WW-YYYY"));
console.log(date.format("WW-YYYY"));
console.log(date.clone().add(1, 'week').format("WW-YYYY"));

const weekdays = {1: "Montag", 2: "Dienstag", 3: "Mittwoch", 4: "Donnerstag", 5: "Freitag", 6: "Samstag", 0: "Sonntag"};


//LocalStorage auslesen
const storageOccupation = localStorage.getItem("occupation");
const storageClass = localStorage.getItem("class");

//Aktuelles Datum
let currentWeek = moment();

//Fehlermeldung welche im HTML angezeigt wird
let errorMessage = "";

$(document).ready(fetchOccupations());

function fetchOccupations() {
  var occupationSelectionCode = '<h2>Berufsauswahl</h2>' +
    '<select class="form-control" name="occupationSelection" id="occupationSelection">' +
    '<option value="">Bitte wählen Sie eine Berufsgruppe aus...</option>' +
    '</select>' +
    '<br>';

  $('#occupation').append(occupationSelectionCode);
  $('#occupationSelection').on('change', function () {
    $
    console.log($('#occupationSelection').val());
    fetchClasses();
    $('#class').fadeTo("slow", 1);
  })

  $.getJSON(occupationApi)
    .done(function (occupationsData) {
      $.each(occupationsData, function (_occupationIndex, occupationsData) {
        $('#occupationSelection').append($('<option value="' + occupationsData.beruf_id + '">' + occupationsData.beruf_name + '</option>'));
      })
    })
    .fail(function (error) {
      console.log("Request Failed: " + error);
    })
}


function fetchClasses() {

  var classSelectionCode = '<h2>Klassenauswahl</h2>' +
    '<select class="form-control" name="classSelection" id="classSelection">' +
    '<option value="">Bitte wählen Sie eine Klasse aus...</option>' +
    '</select>' +
    '<br>'

  $('#class').html(classSelectionCode);
  $('#classSelection').on('change', function () {
    console.log($(this).val());
    fetchTimeTable();
    $('#timetable').fadeTo("slow", 1);
  })

  $.getJSON(classApi + $('#occupationSelection').val())
    .done(function (classesData) {
      $.each(classesData, function (_classIndex, classData) {
        $('#classSelection').append($(`<option value="${classData.klasse_id}">${classData.klasse_longname}</option>`));
      })
    })
    .fail(function (error) {
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
      const pagination =  '<div class="btn-group" role="group" aria-label="Basic example">'+
                            '<button type="button" class="btn btn-dark" id="subtractWeek"> &lt; </button>'+
                            '<button type="button" class="btn btn-dark" id="currentWeek">'+ date.format("WW-YYYY")+ '</button>'+
                            '<button type="button" class="btn btn-dark" id="addWeek"> &gt; </button>'+
                          '</div>';

    $('#pagination').append(pagination);

    $('#subtractWeek').click(function()
      { date.subtract(1, 'week'); updateDate();});
    $('#addWeek').click(function()
      { date.add(1, 'week'); updateDate();});

    var timeTableHead = '<table class="table table-striped table-dark">' +
                            '<tr>' +
                                '<th> Datum </th>' +
                                '<th> Tag </th>' +
                                '<th> Von </th>' +
                                '<th> Bis </th>' +
                                '<th> Lehrer </th>' +
                                '<th> Fach </th>' +
                                '<th> Raum </th>' +
                                '<th> Bemerkung </th>' +
                            '</tr>'+
                        '</table>';

    $('#timetable').append(timeTableHead);
  }
  
  
  function updateDate()
  {
    const dateString = date.format("WW-YYYY");
    $('#currentWeek').val(dateString);
    $('#currentWeek').text(dateString);
    $.getJSON(`http://sandbox.gibm.ch/tafel.php?klasse_id=${$('#classSelection').val()}&woche=${dateString}`)
    .done(function(timeTablesData)
    {
            $.each(timeTablesData, function(_timeTableIndex, timeTableData)
            {
                $('#timetable > table')
                  .append(
                  `<tr>
                    <td>${moment(timeTableData.tafel_datum).format("DD.MM.YYYY")}</td>
                    <td>${weekdays[timeTableData.tafel_wochentag]}</td>
                    <td>${moment(timeTableData.tafel_von, "HH:mm:ss").format("HH:mm")}</td>
                    <td>${moment(timeTableData.tafel_bis, "HH:mm:ss").format("HH:mm")}</td>
                    <td>${timeTableData.tafel_lehrer}</td>
                    <td>${timeTableData.tafel_longfach}</td>
                    <td>${timeTableData.tafel_raum}</td>
                    <td>${timeTableData.tafel_kommentar}</td>
                  </tr>`
                  )
            })
        })
    }

