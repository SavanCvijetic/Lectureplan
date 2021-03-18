<template>
  <div id="occupationSite">
    <div class="head">
      <h1 class="header">Berufsauswahl</h1>
    </div>
    <div class="table">
    <select @Change="onChnageOccupation($event)" v-model="selected">
        <option value="">Bitte wählen Sie einen Beruf aus</option>
        <option v-for="item in occupation" :key="item.beruf_id"
                  v-bind:value="item.beruf_id">
          {{ item.beruf_name }}
        </option>
      </select>
      <p><span>Selected country name: {{selected}}</span></p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "OccupationList",
  data() {
    return {
      selected: null,
      occupation: undefined,
    };
  },
  mounted() {
    Vue.axios.post("http://sandbox.gibm.ch/berufe.php").then((resp) => {
      this.occupation = resp.data;
      console.log(resp.data);
    });
  },
  methods: {
    onChnageOccupation(event) {
     this.selected = event.target.value;
    }
  }
};
</script>

<style>


</style>