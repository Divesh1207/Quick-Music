import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context/Context";

const LikedMusic = () => {
    const musicContext = useContext(MusicContext);
    const likedMusic = musicContext.likedMusic;
    const setlikedMusic = musicContext.setLikedMusic;


    useEffect(() => {
        window.scrollTo(0, 0);
        const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
        setlikedMusic(localLikedMusic);
    }, [setlikedMusic]);

    return (
        <div>
            <div className="container mx-auto">
                {likedMusic.length === 0 ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="text-center">
                            <h3 className="py-5 text-xl">You don't have any Liked music yet!</h3>
                            <i className="bi bi-emoji-frown text-4xl"></i>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {likedMusic.map((element) => (
                            <Card key={element.id} element={element} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}

export default LikedMusic;