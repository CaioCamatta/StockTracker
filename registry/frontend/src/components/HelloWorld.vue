<template>
  <div>
    <b-row id="content">
      <b-col class="search" cols="5">
        <h1 class="mb-2"><b>Stock Tracker</b></h1>
        <b-form-input
          v-model="text"
          placeholder="Search service"
          class="mb-2"
        ></b-form-input>
        <div>
          <b-list-group class="services-list">
            <span
              v-for="service in servicesData.filter((service) =>
                service.displayName.includes(text)
              )"
              v-bind:key="service.route"
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
          <h2 class="mb-3">Subscribed services</h2>

          <span
            v-for="service in bookmarkedServices.filter(
              (item1) =>
                !!servicesData.filter((item2) => item2.path === item1.path)
                  .length
            )"
            v-bind:key="service.route"
          >
            <div class="my-2">
              <b-button
                v-on:click="unbookmarkService(new Object(service))"
                class="bookmark mr-3"
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
            </div>
          </span>
        </div>
      </b-col>
      <b-col cols="1"></b-col>
      <b-col cols="6"
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
          console.error("This item is already bookmarked");
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
          console.error("This item is not bookmarked");
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
.services-list {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
a {
  text-decoration: none !important;
}
.service-link {
  color: #444;
}
.bookmark {
  padding: 0;
  border: 0;
  margin-right: 7px;
}
.list-group-item {
  border: none !important;
}
h2 {
  margin-top: 4rem;
}
img {
  padding: 3rem 1rem 0 1rem;
}
.search {
  padding: 0 1rem;
}
</style>
