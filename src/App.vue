<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: oxio-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
	background-image: linear-gradient(#083f6e, #012730);
	color: #ffffff;
}

nav {
  padding: 30px;
	font-family: oxio-sans-serif;
	color: $oxio-green;

  > a {
    font-weight: bold;
		color: #ffffff;
		text-decoration: none;

		&:active {
			text-decoration: underline;
		}

    &.router-link-exact-active {
      color: $oxio-green;
    }
  }
}
</style>
