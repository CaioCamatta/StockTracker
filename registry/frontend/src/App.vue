<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary" id="#navbar">
      <div class="container">
        <b-navbar-brand href="/">StockTracker</b-navbar-brand>
      </div>
    </b-navbar>
    <div class="container">
      <HelloWorld :servicesData="servicesData" />
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      servicesData: [],
    };
  },
  async created() {
    const res = await fetch("http://localhost:3000/services", {
      method: "GET",
    }).then((response) => response.json());
    this.servicesData = res;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
