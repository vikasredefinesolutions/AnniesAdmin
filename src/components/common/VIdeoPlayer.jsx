import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';

const VideoPlayer = ({ videoUrl, onErrorImage }) => {
    const [error, setError] = useState(false);
    const [SecondError, setSecondError] = useState(false);
    const [ImageError, setImageError] = useState(false);
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    const playerConfig = {
        youtube: {
            playerVars: {
                autoplay: 0,
                modestbranding: 1,
                controls: 1,
                showinfo: 0,
                loop: 0,
            },
        },
        vimeo: {
            playerOptions: {
                autoplay: false,
                controls: true,
                loop: false,
            },
        },
        file: {
            attributes: {
                controlsList: 'nodownload', // Prevent download option
            },
        },
    };

    const handleVideoError = () => {
        setError(true);
    };

    const handleError = () => {
        setSecondError(true);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div>
            {(!error && videoUrl) ? (
                <ReactPlayer
                    width="w-full"
                    height="h-full"
                    url={videoUrl}
                    // config={playerConfig}
                    playing={true} // Autoplay
                    muted={true} // Muted
                    controls={true} // Remove controls
                    loop={false} // Loop through
                    preload="auto" // Preload the video
                    onError={handleVideoError}
                />
            ) : ((!SecondError && !["jpeg", "jpg", "png", "gif"].includes(onErrorImage)) ? (
                <ReactPlayer
                    width="w-full"
                    height="h-full"
                    url={`${AdminAppConfigReducers["azure:BlobUrl"]}${onErrorImage}`}
                    // config={playerConfig}
                    playing={true} // Autoplay
                    muted={true} // Muted
                    controls={true} // Remove controls
                    loop={false} // Loop through
                    preload="auto" // Preload the video
                    onError={handleError}
                />
            ) : (!ImageError ? (
                <div className={`h-full w-full p-2 flex justify-center items-center`} >
                    <img src={`${AdminAppConfigReducers["azure:BlobUrl"]}${onErrorImage}`} alt={"not available"}
                        onError={handleImageError} />
                </div>
            ) : (
                <div className={`h-full w-full p-2 flex justify-center items-center bg-sky-400/10`} >
                    <img src={`/noImage.png`} alt={"No Image"} />
                </div>
            )))}
        </div >
    );
};

export default VideoPlayer;