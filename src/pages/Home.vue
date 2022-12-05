<template>
  <section>
    <div class="header">
      <h3>Spotify Playlist Manager</h3>
      <h3>Spotify Playlist Manager</h3>
        <p>Manage your playlists!!</p>
      <button @click="loginToSpotify">Login to Spotify</button>
    </div>
  </section>
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
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

section{
  display: flex;
  background: #000;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  
}
.header{
  position: relative;
}

.header h3{
  color: #fff;
  font-size: 8em;
  position: absolute;
  transform: translate(-50%, -50%);
  margin-left: 100px;
  padding: 15%;
}
.header h3:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 2px rgb(133, 158, 109);
}

.header h3:nth-child(2) {
  color: rgb(133, 158, 109);
  animation: animate 4s ease-in-out infinite;
}

.header p{
  text-align: center;
  color: rgb(133, 158, 109);
  font-size: 25px;
  padding-top: -40%;
  margin-left: 457px;
  margin-top: -100px;
}

.header button{
  background-color: rgb(133, 158, 109);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  margin-left: 30rem;
  margin-top: 7rem;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
}

button:hover{
  color: rgb(239, 250, 221);
  box-shadow: 0 0 10px 10px rgba(239, 250, 221, 2);
}


@keyframes animate{
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}
</style>