<template>
  <div class="hello">
      <Occupation />
  </div>
</template>

<script>
import Occupation from '@/components/Occupation.vue'

export default {
  name: 'Stundenplan',
  components: {
  Occupation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
