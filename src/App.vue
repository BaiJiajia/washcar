<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: #eee;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.mint-searchbar-inner .mintui-search {
  font-size: 16px;
  margin-right: 5px;
}
.mint-searchbar-core {
  font-size: 16px;
}
.mint-searchbar {
  background-color: #eee;
  border-top: 1px solid #d9d9d9
}
</style>
