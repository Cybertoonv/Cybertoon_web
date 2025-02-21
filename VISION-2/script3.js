// GLobal value
let currentSong=new Audio();
let currFolder;
let songs;
// function

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder=folder;
    // fetching out songs
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    //creating an element in which we push songs 
    let div=document.createElement('div')
    div.innerHTML=response;
    songs=[];
    console.log("songs")
    console.log("songs",songs)
    let as=div.getElementsByTagName("a")
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3"))
            songs.push(element.href)
    }
    
    //show all the songs in the playlist
    songul=document.querySelector(".songList").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
    // its to change from ncs to cs
    let arrowing=songs[0].split("/").slice(-2)[0]
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML+`
          <li class="info">
                <div class="song-info">
                    <div>${song.replaceAll("%20", " ").split(`/songs/${arrowing}/`)[1]}</div>
                    <div>Unknow</div>
                    <div class="playnow">
                        <span>playnow</span>            
                        <img class="invert" src="/play.svg" alt="">        
                    </div>
                </div>
            </li>
        `;
    }
    //Attach an event listener for each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(+e.querySelector(".song-info").firstElementChild.innerHTML.trim())
            playMusic(e.querySelector(".song-info").firstElementChild.innerHTML.trim())

        })
    })  
}
const playMusic = (track, pause = false) => {
    const audioPath = `http://127.0.0.1:3000${currFolder}/${track}`;
    console.log(`Attempting to play: ${audioPath}`); 
     // Ensure the correct path is used
    currentSong.src=`http://127.0.0.1:3000${currFolder}/`+ track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}
async function Display(folder){
    console.log(currFolder)
    let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
    let response = await a.json()
    Leftside.style.backgroundImage = `url("/songs/${folder}/cover.jpg")`;
    playlistTitle.innerHTML=response.title
    playlistAuthor=response.descriptions
    

}


async function main(){
    //getting the list of songs
    await getSongs("/songs/cs")
    playMusic(songs[0].split("/songs/cs/")[1],true)
    console.log("track",songs[0].split("/songs/cs/")[1])
 
     // Attach an event listener to play, next and previous
     play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    //adding an event listener for previous and next
    previous.addEventListener('click', () => {
        const currentFilename = currentSong.src.split("/").pop();
    
        // Find the index of the current song in the songs array
        const index = songs.findIndex(song => song.endsWith(currentFilename));
    
        // If we are at the first song, go to the last song
        if (index === 0) {
            playMusic(songs[songs.length - 1].split(`/songs/${currFolder}/`)[1]); // Play the last song
        } else if (index > 0) {
            // Play the previous song
            playMusic(songs[index - 1].split(`/songs/${currFolder}/`)[1]);
        }
    });
    
    // Next button
    next.addEventListener('click', () => {
        const currentFilename = currentSong.src.split("/").pop();
    
        // Find the index of the current song in the songs array
        const index = songs.findIndex(song => song.endsWith(currentFilename));
    
        // If we are at the last song, go to the first song
        if (index === songs.length - 1) {
            playMusic(songs[0].split(`/songs/${currFolder}/`)[1]); // Play the first song
        } else if (index >= 0) {
            // Play the next song
            playMusic(songs[index + 1].split(`/songs/${currFolder}/`)[1]);
        } else {
            console.log("Reached the last song or no valid song found.");
        }
    });
    
      // Listen for timeupdate event
      currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} : ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    }) 
       // Add an event to volume
     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume >0){
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })
    let currFolder = 'cs'; // Global variable to store the current folder
    document.addEventListener("DOMContentLoaded", async () => {
        // Fetch and play the default playlist (cs)
        await getSongs(`/songs/${currFolder}`);
    
        if (songs.length > 0) {
            playMusic(songs[0].split(`/songs/${currFolder}/`)[1], true); // Play the first song
        }
    });
    
    Array.from(document.getElementsByClassName("arrows")).forEach(e => {
        e.addEventListener('click', async item => {
            // Get the folder from the data attribute of the clicked arrow
            currFolder = item.target.dataset.folder;  // This will set the current folder to either 'cs' or 'ncs'
            const newFolder = `/songs/${currFolder}`;
            console.log(`Switching to folder: ${newFolder}`);
            
            // Fetch the new playlist
            await getSongs(newFolder);
            await Display(currFolder)

            
            // Play the first song in the new playlist
            if (songs.length > 0) {
                playMusic(songs[0].split(`/songs/${currFolder}/`)[1], true); // Make sure to use currFolder
            }
            console.log(`Playing from folder: ${newFolder}}`);
        });
        
    });



    
}
main()