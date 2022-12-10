# Spotify Playlist Manager

## What is this project?
This application was built upon this existing project: https://github.com/a-r-t/Spotify-App-Example\
This project was created out of interest in utilizing the Spotify API and practicing my web development and design skills. The end-product goal of this project was to be a website in which the user may login to their Spotify account and navigate through their personal playlists as well as delete and add searched tracks.

## What are the core features?
The main features of functionality for this project was utilizing the Spotify API to login to a Spotify account and see every playlist with every track in each one. Creativity and design of the website were mainly  prioritized in the development of this project.

## How was this project made?
I used Vue and the [Spotify API](https://developer.spotify.com/documentation/web-api/).

## How to run this project?
I recommend opening this project up in Visual Studio Code.

Rename the `.env.sample` file to `.env`. 

There are three variables defined in the `.env` file that the app requires. The `REDIRECT_URI` variable is already provided for you.
The `CLIENT_ID` and `CLIENT_SECRET` variables need to come from an "application" that is registered to your Spotify account.
To get these values, go to Spotify's developer portal [here](https://developer.spotify.com/dashboard), login with your Spotify account credentials,
and then hit the `Create an App` button. The fields for "App name" and "App description" can be anything.
After the app has been created, click it and find the app's Client ID and Client Secret.
Copy those values and paste them into the `.env` file in the appropriate places.

Next, open up a terminal (such as the one that's built into Visual Studio Code), navigate to the root project folder, and run `npm run serve`.
Once the web app has finished building successfully, open up a web browser (such as Google Chrome) and go to the address `localhost:8080`.
If all went well, you will see this site's home page.

## How to use the website?
The home page of this site has a button that will allow you to login to Spotify.
From there, the app can now use your account's context to perform API requests.
The Playlists page shows an example of this by pulling all of the logged in user's playlist data.
There will be a button on each playlist card as you hover over them, which will take you to the Tracks page.
On this page, all the tracks from this specific playlist will be displayed as well as a search bar on the right side.
When you search for an artist and click on the search button, all albums of that artist will display in a list below.

## Spotify API Resources
The documentation for Spotify's API resources can be found [here](https://developer.spotify.com/documentation/web-api/reference/#/).
