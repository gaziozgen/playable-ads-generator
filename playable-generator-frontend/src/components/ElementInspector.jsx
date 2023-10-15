import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import ToggleInput from "./ToggleInput";

function ElementInspector({
  formatNumber,
  SortAndSetElements,
  selectedElementID,
  elements
}) {
  const selectedElement = elements.find(
    (element) => element.id == selectedElementID
  );

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

  return (
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
              editElement(formatNumber(selectedElement.opacity, e), "opacity")
            }
            inline={true}
          />
          {selectedElement.type == 0 ? (
            <>
              <ToggleInput
                name={"Navigate store"}
                value={selectedElement.navigateStore}
                onChange={(e) => editElement(e.target.value, "navigateStore", true)}
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
                onChange={(e) => editElement(e.target.value, "content")}
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
              <ColorInput
                name={"Color"}
                value={selectedElement.color}
                onChange={(e) => editElement(e.target.value, "color")}
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
                onChange={(e) => editElement(e.target.value, "content")}
                inline={true}
              />
              <TextInput
                name={"Width"}
                value={selectedElement.width}
                onChange={(e) =>
                  editElement(formatNumber(selectedElement.width, e), "width")
                }
                inline={true}
              />
              <TextInput
                name={"Height"}
                value={selectedElement.height}
                onChange={(e) =>
                  editElement(formatNumber(selectedElement.height, e), "height")
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
              <ColorInput
                name={"Color"}
                value={selectedElement.color}
                onChange={(e) => editElement(e.target.value, "color")}
                inline={true}
              />
              <ColorInput
                name={"Text color"}
                value={selectedElement.textColor}
                onChange={(e) => editElement(e.target.value, "textColor")}
                inline={true}
              />
              <ColorInput
                name={"Border color"}
                value={selectedElement.borderColor}
                onChange={(e) => editElement(e.target.value, "borderColor")}
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
                onChange={(e) => editElement(e.target.value, "stopTime", true)}
              />
              {selectedElement.stopTime ? (
                <ToggleInput
                  name={"Navigate store"}
                  value={selectedElement.navigateStore}
                  onChange={(e) => editElement(e.target.value, "navigateStore", true)}
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
  );
}

export default ElementInspector;
