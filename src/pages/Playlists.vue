<template>
<body>
  <section class="heading">
    <h1>Spotify Playlist Manager</h1>
  </section>
  <p>Select a playlist you wish to edit!!</p>
  <section class="wrapper">
    <div class="card-grid-space">
       <div v-for="playlist in playlists" :key="playlist.name" class="playlist">
          <div class="playlist-image">
            <img :src="playlist.images[0].url" alt="cover">
          </div>
          <div class="content">
            <h1>{{ playlist.name }}</h1>
            <p>{{ playlist.description }}</p>
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
          playlistId: playlist.id
        }
      });
    }
  }
}
</script>

<style scoped>

*{
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body{
  align-items: center;
  justify-content: center;
  background: black;
  
}
.heading{
  font-size: 2.5em;
  display: flex;
  padding: 1em 2.5em;
  margin-bottom: 80px;
  margin-left: 27px;
  height: 3em;
  font-weight: normal;
  color: transparent;
  -webkit-text-stroke: 2px rgb(133, 158, 109);

}
.wrapper{
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 4rem;
  padding: 4rem;
  margin: 0 auto;
  width: max-content;

}
.card-grid-space{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  
}
.playlist{
  width: 280px;
  height: 280px;
  border-radius: 15px;
  padding: 1.5rem;
  background: white;
  position: relative;
  display: flex;
  align-items: flex-end;
  transition: 0.4s ease-out;
  margin: 2em;
  box-shadow: 0px 0px 7px 7px rgba(133, 158, 109);
  overflow: hidden;
}

.playlist:hover{
  transform: translateY(20px);
}
.playlist:hover:before{
  opacity: 45%;
}
.playlist:hover .content {
  opacity: 1;
	transform: translateY(0px);
}

.playlist:before{
  content: "";
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	background: rgba(133, 158, 109);
	z-index: 2;
	transition: 0.5s;
	opacity: 0;
}

.playlist .playlist-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
  display: flex;
  border-radius: 15px;
}

.playlist .content{
  position: relative;
	z-index: 3;
	color: white;
	opacity: 0;
	transform: translateY(30px);
	transition: 0.5s;
  margin-bottom: 30px;
}
.playlist .content .h1{
  margin: 0px;
  font-size: 30px;
}
.playlist .content .p{
  letter-spacing: 1px;
  font-size: 15px;
  margin-top: 5px;
}

.playlist .content button{
  padding: 0.6rem;
	outline: none;
	border: none;
	border-radius: 3px;
	background: white;
	color: black;
	font-weight: bold;
	cursor: pointer;
	transition: 0.4s ease;
  position: absolute;
  justify-content: center;
}
.playlist .content button:hover{
  background: rgb(133, 158, 109);
  color: white;
}
/*
* {
  box-sizing: border-box;
  background-color: black;
  transition: all 0.3s ease-out;
  font-family: "Poppins", sans-serif;
}

.body {
  margin: 0;
  min-height: 100vh;
  background-color: rgb(133, 158, 109);
}

.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 4rem;
  padding: 4rem;
  margin: 0 auto;
  width: max-content;
}

.card-grid-space{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
}

.playlist {
  height: 20em;
  width: 20em;
  font-size: 1em;
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
  position: absolute;
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
  background: white;
  height: 50px;
  width: 50px;
  border-radius: 32px;
  transform: scale(0.5);
  transform-origin: 50% 50%;
  transition: transform 0.25s ease-out;

}
.playlist:hover:before {
  transform: scale(19);
}

.heading {
  font-size: 2.5em;
  display: flex;
  padding: 1em 2.5em;
  margin-bottom: 80px;
  margin-left: 27px;
  height: 3em;
  color: wheat;
  font-weight: normal;
  color: transparent;
  -webkit-text-stroke: 2px rgb(133, 158, 109);
}
*/
</style>