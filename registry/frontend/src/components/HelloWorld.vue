<template>
  <div>
    <b-row id="content">
      <b-col class="search" cols="5">
        <h1 class="mb-2"><b>Stock Tracker</b></h1>
        <b-form-input
          v-model="text"
          v-on:click="inputSelected = true"
          v-on:blur="hideDropdown()"
          placeholder="Search service"
          class="mb-2"
        ></b-form-input>
        <div>
          <span v-if="inputSelected"
            ><b-list-group
              v-if="servicesData.length"
              class="services-list position-absolute"
            >
              <span
                v-for="service in servicesData.filter((service) =>
                  service.displayName.includes(text)
                )"
                v-bind:key="service.route"
              >
                <b-list-group-item class="service-list">
                  <span class="service-link" :href="service.path">{{
                    service.displayName
                  }}</span>
                  <b-button
                    v-on:click="bookmarkService(new Object(service))"
                    class="bookmark"
                    variant="outline-light"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="#7749f8"
                    >
                      <path
                        d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9h-3v3h-2v-3H8V9h3V6h2v3h3v2z"
                      /></svg></b-button
                ></b-list-group-item>
              </span>
            </b-list-group>
            <p v-else>No services available.</p></span
          >
        </div>
        <div>
          <h2 class="mb-3">Subscribed services</h2>

          <span
            v-if="
              bookmarkedServices.filter(
                (item1) =>
                  !!servicesData.filter((item2) => item2.path === item1.path)
                    .length
              ).length
            "
          >
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
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="#444444"
                  >
                    <path
                      d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9H8V9h8v2z"
                    /></svg
                ></b-button>
                <a
                  class="service-link"
                  :href="service.path"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><span>{{ service.displayName }} </span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="#555"
                  >
                    <g data-name="Layer 2">
                      <g data-name="external-link">
                        <rect width="24" height="24" opacity="0" />
                        <path
                          d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"
                        />
                        <path
                          d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"
                        />
                      </g>
                    </g></svg
                ></a>
              </div> </span
          ></span>
          <p v-else>Subscribe to a service to access it.</p>
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
      inputSelected: false,
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
      hideDropdown: () =>
        setTimeout(() => {
          this.inputSelected = false;
        }, 250),
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
  padding-top: 20vh;
}
.service-list {
  color: var(--bs-primary);
  display: flex;
  justify-content: space-between;
}
.services-list {
  border: 1px solid rgba(0, 0, 0, 0.125);
  width: 268px;
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
