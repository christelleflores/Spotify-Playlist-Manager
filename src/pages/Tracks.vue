<template>
  <div class="track-data-container">
    <button @click.prevent="buttonClicked()">Go Back!</button>
    <header> 
      <h1>Spotify Playlist Manager</h1>
    </header> 
    <p class="track-data-label">Tracks:</p>
   
    <section class="search">
      <h3>Search and Add Tracks</h3>
        <input v-model="searchText" type="text" id="query" value="" class="form-control" placeholder="Search Artist Name"/>
        <button class="search-button" @click.prevent="search">Search</button>
        <ul id="list">
           <li v-for="album in albumName" :key="album.name">
             <a href="#">{{ album.name }} <button @click.prevent="addTrack()">add</button></a>
        </li>  
        </ul>
    </section>
    
    <section class="tracks">
      <h3>Delete Tracks</h3>
         <div v-for="track in tracks" :key="track.track" class="track1">
          <div class="track-content">
            <p>{{ track.track.name }} : {{ track.track.artists[0].name }}</p>
            <button @click.prevent="deleteTrack()">delete</button>
          </div>
         
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
  box-sizing: border-box;
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
h3{
  color: white;
  font-size: 30px;
  margin-left: 20px;
  color: transparent;
  -webkit-text-stroke: 1.2px rgb(133, 158, 109);
}

.tracks {
  flex-wrap: wrap;
  justify-content: space-between;
  width: 50%;

  border: 1px solid red;
}

.search{
  float: right;
  width: 50%;
  border: 1px solid red;
}

.track1 {
  display: block;
  top: 0px;
  position: relative;
  width: 500px;
  height: 50px;
  background-color: rgb(133, 158, 109);
  border-radius: 4px;
  padding: 20px 20px;
  margin: 12px;
  margin-left: 70px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}
.track-content p{
  font-size: 17px;
  position: absolute;
  margin-top: -9px;
  color: white;
}
.track-content button{
  margin-left: 400px;
  width: 65px;
  height: 25px;
	outline: none;
	border: none;
	border-radius: 3px;
	background: rgb(54, 65, 54);
	color: white;

	cursor: pointer;
	transition: 0.4s ease;
  position: absolute;
  justify-content: center;
  margin-top: -10px;
}
.track-content button:hover{
  background: rgb(133, 158, 109);
  color: black;
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
  width: 100%;
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