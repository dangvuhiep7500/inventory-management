import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
export const ReactQuillEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" },{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
    return (
      <ReactQuill
        className="my-quill mt-2 dark:text-white"
        value={editorContent}
        onChange={(value) => {
          setEditorContent(value);
        }}
        modules={modules}
        placeholder='Type your text here...'
      />
    );
}