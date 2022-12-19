<template>
  <div>
    <h1>Loading...</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Callback',
  created() {
    const hashParams = {}
    this.$route.hash.substring(1).split('&').forEach(item => {
      hashParams[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    })
    if (hashParams.access_token) {
      sessionStorage.setItem('SPOTIFY_ACCESS_TOKEN', hashParams.access_token)
      return this.$router.push('Playlists')
    }
    else {
      this.errorMessage = 'Unable to authenticate Spotify user.'
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  }
}
</script>

<style scoped>
* {
  background-color: black;
  font-family: "Poppins", sans-serif;
  align-content: center;
}

h1{
  font-size: 50px;
}

.errorMessage {
  color: red;
}
</style>