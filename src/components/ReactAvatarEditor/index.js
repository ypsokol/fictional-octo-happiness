import { useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";

const cropDimensions = {
  width: 200,
  height: 200,
};

const ReactAvatarEditorExample = () => {
  const [img, setImg] = useState("");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState();
  const [borderRadius, setBorderRadius] = useState(1);

  const handleNewImage = (e) => {
    setImg(e.target.files[0]);
  };

  const handleScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handlePositionChange = (position) => {
    setPosition(position);
  };

  const handleRotate = (e) => {
    setRotate(e.target.value);
  };

  return (
    <div>
      <h2>React Avatar Editor</h2>
      <div>
        <ReactAvatarEditor
          scale={parseFloat(scale)}
          width={cropDimensions.width}
          height={cropDimensions.height}
          position={position}
          onPositionChange={handlePositionChange}
          rotate={parseFloat(rotate)}
          borderRadius={cropDimensions.width / (100 / borderRadius)}
          image={img}
          className="editor-canvas"
        />
      </div>
      <br />
      New File:
      <input name="newImage" type="file" onChange={handleNewImage} />
      <br />
      Zoom:
      <input
        name="scale"
        type="range"
        onChange={handleScale}
        min="1"
        max="2"
        step="0.01"
        value={scale}
      />
      Rotate:
      <input
        name="scale"
        type="range"
        onChange={handleRotate}
        value={rotate}
        min="1"
        max="2"
        step="0.01"
      />
    </div>
  );
};

export default ReactAvatarEditorExample;
