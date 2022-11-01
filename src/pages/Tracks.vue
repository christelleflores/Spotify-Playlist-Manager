<template>
  <div class="track-data-container">
    <header> 
      <h1>Spotify Playlist Manager</h1>
        <p>tracks</p>
    </header> 
    <p class="track-data-label">Tracks:</p>
    <section class="tracks">
         <div v-for="track in tracks" :key="track.track" class="track1">
          
          <p>{{ track.track.name }} : {{ track.track.artists[0].name }}</p>
          
        </div>
        
    </section>
    <button @click.prevent="buttonClicked()">Go Back!</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Tracks',
  props: ['playlist_id'],

  data() {
    return {
      tracks: []
    }
  },
  async created() {
    const spotifyAccessToken = sessionStorage.getItem('SPOTIFY_ACCESS_TOKEN')
    if (spotifyAccessToken) {
      const tracks = await axios.get(`https://api.spotify.com/v1/playlists/${this.playlist_id}/tracks?market=US`, { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
      this.tracks = tracks.data.items

    }
    else {
      return this.$router.push('/')
    }
  },
  methods: {
    buttonClicked() {
      this.$router.push('/playlists');
    }
  }
}
</script>

<style scoped>
header {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: rgb(44, 182, 3);
  
}

.tracks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.track1 {
  border: 4px solid rgb(44, 182, 3);
  text-align: center;
  flex: 0 1 30%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.5s;
  padding: 1rem;
  margin-bottom: 1rem;
  
  width: fit-content;
}
img {
  display: inline-block;
}




.track-data-label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
}

</style>