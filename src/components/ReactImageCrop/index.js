import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ASPECT = {
  landscape: 16 / 9,
  portrait: 9 / 16,
  square: 1,
  free: undefined,
};

const ReactImageCrop = () => {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(ASPECT.free);

  useEffect(() => {
    if (imgRef.current) {
      const { width = 30, height = 30 } = imgRef.current;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }, [aspect]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onAspectChange = (type) => () => {
    setAspect(type);
  };

  const onScale = (e) => {
    setScale(Number(e.target.value));
  };

  const onRotate = (e) => {
    setRotate(Number(e.target.value));
  };

  return (
    <div>
      <h2>React Crop Image</h2>
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        Scale:
        <input
          name="scale"
          type="range"
          value={scale}
          onChange={onScale}
          disabled={!imgSrc}
          min="1"
          max="5"
          step="0.01"
        />
        Rotate:
        <input
          name="rotate"
          type="range"
          value={rotate}
          onChange={onRotate}
          disabled={!imgSrc}
          min="1"
          max="360"
          step="0.01"
        />
        <div>
          <button onClick={onAspectChange(ASPECT.portrait)}>Portrait</button>
          <button onClick={onAspectChange(ASPECT.landscape)}>Landscape</button>
          <button onClick={onAspectChange(ASPECT.square)}>Square</button>
          <button onClick={onAspectChange(ASPECT.free)}>Free</button>
        </div>
      </div>

      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          />
        </ReactCrop>
      )}
    </div>
  );
};

export default ReactImageCrop;
