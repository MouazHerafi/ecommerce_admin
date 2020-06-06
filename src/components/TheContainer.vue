<template>
  <div>
    <app-header />

    <div id="siteContent" class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import AppHeader from "./AppHeader";
export default {
  name: "TheContainer",
  components: {
    AppHeader

  },
};
</script>
