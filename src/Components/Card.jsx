import React, { useContext, useEffect } from "react";
import { MusicContext } from '../Context/Context';
import { TbPinnedFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
{/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                {filteredFoods.map((item, index) => (
                    <div
                        key={index}
                        className='border shadow-lg rounded-lg hover:scale-105 duration-300'
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className='w-full h-[200px] object-cover rounded-t-lg'
                        />
                        <div className='flex justify-between px-2 py-4'>
                            <p className='font-bold'>{item.name}</p>
                            <p>
                                <span className='bg-orange-500 text-white p-1 rounded-full'>
                                    {item.price}

                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div> */}



const Card = ({ element }) => {

    const musicContext = useContext(MusicContext);
    const likedMusic = musicContext.likedMusic;
    const setlikedMusic = musicContext.setLikedMusic;
    const pinnedMusic = musicContext.pinnedMusic;
    const setpinnedMusic = musicContext.setPinnedMusic;

    const handlePin = () => {
        let pinnedMusic = localStorage.getItem("pinnedMusic");
        pinnedMusic = JSON.parse(pinnedMusic);
        let updatedPinnedMusic = [];
        if (pinnedMusic.some((item) => item.id === element.id)) {
            updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
            setpinnedMusic(updatedPinnedMusic);
            localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
        } else {
            if (pinnedMusic.length >= 4) {
            }
            updatedPinnedMusic = pinnedMusic;
            updatedPinnedMusic.push(element);
            setpinnedMusic(updatedPinnedMusic);
            localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
        }
    };

    const handleLike = () => {
        let likedMusic = localStorage.getItem("likedMusic");
        likedMusic = JSON.parse(likedMusic);
        let updatedLikedMusic = [];
        if (likedMusic.some((item) => item.id === element.id)) {
            updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
            setlikedMusic(updatedLikedMusic);
            localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
        } else {
            updatedLikedMusic = likedMusic;
            updatedLikedMusic.push(element);
            setlikedMusic(updatedLikedMusic);
            localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
        }
    };



    return (
        <>


            {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center  "> */}

            <div className='   '>
                <div className='   '>
                    <img
                        className="w-full h-48 object-cover  mt-3 rounded-md"
                        src={element.album.images[0].url}
                        alt='/'
                    />
                    <div className=" flex">
                        {pinnedMusic.some((item) => item.id === element.id) ? (
                            <button
                                onClick={handlePin}

                            >
                                <div className="bg-gray-400 flex h-10 w-10 hover:bg-black text-white rounded-md p-3 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2">

                                    <TbPinnedFilled className="" />

                                </div>
                            </button>
                        ) : (
                            <button className="bg-gray-400 flex h-10 w-10 hover:bg-black text-white rounded-md p-3 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                                onClick={handlePin}

                            >
                                <TbPinnedFilled className="" />
                            </button>
                        )}
                        <div className=" flex">
                            {likedMusic.some((item) => item.id === element.id) ? (
                                <button
                                    onClick={handleLike}

                                >
                                    <div className="bg-gray-400 flex h-10 w-10 hover:bg-red-600 text-white rounded-md p-3 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2">

                                        <FaHeart className="" />

                                    </div>
                                </button>
                            ) : (
                                <button className="bg-gray-400 flex h-10 w-10 hover:bg-red-600 text-white rounded-md p-3 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    onClick={handleLike}

                                >
                                    <FaHeart className="" />
                                </button>
                            )}
                        </div>
                    </div>

                    <p className='className="text-xl font-semibold text-gray-800 mb-2'>{element.album.artists[0].name}</p>
                    <p className='className="text-xl font-semibold text-gray-800 mb-2'>   Release date: {element.album.release_date}</p>

                    <audio src={element.preview_url} controls className="w-full"></audio>
                </div>


            </div>

        </>
    )
}

export default Card
