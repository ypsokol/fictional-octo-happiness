import "./App.css";
import ReactImageCrop from "./components/ReactImageCrop";
import ReactAvatarEditorExample from "./components/ReactAvatarEditor";
import CanvasDrawing from "./components/CanvasDrawing";

function App() {
  return (
    <div className="App">
      <ReactImageCrop />
      <ReactAvatarEditorExample />
      <CanvasDrawing />
    </div>
  );
}

export default App;
