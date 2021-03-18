<template>
  <div id="app">
    <h1 class="headerone">Stundenplan der BBZBL Muttenz & Pratteln</h1>
    <Stundenplan/>
  </div>
</template>

<script>
import Stundenplan from '@/components/Stundenplan.vue'

export default {
  name: 'App',
  components: {
    Stundenplan,

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

.headerone{
color: #eee;
background-color: #42b983;
padding: 30px;
margin-top: -3.5%;
margin-left: -3%;
margin-right: -3%;
}

select {
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: .6em 1.4em .5em .8em;
	width: 50%;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	background-color: #fff;
}

select:hover {
color: #42b983;
  }
</style>
