<template>
  <div class="track-data-container">
    <header> 
      <h1>Spotify Playlist Manager</h1>
    </header> 
    <p class="track-data-label">Tracks:</p>
    <button @click.prevent="buttonClicked()">Go Back!</button>
    <section class="search">
        <input v-model="searchText" type="text" id="query" value="" class="form-control" placeholder="Search Artist Name"/>
        <button class="btn btn-primary" @click.prevent="search">Search</button>
        <ul style="line-height:180%">
           <li v-for="album in albumName" :key="album.name">
             <a href="#">{{ album.name }}</a>
        </li>  
        </ul>
    </section>
    
    <section class="tracks">
         <div v-for="track in tracks" :key="track.track" class="track1">
          
          <p>{{ track.track.name }} : {{ track.track.artists[0].name }}</p>
          <button @click.prevent="deleteTrack()">delete</button>
          <button @click.prevent="addTrack()">add</button>
        </div>
    </section>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Tracks',

  data() {
    return {
      tracks: [],
      searchResults: {},
      artistID: {},
      albumName: [],
      playlistId: null,
      searchText: ''
    }
  },
  async created() {
    this.playlistId = this.$route.params.playlistId
    const spotifyAccessToken = sessionStorage.getItem('SPOTIFY_ACCESS_TOKEN')
    if (spotifyAccessToken) {
      const tracks = await axios.get(`https://api.spotify.com/v1/playlists/${this.playlistId}/tracks?market=US`, { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
      this.tracks = tracks.data.items
    }
    else {
      return this.$router.push('/')
    }
  },

  methods: {
    buttonClicked() {
      this.$router.push('/playlists');
    },
    deleteTrack(){
      axios.delete(`https://api.spotify.com/v1/playlists/${track.uri}/tracks?market=US`, { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
      return axios.get(`https://api.spotify.com/v1/playlists/${this.playlist_id}/tracks?market=US`, { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
    },
    async search() {
      const spotifyAccessToken = sessionStorage.getItem('SPOTIFY_ACCESS_TOKEN')
      const response =  await axios.get('https://api.spotify.com/v1/search?q=' + this.searchText + '&type=artist', { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
      this.artistID = response.data.artists.items[0].id
      const response2 =  await axios.get('https://api.spotify.com/v1/artists/' + this.artistID + '/albums', { headers: { Authorization: `Bearer ${spotifyAccessToken}` } } )
      this.albumName = response2.data.items
      
      /*
      for(album in response2.data.items){
        this.albumName = id;
      }
      */

      /*
[
  {
    "id": 0
  },
  {
    "id": 1
  }
]
      */
    }
  }

}
</script>

<style scoped>
*{
  font-family: "Poppins", sans-serif;
}
header {
  font-size: 2em;
  display: flex;
  padding: 1em 3em;
  height: 3em;
  color: rgb(133, 158, 109);
  font-weight: normal;
  color: transparent;
  -webkit-text-stroke: 2px rgb(133, 158, 109);
}
.track-data-container{
  background-color: black;


}

.tracks {
  display: grid;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 50%;

}

.search{
  width: 50%;
}

.track1 {
  display: block;
  top: 0px;
  position: relative;
  width: 600px;
  background-color: rgb(133, 158, 109);
  border-radius: 4px;
  padding: 20px 20px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;

  /*
  border: 4px solid rgb(44, 182, 3);
  text-align: center;
  flex: 0 1 30%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.5s;
  padding: 1rem;
  margin-bottom: 1rem;
  width: fit-content;
  */
}

.tracks .p {
  margin: 35px 0;
  font-size: 1.5em;
  line-height: 1.2em;
  position: absolute;
  color: darkgreen;
}

 .track1:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #cccccc;
    background-color: white;
  }

  .track1:before {
    content: "";
    position: absolute;
    z-index: -1;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-out;
  }
  .track1:hover:before {
    transform: scale(2.15);
  }
.track-data-label {
  font-size: 25px;
}

.search-container{
  padding-left: 800px;
}
#searchBar {
  background-position: 10px 12px;
  background-repeat: no-repeat; 
  width: 75%;
  font-size: 16px;
  padding: 12px 20px 12px 40px; 
  border: 1px solid #ddd; 
  margin-bottom: 12px;
}
#list{
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#list li a {
  border: 1px solid #ddd;
  margin-top: -1px;
  background-color: #f6f6f6;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  color: black;
  display: block
}


</style>