import { useCallback, useEffect, useRef, useState } from "react";

const COLORS = {
  blue: "blue",
  black: "black",
  red: "red",
};

const CanvasDrawing = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  const [color, setColor] = useState(COLORS.red);
  const [lineWidth, setLineWidth] = useState(5);

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.lineWidth = lineWidth;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const handleChangeColor = (color) => () => {
    setColor(color);
  };

  const handleChangeLineWidth = (e) => {
    setLineWidth(e.target.value);
  };

  return (
    <div>
      <h2>Canvas Drawing</h2>
      <div>
        <button
          onClick={handleChangeColor(COLORS.red)}
          style={{ background: COLORS.red }}
        >
          red
        </button>
        <button
          onClick={handleChangeColor(COLORS.blue)}
          style={{ background: COLORS.blue }}
        >
          blue
        </button>
        <button
          onClick={handleChangeColor(COLORS.black)}
          style={{ background: COLORS.black }}
        >
          black
        </button>
      </div>
      LineHeight:
      <input
        name="scale"
        type="range"
        onChange={handleChangeLineWidth}
        min="1"
        max="15"
        step="0.01"
        defaultValue={lineWidth}
      />
      <canvas ref={canvasRef} height={height} width={width} />
    </div>
  );
};

CanvasDrawing.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default CanvasDrawing;
