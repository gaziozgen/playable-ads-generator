import { useState, useMemo } from "react";

function Preview({ applyDataToNewFile, generatedFile }) {
  const [iframeRefreshCount, setIframeRefreshCount] = useState(0);

  const memoizedIframe = useMemo(
    () =>
      generatedFile ? (
        <iframe
          key={iframeRefreshCount}
          className="Iframe"
          src={URL.createObjectURL(generatedFile)}
        ></iframe>
      ) : (
        <div/>
      ),
    [iframeRefreshCount, generatedFile]
  );

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

  const fileSize = generatedFile.size / 1000000;
  const fileSizeValid = fileSize < 5 ? true : false;
  return (
    <div>
      <div className="row flex-container margin-top-s">
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
  );
}

export default Preview;
