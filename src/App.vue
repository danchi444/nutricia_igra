<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  text-align: center;
  overflow: hidden;
  background: url("@/assets/background.png") no-repeat center center fixed; /* Set the background image */
  background-size: cover; /* Ensure the image covers the entire viewport */
  font-family: 'Roboto', sans-serif;
}
</style>