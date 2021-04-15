<template>
  <div id="app">
    <div>
      <Selection name="Berufe" :value="occupationKey" :values="occupations" @update="occupationChanged"/>
      <Selection name="Klassen" :value="classKey" :values="classes" @update="classChanged"/>
    </div>
    <div>
      <Pagination/>
    </div>
    <div>
      <Timetable/>
    </div>
  </div>
</template>

<script>
import Selection from './components/Selection.vue'
import Pagination from './components/Pagination.vue'
import Timetable from './components/Timetable.vue'

export default {
  name: 'App',
  components: {
    Selection,
    Pagination,
    Timetable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
