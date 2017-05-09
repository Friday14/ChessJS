<template>
  <div id="app">
    <Layer></Layer>
  </div>
</template>

<script>
import Layer from './components/Layer'
export default {
  name: 'app',
  components: {
    Layer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
