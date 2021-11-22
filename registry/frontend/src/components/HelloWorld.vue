<template>
  <div>
    <b-row id="#content">
      <b-col>
        <h1>Stock Tracker</h1>
        <b-form-input
          v-model="text"
          placeholder="Search service"
        ></b-form-input>
        <div>
          <b-list-group>
            <span
              v-for="service in servicesData.filter((service) =>
                service.displayName.includes(text)
              )"
            >
              <b-list-group-item class="service-list">
                <a class="service-link" :href="service.path">{{
                  service.displayName
                }}</a>
                <b-button
                  v-on:click="bookmarkService(new Object(service))"
                  class="bookmark"
                  variant="outline-light"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    style="fill: #555"
                  >
                    <path
                      d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"
                    ></path></svg></b-button
              ></b-list-group-item>
            </span>
          </b-list-group>
        </div>
        <div>
          <h2>Subscribed services</h2>

          <span v-for="service in bookmarkedServices"
            ><b-button
              v-on:click="unbookmarkService(new Object(service))"
              class="bookmark"
              variant="outline-light"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                style="fill: #333"
              >
                <path
                  d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"
                ></path></svg
            ></b-button>
            <a class="service-link" :href="service.path">{{
              service.displayName
            }}</a>
          </span>
        </div>
      </b-col>
      <b-col
        ><b-img
          src="/imgs/candlestick-chart.png"
          fluid
          alt="Stock candlesticks"
        ></b-img
      ></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    servicesData: Array,
  },
  data() {
    return {
      text: "",
      bookmarkedServices: [],
      bookmarkService: function (service) {
        let currentServices = JSON.parse(
          localStorage.getItem("services") || "[]"
        );
        if (
          currentServices.filter((item) => item.path === service.path).length
        ) {
        } else {
          currentServices.push({ ...service });
          localStorage.setItem("services", JSON.stringify(currentServices));
          this.bookmarkedServices = currentServices;
        }
      },
      unbookmarkService: function (service) {
        let currentServices = JSON.parse(
          localStorage.getItem("services") || "[]"
        );
        if (
          !currentServices.filter((item) => item.path === service.path).length
        ) {
        } else {
          currentServices = currentServices.filter(
            (item) => item.path !== service.path
          );
          localStorage.setItem("services", JSON.stringify(currentServices));
          this.bookmarkedServices = currentServices;
        }
      },
    };
  },
  async created() {
    const currentServices = JSON.parse(
      localStorage.getItem("services") || "[]"
    );
    this.bookmarkedServices = currentServices;
  },
};
</script>

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
#content {
  padding-top: 10rem;
}
.service-list {
  color: var(--bs-primary);
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none !important;
}
.bookmark {
  padding: 0;
  border: 0;
}
</style>
