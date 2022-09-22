<template>
  <div>
    <h3>Home</h3>
    <button @click="loginToSpotify">Login to Spotify</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Home',
  methods: {
    loginToSpotify() {
      const params = {
        response_type: 'code',
        client_id: process.env.VUE_APP_CLIENT_ID,
        scope: 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public',
        redirect_uri: process.env.VUE_APP_REDIRECT_URI,
        state: uuidv4()
      }
      return window.location.href = `https://accounts.spotify.com/authorize?${new URLSearchParams(params)}`
    }
  }
}
</script>
