



import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../Context/Context";
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6";
import { TbPinnedFilled } from "react-icons/tb";
import { MdOutlineQueueMusic } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import LikedMusic from './LikedMusic';

import PinnedMusic from "./PinnedMusic";


const NavBar = ({ keyword, setKeyword, handleKeyPress, fetchMusicData }) => {
    const musicContext = useContext(MusicContext);
    const likeMusic = musicContext.likedMusic;
    const pinnMusic = musicContext.pinnedMusic;
    const setResultOffset = musicContext.setResultOffset;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const liketoggleModal = () => {
        setIsLikeModalOpen(!isLikeModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const likecloseModal = () => {
        setIsLikeModalOpen(false);
    };

    console.log(pinnMusic)
    return (
        <>
            {/* main container m flex lagynge to iske and jitne bhi div  hai wo sbhi flex propeerty m set ho jaynge */}
            <div className="bg-black mb-4 w-auto flex-row max-w-screen-5xl md:py-4 md:flex justify-between navbar navbar-dark navbar-expand-lg bg-dark sticky-top">

                <div className="flex justify-between items-center gap-3">
                    -
                    {/* {Music button} */}

                    <div className="   hover:bg-black text-white   transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <Link to="/">
                            <MdOutlineQueueMusic className="h-6 w-6 md:h-18  " />
                        </Link>
                    </div>
                    <div>
                        {/* {head} */}
                        <Link to="/">
                            <span className="text-white text-sm md:text-xl   ">v music</span>

                        </Link>
                    </div>



                    {/* {Liked Music} */}
                    <div className="bg-gray-400  flex hover:bg-red-600 text-white rounded-md p-2 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={liketoggleModal}
                    >
                        <Link to="/">
                            <FaHeart className="" />
                        </Link>
                        {likeMusic.length}
                    </div>

                    {/* ... */}

                    {isLikeModalOpen && (
                        <div
                            id="pinned-music-modal"
                            className="fixed z-10 inset-0 overflow-y-auto"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-center min-h-screen">
                                <div
                                    className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xl sm:w-full"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-title"
                                >
                                    <div className="bg-gray-50 flex px-4 py-3 border-b rounded-t-lg">
                                        <h3 className="text-lg font-semibold" id="modal-title">
                                            Liked Music
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                            onClick={likecloseModal}
                                        >
                                            <IoClose
                                                className="w-15 h-15 text-3xl text-black"
                                                aria-label="Close"
                                            />
                                        </button>
                                    </div>
                                    <div className="px-6 py-6">
                                        <LikedMusic />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* {Pinned Music} */}

                    <div
                        className="bg-gray-400  h-9 w-10 flex   hover:bg-black text-white rounded-md p-3 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={toggleModal}
                    >
                        <Link to="/">
                            <TbPinnedFilled className="" />
                        </Link>
                        {pinnMusic.length}
                    </div>

                    {/* ... */}

                    {isModalOpen && (
                        <div
                            id="pinned-music-modal"
                            className="fixed z-10 inset-0 overflow-y-auto"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-center min-h-screen">
                                <div
                                    className="bg-white  rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-xl sm:w-full"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-title"
                                >

                                    <div className="bg-gray-50 flex px-4 py-3 border-b rounded-t-lg">
                                        <h3 className="text-lg font-semibold" id="modal-title">
                                            Pinned Music
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                            onClick={closeModal}
                                        >
                                            <IoClose
                                                className="w-15 h-15 text-3xl text-black"
                                                aria-label="Close"
                                            />
                                        </button>
                                    </div>
                                    <div className="px-6 py-6">
                                        <PinnedMusic />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                <div className="flex gap-3">
                    {/* {search bar} */}
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyPress}
                        type="text"
                        placeholder="Search any thing"
                        className=" flex pt-4 sm:w-[100px] md:w-[800px] text-justify   rounded-md border align-text-top  border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />



                    <button
                        onClick={() => {
                            setResultOffset(0);
                            fetchMusicData();
                        }}
                        type="submit"
                        className="bg-blue-600   hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Search
                    </button>


                </div>
            </div>

        </>
    );
};

export default NavBar;



