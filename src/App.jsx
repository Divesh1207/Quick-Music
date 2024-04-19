import { useContext, useEffect, useState } from "react";
import { MusicContext } from "./Context/Context";

import './App.css'
import NavBar from './Components/NavBar'
import Card from './Components/Card'
import { initializePlaylist } from './Components/InitializePlaylist'


function App() {
  const [music, setMusic] = useState([])
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("")
  const [token, setToken] = useState(null);


  const musicContext = useContext(MusicContext);
  const isLoading = musicContext.isLoading;
  const setIsLoading = musicContext.setIsLoading;
  const setLikedMusic = musicContext.setLikedMusic;
  const setpinnedMusic = musicContext.setPinnedMusic;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;


  const fetchMusic = async () => {
    //setMusic([])
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {


      const data = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await data.json();

      console.log(jsonData)
      setMusic(jsonData.tracks.items)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0);
      fetchMusic();
    }
  };

  useEffect(() => {
    initializePlaylist();

    // current client credentials will be deleted in few days
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
    setpinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")));
  }, [setIsLoading, setLikedMusic, setpinnedMusic]);

  useEffect(() => {
    fetchMusic()
  }, [])
  return (
    <>

      <NavBar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusic}
      />
      <div className=' grid grid-cols-2 gap-4 md:grid-cols-4 '>
        {music.map((element, index) => {

          return <Card key={element.id} element={element} />;

        })}
      </div>













    </>
  )
}


export default App
