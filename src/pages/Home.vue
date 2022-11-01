<template>
  <div class="header">
    <h3>Spotify Playlist Manager</h3>
      <p>Manage your playlists!!</p>
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

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.header{
  z-index: 1;
  background: linear-gradient(-45deg,  rgb(100, 208, 212), rgb(68, 49, 241), green, rgb(209, 238, 42));
  background-size: 400% 400%;
  width: 100%;
  height: 100vh;
  animation: animate 10s ease infinite;
}

.header h3{
  text-align: center;
  color: white;
  font-size: 60px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 15%;
}

.header p{
  text-align: center;
  color: white;
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding-top: -40%;
}

.header button{
  margin: 0;
  position: absolute;
  top: 70%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
}

@keyframes animate{
  0%{
    background-position: 0 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0 50%;
  }
}
</style>