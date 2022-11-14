<template>
<body>
<section class="heading">
  <h1>Spotify Playlist Manager</h1>
</section>
<section class="wrapper">
  <div class="card-grid-space">
    <div v-for="playlist in playlists" :key="playlist.name" class="playlist">
        <div class="playlist-image">
          <img :src="playlist.images[0].url" alt="cover">
        </div>
        <h1>{{ playlist.name }}</h1>
        <div class="buttons">
            <button @click.prevent="buttonClicked(playlist)">Select</button> 
        </div>
      </div>
  </div>
</section>
</body>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Playlists',
  data() {
    return {
      playlists: []
    }
  },
  async created() {
    const spotifyAccessToken = sessionStorage.getItem('SPOTIFY_ACCESS_TOKEN')
    if (spotifyAccessToken) {
      const playlists = await axios.get('https://api.spotify.com/v1/me/playlists', { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
      this.playlists = playlists.data.items

    }
    else {
      return this.$router.push('/')
    }
  },
  methods: {
    buttonClicked(playlist) {
      this.$router.push({
        name: 'Tracks',
        params: {
          playlist_id: playlist.id
        }
      });
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  background-color: rgb(133, 158, 109);
  transition: all 0.3s ease-out;
}

.body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Open Sans';
  background-color: rgb(133, 158, 109);
}

.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4rem;
  padding: 4rem;
  margin: 0 auto;
  width: max-content;
}

.card-grid-space{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.playlist {
  height: 15em;
  width: 15em;
  font-size: 1.5em;
  border-radius: 1em;
  margin: 2em;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 5em -1em black;
  transition: all, var(--transition-time);
  position: relative;
  overflow: hidden;
  border: 10px solid #ccc;
  
}

.playlist .playlist-image{
  width: 100%;
  height: 100%;
  opacity: 60%;
  display: flex;
}

.playlist:hover h1{
  transition: all 0.3s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

.playlist h1 {
  margin: 35px 0;
  font-size: 1.5em;
  line-height: 1.2em;
  position: absolute;
  color: darkgreen;
}

.playlist .buttons {
   justify-content: center;
   position: absolute;
   display: flex;
}
.playlist .buttons button{
  text-decoration: none;
  padding: 7px 20px;
  border-radius: 20px;
  color: #fff;
  background-color: rgb(133, 158, 109);
  transition: all 0.3s ease;
}
.playlist button:hover{
  transform: scale(0.94);
}

.playlist:before {
  content: "";
  position: absolute;
  bottom: -16px;
  left: -16px;
  background:white;
  height: 50px;
  width: 50px;
  border-radius: 32px;
  transform: scale(0.5);
  transform-origin: 50% 50%;
  transition: transform 0.25s ease-out;
  /*
  background: #ddd;
  width: 250%;
  height: 250%;
  */
}
.playlist:hover:before {
  transform: scale(21);
}

.heading {
  font-size: 3em;
  display: flex;
  padding: 1em 3em;
  height: 3em;
  color: wheat;
  font-weight: normal;
}

</style>