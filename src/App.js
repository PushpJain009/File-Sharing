import "./App.css";
import { useRef, useState, useEffect } from "react";
import { uploadFile } from "./services/api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const fileInputRef = useRef();
  const linkRef = useRef(null);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const onRemoveClick = () => {
    setFile(null);
    setResult("");
  };

  const onCopyClick = () => {
    if (linkRef.current) {
      linkRef.current.innerText = result;
      navigator.clipboard.writeText(linkRef.current.innerText).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const gifUrl =
    "https://cdn.dribbble.com/users/1243527/screenshots/4928430/media/85718657ddad161e45737b7d4c696800.gif";

  useEffect(() => {
    const getFile = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getFile();
  }, [file]);

  return (
    <div className="container">
      <img src={gifUrl} alt="file transfer animation" />
      <div className="wrapper">
        <h1>Simple File Sharing</h1>
        <p>Upload and share the download link.</p>
        {file ? (
          <>
            <button className="remove_btn" onClick={onRemoveClick}>
              Remove File
            </button>
            <button className="copy_btn" onClick={onCopyClick}>
              Copy Link
            </button>
          </>
        ) : (
          <button className="success_btn" onClick={onUploadClick}>
            Upload
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className="result_div">
          {result && <div className="link" ref={linkRef}></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
