<template>

  <div class="wrapper">
      <div class="outer">
        <!--<section class="playlists">-->
          <div v-for="(playlist, index) in playlists" :key="playlist.name" class="playlist" :style="`--delay:${index - 1};`">
            <div class="content">
                <div class="img"><img :src="playlist.images[0].url" alt="cover"></div>
                <div class="details">
                    <span class="name"><p>{{ playlist.name }}</p></span>
                    <p>{{ playlist.name }}</p>
                </div>  
            </div>
            <button @click.prevent="buttonClicked(playlist)">Click Me!</button> 
          </div>
       <!-- </section> -->
      </div>  
  </div>   
<!--
  <div class="playlist-data-container">
    <header> 
      <h1>Spotify Playlist Manager</h1>
        <p>Select which playlist you want to manage</p>
    </header> 
    <p class="playlist-data-label">Playlists:</p>
    <section class="playlists">
        <div v-for="playlist in playlists" :key="playlist.name" class="playlist1">
          <img :src="playlist.images[0].url" alt="cover" style="width:300px;height:300px;">
          <p>{{ playlist.name }}</p>
          <button @click.prevent="buttonClicked(playlist)">Click Me!</button>
        </div>
        
    </section>
    
  </div>
-->
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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
.wrapper{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #bea2e7 0%, #86b7e7 100%);
}
.wrapper .outer{
  display: flex;
  align-content: center;
  justify-content: center;
}
.wrapper .playlist{
  background: #fff;
  width: 800px;
  display: flex;
  align-items: center;
  padding: 100px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  justify-content: space-between;
  border-radius: 200px 40px 40px 200px;
  box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
  animation: animate 10s ease-in infinite;
  animation-delay: calc(3s * var(--delay));
}
.outer:hover .playlist{
  animation-play-state: paused;
}
.wrapper .playlist:last-child{
  animation-delay: calc(-3s * var(--delay));
}
@keyframes animate {
  0%{
    opacity: 0;
    transform: translateY(100%) scale(0.5);
  }
  5%, 20%{
    opacity: 0.4;
    transform: translateY(100%) scale(0.7);
  }
  25%, 40%{
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0%) scale(1);
  }
  45%, 60%{
    opacity: 0.4;
    transform: translateY(-100%) scale(0.7);
  }
  65%, 100%{
    opacity: 0;
    transform: translateY(-100%) scale(0.5);
  }
}
.playlist .content{
  display: flex;
  align-items: center;
}
.wrapper .playlist .img{
  height: 300px;
  width: 300px;
  position: absolute;
  left: -15px;
  background: #fff;
  border-radius: 70%;
  padding: 5px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}
.playlist .img img{
  height: 100%;
  width: 100%;
  border-radius: 70%;
  object-fit: cover;
}
.playlist .details{
  margin-left: 80px;
}
.details span{
  font-weight: 600;
  font-size: 25px;
}
.playlist button{
  text-decoration: none;
  padding: 7px 18px;
  border-radius: 25px;
  color: #fff;
  background: linear-gradient(to bottom, #bea2e7 0%, #86b7e7 100%);
  transition: all 0.3s ease;
}
.playlist button:hover{
  transform: scale(0.94);
}
/*
header {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: rgb(44, 182, 3);
  
}
.playlists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.playlist1 {
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
  border: 4px solid rgb(44, 182, 3);
}
.playlist1:hover {
  background-color: rgb(184, 212, 134);
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2);
}

.playlist-data-label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
}
*/
</style>