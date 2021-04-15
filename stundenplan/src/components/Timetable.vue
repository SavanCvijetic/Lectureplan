
<template>
  <div>
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th> Datum </th>
              <th> Von </th>
              <th> Bis </th>
              <th> Fach </th>
              <th> Lehrer </th>
              <th> Zimmer </th>
              <th> Bemerkung </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeTable in timeTables" :key="timeTable.id">
              <td> {{ moment(String(timeTable.tafel_datum)).format('dddd, DD.MM.YYY') }} </td>
              <td> {{ moment(String(timeTable.tafel_von)).format('hh:mm') }} </td>
              <td> {{ moment(String(timeTable.tafel_bis)).format('hh:mm') }} </td>
              <td> {{ timeTable.tafel_longfach }} </td>
              <td> {{ timeTable.tafel_lehrer }} </td>
              <td> {{ timeTable.tafel_raum }} </td>
              <td> {{ timeTable.tafel_kommentar }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: { timeTables: Array },
  setup() {
    
  },
}
</script>