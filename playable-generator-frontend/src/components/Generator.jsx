import { useState, useEffect, useRef, useMemo } from "react";
import defaultFile from "../assets/default.txt";
import "../css/Generator.css";
import hand1 from "../assets/hands/hand.png";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import ToggleInput from "./ToggleInput";

const Generator = ({}) => {
  const [state, setState] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const videoRef = useRef(null);

  const [appName, setAppName] = useState("My Gentlemen's Club");
  const [defaultTarget, setDefaultTarget] = useState(
    "https://play.google.com/store/apps/details?id=com.voyager.mygentlemanclub"
  );
  const [androidTarget, setAndroidTarget] = useState(
    "https://play.google.com/store/apps/details?id=com.voyager.mygentlemanclub"
  );
  const [iosTarget, setIosTarget] = useState(
    "https://apps.apple.com/ae/app/my-gentlemens-club/id6451375423"
  );
  const [video, setVideo] = useState();
  const [icon, setIcon] = useState();

  const [iframeRefreshCount, setIframeRefreshCount] = useState(0);
  const [generatedFile, setGeneratedFile] = useState();
  const [endPoint, setEndPoint] = useState(-1);
  const [topBannerActive, setTopBannerActive] = useState(false);
  const [topBannerText, setTopBannerText] = useState("");
  const [useSmartLink, setUseSmartLink] = useState(false);
  const [useBackgroundSound, setUseBackgroundSound] = useState(false);
  const [backgroundSoundVolume, setBackgroundSoundVolume] = useState(1);
  const [backgroundSound, setBackgroundSound] = useState();
  const [blurActive, setBlurActive] = useState(true);
  const [navigateStoreUnlockTime, setNavigateStoreUnlockTime] = useState(0);

  const [elements, setElements] = useState([]);
  const [selectedElementID, setSelectedElementID] = useState(null);
  const [nextElementID, setNextElementID] = useState(0);
  const selectedElement = elements.find(
    (element) => element.id == selectedElementID
  );

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

  const memoizedIframe = useMemo(
    () =>
      generatedFile ? (
        <iframe
          key={iframeRefreshCount}
          className="Iframe"
          src={URL.createObjectURL(generatedFile)}
        ></iframe>
      ) : (
        <div></div>
      ),
    [iframeRefreshCount, generatedFile]
  );

  const handleAppNameChange = (event) => setAppName(event.target.value);
  const handleDefaultTargetChange = (event) =>
    setDefaultTarget(event.target.value);
  const handleAndroidTargetChange = (event) =>
    setAndroidTarget(event.target.value);
  const handleIosTargetChange = (event) => setIosTarget(event.target.value);
  const handleEndPointChange = (event) =>
    setEndPoint(formatNumber(endPoint, event));
  const handleUseSmartLinkChange = () => setUseSmartLink(!useSmartLink);
  const handleTopBannerActiveChange = () =>
    setTopBannerActive(!topBannerActive);
  const handleTopBannerTextChange = (event) =>
    setTopBannerText(event.target.value);
  const handleUseBgSoundChange = () =>
    setUseBackgroundSound(!useBackgroundSound);
  const handleBgSoundVolumeChange = (event) =>
    setBackgroundSoundVolume(formatNumber(backgroundSoundVolume, event));
  const handleBlurActiveChange = () => setBlurActive(!blurActive);
  const handleNavigateStoreUnlockTimeChange = (event) =>
    setNavigateStoreUnlockTime(formatNumber(navigateStoreUnlockTime, event));

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIcon(file);
  };

  const handleBgSoundChange = (e) => {
    const file = e.target.files[0];
    setBackgroundSound(file);
  };

  const formatNumber = (before, event) => {
    const newValue = event.target.value;
    if (isNaN(newValue) && newValue != "-") return before;
    return newValue;
  };

  const addElement = (type) => {
    let element = {
      type,
      id: nextElementID,
      time: 0,
      layer: 0,
      posX: 50,
      posY: 50,
      size: 1,
      opacity: 1,
    };
    if (type == 0) {
      element.name = "Hand";
      element.navigateStore = false;
    }
    if (type == 1) {
      element.name = "Text";
      element.content = "Content";
      element.endTime = 99;
      element.color = "white";
    }
    if (type == 2) {
      element.name = "Button";
      element.stopTime = false;
      element.navigateStore = false;
      element.content = "MyButton";
      element.width = 60;
      element.height = 30;
      element.fontSize = 8;
      element.color = "orange";
      element.textColor = "white";
      element.borderColor = "white";
      element.borderRadius = 5;
      element.borderWidth = 2;
    }
    setSelectedElementID(nextElementID);
    setNextElementID(nextElementID + 1);
    SortAndSetElements(elements.concat(element));
  };

  const SortAndSetElements = (newElements) => {
    setElements(newElements.sort((a, b) => a.time - b.time));
  };

  const selectElement = (id) => {
    setSelectedElementID(id);
  };

  const editElement = (newValue, field, toggle = false) => {
    const updatedElement = {
      ...selectedElement,
    };
    if (!toggle) updatedElement[field] = newValue;
    else updatedElement[field] = !updatedElement[field];
    SortAndSetElements(
      elements.map((element) =>
        element.id === updatedElement.id ? updatedElement : element
      )
    );
  };

  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const refresh = () => {
    setIframeRefreshCount(iframeRefreshCount + 1);
  };

  const download = () => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(generatedFile);
    element.download = "playable.html";
    document.body.appendChild(element);
    element.click();
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
    const fileSize = generatedFile.size / 1000000;
    const fileSizeValid = fileSize < 5 ? true : false;
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
                  onChange={handleAndroidTargetChange}
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
          <div className="ContentArea">
            {selectedElement != null ? (
              <div className="margin-top-m">
                <TextInput
                  name={"Time"}
                  value={selectedElement.time}
                  onChange={(e) =>
                    editElement(formatNumber(selectedElement.time, e), "time")
                  }
                  inline={true}
                />
                <TextInput
                  name={"Pos X"}
                  value={selectedElement.posX}
                  onChange={(e) =>
                    editElement(formatNumber(selectedElement.posX, e), "posX")
                  }
                  inline={true}
                />
                <TextInput
                  name={"Pos Y"}
                  value={selectedElement.posY}
                  onChange={(e) =>
                    editElement(formatNumber(selectedElement.posY, e), "posY")
                  }
                  inline={true}
                />
                <TextInput
                  name={"Layer"}
                  value={selectedElement.layer}
                  onChange={(e) =>
                    editElement(formatNumber(selectedElement.layer, e), "layer")
                  }
                  inline={true}
                />
                <TextInput
                  name={"Size"}
                  value={selectedElement.size}
                  onChange={(e) =>
                    editElement(formatNumber(selectedElement.size, e), "size")
                  }
                  inline={true}
                />
                <TextInput
                  name={"Opacity"}
                  value={selectedElement.opacity}
                  onChange={(e) =>
                    editElement(
                      formatNumber(selectedElement.opacity, e),
                      "opacity"
                    )
                  }
                  inline={true}
                />
                {selectedElement.type == 0 ? (
                  <>
                    <ToggleInput
                      name={"Navigate store"}
                      value={selectedElement.navigateStore}
                      onChange={(e) => editElement(e, "navigateStore", true)}
                    />
                  </>
                ) : (
                  <div />
                )}
                {selectedElement.type == 1 ? (
                  <>
                    <TextInput
                      name={"Content"}
                      value={selectedElement.content}
                      onChange={(e) => editElement(e, "content")}
                      inline={true}
                    />
                    <TextInput
                      name={"End time"}
                      value={selectedElement.endTime}
                      onChange={(e) =>
                        editElement(
                          formatNumber(selectedElement.endTime, e),
                          "endTime"
                        )
                      }
                      inline={true}
                    />
                    <TextInput
                      name={"Color"}
                      value={selectedElement.color}
                      onChange={(e) => editElement(e, "color")}
                      inline={true}
                    />
                  </>
                ) : (
                  <div />
                )}
                {selectedElement.type == 2 ? (
                  <>
                    <TextInput
                      name={"Content"}
                      value={selectedElement.content}
                      onChange={(e) => editElement(e, "content")}
                      inline={true}
                    />
                    <TextInput
                      name={"Width"}
                      value={selectedElement.width}
                      onChange={(e) =>
                        editElement(
                          formatNumber(selectedElement.width, e),
                          "width"
                        )
                      }
                      inline={true}
                    />
                    <TextInput
                      name={"Height"}
                      value={selectedElement.height}
                      onChange={(e) =>
                        editElement(
                          formatNumber(selectedElement.height, e),
                          "height"
                        )
                      }
                      inline={true}
                    />
                    <TextInput
                      name={"Font size"}
                      value={selectedElement.fontSize}
                      onChange={(e) =>
                        editElement(
                          formatNumber(selectedElement.fontSize, e),
                          "fontSize"
                        )
                      }
                      inline={true}
                    />
                    <TextInput
                      name={"Color"}
                      value={selectedElement.color}
                      onChange={(e) => editElement(e, "color")}
                      inline={true}
                    />
                    <TextInput
                      name={"Text color"}
                      value={selectedElement.textColor}
                      onChange={(e) => editElement(e, "textColor")}
                      inline={true}
                    />
                    <TextInput
                      name={"Border color"}
                      value={selectedElement.borderColor}
                      onChange={(e) => editElement(e, "borderColor")}
                      inline={true}
                    />
                    <TextInput
                      name={"Border radius"}
                      value={selectedElement.borderRadius}
                      onChange={(e) =>
                        editElement(
                          formatNumber(selectedElement.borderRadius, e),
                          "borderRadius"
                        )
                      }
                      inline={true}
                    />
                    <TextInput
                      name={"Border width"}
                      value={selectedElement.borderWidth}
                      onChange={(e) =>
                        editElement(
                          formatNumber(selectedElement.borderWidth, e),
                          "borderWidth"
                        )
                      }
                      inline={true}
                    />
                    <ToggleInput
                      name={"Stop time"}
                      value={selectedElement.stopTime}
                      onChange={(e) => editElement(e, "stopTime", true)}
                    />
                    {selectedElement.stopTime ? (
                      <ToggleInput
                        name={"Navigate store"}
                        value={selectedElement.navigateStore}
                        onChange={(e) => editElement(e, "navigateStore", true)}
                      />
                    ) : (
                      <div />
                    )}
                  </>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="columnIn4">
          <div className="ContentArea">
            {memoizedVideo}
            {video && videoRef.current ? (
              <div
                className="row text-center"
                style={{ fontSize: "1.3rem", fontWeight: "bold" }}
              >
                {videoRef.current.currentTime +
                  " / " +
                  videoRef.current.duration}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {elements.map((element, n) => {
            return (
              <div className="Element" key={n}>
                {element.time + " " + element.name}
                <button
                  className="ElementButton"
                  onClick={() => removeElement(element.id)}
                >
                  Delete
                </button>
                <button
                  className="ElementButton"
                  onClick={() => selectElement(element.id)}
                >
                  Edit
                </button>
              </div>
            );
          })}
          <div className="row flex-container">
            <button
              className="MiniButton"
              style={{ fontSize: "1.3rem" }}
              onClick={() => addElement(0)}
            >
              Add
              <br />
              Hand
            </button>
            <button
              className="MiniButton"
              style={{ fontSize: "1.3rem" }}
              onClick={() => addElement(1)}
            >
              Add
              <br />
              Text
            </button>
            <button
              className="MiniButton"
              style={{ fontSize: "1.3rem" }}
              onClick={() => addElement(2)}
            >
              Add
              <br />
              Button
            </button>
          </div>
        </div>
        <div className="columnIn4">
          <div className="row flex-container margin-top-m">
            <button
              className="MiniButton"
              style={{
                backgroundColor: !fileSizeValid ? "red" : "green",
                fontSize: "1.3rem",
              }}
              onClick={() => {}}
            >
              {fileSize.toString().substring(0, 5)}
              <br />
              MB
            </button>
            <button className="MiniButton" onClick={() => refresh()}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
            <button className="MiniButton" onClick={() => download()}>
              <i className="fa-solid fa-download"></i>
            </button>
          </div>
          <div className="row text-center">
            <button className="SubmitButton" onClick={applyDataToNewFile}>
              Apply
            </button>
          </div>
          <div className="row">
            <div className="mobile-phone">
              <div className="brove">
                <span className="speaker"></span>
              </div>
              {memoizedIframe}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Generator;
