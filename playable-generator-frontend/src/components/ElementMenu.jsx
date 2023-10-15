import { useState } from "react";

function ElementMenu({
  setSelectedElementID,
  SortAndSetElements,
  setElements,
  elements,
}) {
  const [nextElementID, setNextElementID] = useState(0);

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
      element.color = "#FFFFFF";
    }
    if (type == 2) {
      element.name = "Button";
      element.stopTime = false;
      element.navigateStore = false;
      element.content = "MyButton";
      element.width = 60;
      element.height = 30;
      element.fontSize = 8;
      element.color = "#DF910C";
      element.textColor = "#FFFFFF";
      element.borderColor = "#FFFFFF";
      element.borderRadius = 5;
      element.borderWidth = 2;
    }
    setSelectedElementID(nextElementID);
    setNextElementID(nextElementID + 1);
    SortAndSetElements(elements.concat(element));
  };

  const selectElement = (id) => {
    setSelectedElementID(id);
  };

  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  return (
    <div>
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
  );
}

export default ElementMenu;
