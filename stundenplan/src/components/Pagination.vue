<template>
  <div>
    <div>
      <button @click="weekBack">
    </div>
    <div>
      {{ currentWeek }}
    </div>
    <div>
      <button @click="weekForward">
    </div>
  </div>
</template>

<script>
  export default {
    setup() {
      return { weekBack, currentWeek, weekBack }
    }
  }
</script>