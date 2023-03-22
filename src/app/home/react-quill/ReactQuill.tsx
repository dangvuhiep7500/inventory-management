import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const ReactQuillEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };
    return (
      <ReactQuill
        className="my-quill h-64 mt-2 mb-14 dark:text-white"
        value={editorContent}
        onChange={(value) => {
          setEditorContent(value);
        }}
        modules={modules}
      />
    );
}