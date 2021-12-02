<template>
  <div id="app" class="position-relative">
    <b-navbar toggleable="lg" type="dark" id="#navbar" class="bg-purple">
      <div class="container">
        <b-navbar-brand href="/">StockTracker</b-navbar-brand>
      </div>
    </b-navbar>
    <div class="container pb-5">
      <HelloWorld :servicesData="servicesData" />
    </div>
    <div class="pt-5">
      <footer class="bg-light-purple container-fluid">
        <div class="container py-3">
          Made by Caio C. Coelho, Caleb Sutherland, Daniel Wakefield, Jack
          Hillier, Ryan Harlen.
          <a href="https://github.com/CaioCamatta/StockTracker">Github</a>
        </div>
      </footer>
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
    const res = await fetch(
      // Note: hardcoded 3000 port for backend. Ideal would be env var.
      `${window.location.protocol}//${window.location.hostname}:3000/services`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
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
  min-height: 100vh;
}
.bg-purple {
  background-color: #7749f8 !important;
}
.bg-light-purple {
  background-color: #ebe5fc;
}
footer {
  position: absolute;
  bottom: 0;
}
</style>
