import { useState, useEffect, useRef, useMemo } from "react";
import defaultFile from "../assets/default.txt";
import "../css/Generator.css";
import hand1 from "../assets/hands/hand.png";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";
import FileInput from "./FileInput";
import Preview from "./Preview";
import VideoController from "./VideoController";
import ElementInspector from "./ElementInspector";
import ElementMenu from "./ElementMenu";

const Generator = ({}) => {
  const [generatedFile, setGeneratedFile] = useState();
  const [state, setState] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const videoRef = useRef(null);

  const [appName, setAppName] = useState("My Gentlemen's Club");
  const handleAppNameChange = (event) => setAppName(event.target.value);

  const [defaultTarget, setDefaultTarget] = useState(
    "https://play.google.com/store/apps/details?id=com.voyager.mygentlemanclub"
  );
  const handleDefaultTargetChange = (event) =>
    setDefaultTarget(event.target.value);

  const [video, setVideo] = useState();
  const handleVideoChange = (e) => setVideo(e.target.files[0]);

  const [icon, setIcon] = useState();
  const handleIconChange = (e) => setIcon(e.target.files[0]);

  const [endPoint, setEndPoint] = useState(-1);
  const handleEndPointChange = (event) =>
    setEndPoint(formatNumber(endPoint, event));

  const [navigateStoreUnlockTime, setNavigateStoreUnlockTime] = useState(0);
  const handleNavigateStoreUnlockTimeChange = (event) =>
    setNavigateStoreUnlockTime(formatNumber(navigateStoreUnlockTime, event));

  const [useSmartLink, setUseSmartLink] = useState(false);
  const handleUseSmartLinkChange = () => setUseSmartLink(!useSmartLink);

  const [androidTarget, setAndroidTarget] = useState(
    "https://play.google.com/store/apps/details?id=com.voyager.mygentlemanclub"
  );
  const handleAndTargetChange = (event) => setAndroidTarget(event.target.value);

  const [iosTarget, setIosTarget] = useState(
    "https://apps.apple.com/ae/app/my-gentlemens-club/id6451375423"
  );
  const handleIosTargetChange = (event) => setIosTarget(event.target.value);

  const [topBannerActive, setTopBannerActive] = useState(false);
  const handleTopBannerActiveChange = () =>
    setTopBannerActive(!topBannerActive);

  const [topBannerText, setTopBannerText] = useState("");
  const handleTopBannerTextChange = (event) =>
    setTopBannerText(event.target.value);

  const [useBackgroundSound, setUseBackgroundSound] = useState(false);
  const handleUseBgSoundChange = () =>
    setUseBackgroundSound(!useBackgroundSound);

  const [backgroundSound, setBackgroundSound] = useState();
  const handleBgSoundChange = (e) => setBackgroundSound(e.target.files[0]);

  const [backgroundSoundVolume, setBackgroundSoundVolume] = useState(1);
  const handleBgSoundVolumeChange = (event) =>
    setBackgroundSoundVolume(formatNumber(backgroundSoundVolume, event));

  const [blurActive, setBlurActive] = useState(true);
  const handleBlurActiveChange = () => setBlurActive(!blurActive);

  const [elements, setElements] = useState([]);
  const [selectedElementID, setSelectedElementID] = useState(null); // alınacak


  const memoizedVideo = useMemo(
    () =>
      video ? (
        <video
          ref={videoRef}
          className="Source"
          src={URL.createObjectURL(video)}
          alt="Game Video"
          type="video/mp4"
          controls
        ></video>
      ) : (
        <div></div>
      ),
    [video]
  );

  const formatNumber = (before, event) => {
    const newValue = event.target.value;
    if (isNaN(newValue) && newValue != "-") return before;
    return newValue;
  };

  const SortAndSetElements = (newElements) => {
    setElements(newElements.sort((a, b) => a.time - b.time));
  };

  const loadXHR = (url) => {
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onerror = function () {
          reject("Network error.");
        };
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject("Loading error:" + xhr.statusText);
          }
        };
        xhr.send();
      } catch (err) {
        reject(err.message);
      }
    });
  };

  const fileReader = async (file, name) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        return resolve({
          data: fileReader.result,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      };
      fileReader.onerror = () => console.error(name + " reading error!!");
      fileReader.readAsDataURL(file);
    });
  };

  const finalizeFile = (mainText, aspectRatio) => {
    mainText = mainText.replace("?App Name", appName);
    mainText = mainText.replace("https://www.google.com/", defaultTarget);

    mainText = mainText.replace(
      "useSmartLink = false",
      "useSmartLink = " + useSmartLink
    );

    if (useSmartLink) {
      mainText = mainText.replace(
        'andTarget = ""',
        'andTarget = "' + androidTarget + '"'
      );

      mainText = mainText.replace(
        'iosTarget = ""',
        'iosTarget = "' + iosTarget + '"'
      );
    }

    for (var i = 0; i < 3; i++)
      mainText = mainText.replace("9 / 16", aspectRatio.toString());

    if (!isNaN(endPoint) && endPoint != "")
      mainText = mainText.replace("endPoint = -1", "endPoint = " + endPoint);

    mainText = mainText.replace(
      "topBannerActive = false",
      "topBannerActive = " + topBannerActive
    );
    if (topBannerActive)
      mainText = mainText.replace("?Top Banner Content", topBannerText);

    mainText = mainText.replace(
      "blurBackground = true",
      "blurBackground = " + blurActive
    );

    mainText = mainText.replace(
      "navigateStoreUnlockTime = 0",
      "navigateStoreUnlockTime = " + navigateStoreUnlockTime
    );

    if (useBackgroundSound) {
      mainText = mainText.replace(
        "useBackgroundSound = false",
        "useBackgroundSound = " + useBackgroundSound
      );

      mainText = mainText.replace(
        "backgroundSoundVolume = 1",
        "backgroundSoundVolume = " + backgroundSoundVolume
      );
    }

    let elementsData = "";
    for (let i = 0; i < elements.length; i++) {
      elementsData += "{";
      elementsData += "type:" + elements[i].type + ",";
      elementsData += "time:" + elements[i].time + ",";
      elementsData += "zIndex:" + elements[i].layer + ",";
      elementsData += "posX:" + elements[i].posX + ",";
      elementsData += "posY:" + elements[i].posY + ",";
      elementsData += "size:" + elements[i].size + ",";
      elementsData += "opacity:" + elements[i].opacity + ",";

      if (elements[i].type == 0) {
        elementsData += "navigateStore:" + elements[i].navigateStore + ",";
      } else if (elements[i].type == 1) {
        elementsData += 'content:"' + elements[i].content + '",';
        elementsData += "endTime:" + elements[i].endTime + ",";
        elementsData += 'color:"' + elements[i].color + '",';
      } else if (elements[i].type == 2) {
        elementsData += 'content:"' + elements[i].content + '",';
        elementsData += "stopTime:" + elements[i].stopTime + ",";
        elementsData += "navigateStore:" + elements[i].navigateStore + ",";
        elementsData += "width:" + elements[i].width + ",";
        elementsData += "height:" + elements[i].height + ",";
        elementsData += "fontSize:" + elements[i].fontSize + ",";
        elementsData += 'color:"' + elements[i].color + '",';
        elementsData += 'textColor:"' + elements[i].textColor + '",';
        elementsData += 'borderColor:"' + elements[i].borderColor + '",';
        elementsData += "borderRadius:" + elements[i].borderRadius + ",";
        elementsData += "borderWidth:" + elements[i].borderWidth + ",";
      }

      elementsData += "}, ";
    }

    mainText = mainText.replace(
      "elements = []",
      "elements = [" + elementsData + "]"
    );

    const file = new Blob([mainText], { type: "text/html" });
    setGeneratedFile(file);

    setIsBusy(false);
    if (state == 0) setState(1);
  };

  const applyDataToNewFile = async (event) => {
    event.preventDefault();
    //if (!(appName && targetLink && video && icon)) return;
    const aspectRatio =
      videoRef.current.videoWidth / videoRef.current.videoHeight;
    setIsBusy(true);

    let mainText = await fetch(defaultFile)
      .then((response) => response.text())
      .catch((error) => console.error(error));

    const videoData = await fileReader(video, "video");
    mainText = mainText.replace("./video.mp4", videoData.data);

    const iconData = await fileReader(icon, "icon");
    mainText = mainText.replace("./icon.png", iconData.data);

    const handBlob = await loadXHR(hand1);
    const handData = await fileReader(handBlob, "hand");
    mainText = mainText.replace("./hand.png", handData.data);

    if (useBackgroundSound) {
      const bgSound = await fileReader(backgroundSound, "background sound");
      mainText = mainText.replace("./sound.mp3", bgSound.data);
    }
    finalizeFile(mainText, aspectRatio);
  };

  if (isBusy)
    return (
      <div className="text-center">
        <div className="loadingio-spinner-rolling-rtenlrje9ai">
          <div className="ldio-8iero9qgpj3">
            <div></div>
          </div>
        </div>
      </div>
    );
  if (state == 0)
    return (
      <>
        <div className="Header">Playable Ad Generator</div>
        <form onSubmit={applyDataToNewFile} className="MiniContainer">
          <div className="ContentArea">
            <TextInput
              name={"App name"}
              value={appName}
              onChange={handleAppNameChange}
              req={true}
            />

            <TextInput
              name={"Default link"}
              value={defaultTarget}
              onChange={handleDefaultTargetChange}
              req={true}
            />

            <FileInput
              name={"Video"}
              accept={"video/mp4"}
              onChange={handleVideoChange}
              req={true}
            />
            <div className="SourceContainer">{memoizedVideo}</div>

            <FileInput
              name={"Icon"}
              accept={"image/png"}
              onChange={handleIconChange}
              req={true}
            />
            {icon ? (
              <div className="SourceContainer">
                <img
                  className="Source"
                  src={URL.createObjectURL(icon)}
                  alt="Game Icon"
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="row text-center margin-top-l">
            <button className="SubmitButton" type="submit">
              Setup
            </button>
          </div>
        </form>
      </>
    );
  else if (state == 1) {
    return (
      <div className="row">
        <div className="columnIn4">
          <div className="ContentArea">
            <TextInput
              name={"App name"}
              value={appName}
              onChange={handleAppNameChange}
            />
            <TextInput
              name={"Default link"}
              value={defaultTarget}
              onChange={handleDefaultTargetChange}
            />
            <FileInput
              name={"Video"}
              value={video}
              accept={"video/mp4"}
              onChange={handleVideoChange}
            />
            <FileInput
              name={"Icon"}
              value={icon}
              accept={"image/png"}
              onChange={handleIconChange}
            />
            <TextInput
              name={"End point"}
              value={endPoint}
              onChange={handleEndPointChange}
            />
            <TextInput
              name={"Navigate store unlock time"}
              value={navigateStoreUnlockTime}
              onChange={handleNavigateStoreUnlockTimeChange}
            />
            <ToggleInput
              name={"Use smart link"}
              value={useSmartLink}
              onChange={handleUseSmartLinkChange}
            />
            {useSmartLink ? (
              <>
                <TextInput
                  name={"Android target"}
                  value={androidTarget}
                  onChange={handleAndTargetChange}
                />
                <TextInput
                  name={"IOS target"}
                  value={iosTarget}
                  onChange={handleIosTargetChange}
                />
              </>
            ) : (
              <div />
            )}
            <ToggleInput
              name={"Top banner active"}
              value={topBannerActive}
              onChange={handleTopBannerActiveChange}
            />
            {topBannerActive ? (
              <TextInput
                name={"Top banner content"}
                value={topBannerText}
                onChange={handleTopBannerTextChange}
              />
            ) : (
              <div />
            )}
            <ToggleInput
              name={"Use background sound"}
              value={useBackgroundSound}
              onChange={handleUseBgSoundChange}
            />
            {useBackgroundSound ? (
              <>
                <FileInput
                  name={"Sound"}
                  value={backgroundSound}
                  accept={"audio/mpeg"}
                  onChange={handleBgSoundChange}
                />
                <TextInput
                  name={"Bg sound volume (0-1)"}
                  value={backgroundSoundVolume}
                  onChange={handleBgSoundVolumeChange}
                />
              </>
            ) : (
              <div />
            )}
            <ToggleInput
              name={"Blur active"}
              value={blurActive}
              onChange={handleBlurActiveChange}
            />
          </div>
        </div>
        <div className="columnIn4">
          <ElementInspector
            formatNumber={formatNumber}
            selectedElementID={selectedElementID}
            elements={elements}
            SortAndSetElements={SortAndSetElements}
          />
        </div>
        <div className="columnIn4">
          <VideoController
            memoizedVideo={memoizedVideo}
            video={video}
            videoRef={videoRef}
          />
          <ElementMenu
            SortAndSetElements={SortAndSetElements}
            setSelectedElementID={setSelectedElementID}
            setElements={setElements}
            elements={elements}
          />
        </div>
        <div className="columnIn4">
          <Preview
            generatedFile={generatedFile}
            applyDataToNewFile={applyDataToNewFile}
          />
        </div>
      </div>
    );
  }
};

export default Generator;
