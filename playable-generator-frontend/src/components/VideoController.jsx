import { useState } from "react";

function VideoController({ memoizedVideo, video, videoRef }) {
//   const [lastVideoTime, setLastVideoTime] = useState(0);

//   const updateVideoTimer = () => {
//     if (video && videoRef.current) {
//       const time = Math.floor(videoRef.current.currentTime * 1000) / 1000;
//       if (lastVideoTime != time) {
//         console.log(lastVideoTime, time);
//         setLastVideoTime(time);
//       }
//     }
//   };

//   updateVideoTimer();
//   setInterval(updateVideoTimer, 10);

  return (
    <div className="ContentArea">
      {memoizedVideo}
      {video && videoRef.current ? (
        <div
          className="row text-center"
          style={{ fontSize: "1.3rem", fontWeight: "bold" }}
        >
          {/* {lastVideoTime + " / " + videoRef.current.duration} */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default VideoController;
