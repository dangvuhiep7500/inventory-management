import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload } from 'react-icons/fa';
import Image from 'next/legacy/image';
export function MyDropzone() {
  const [preview, setPreview] = useState<File[]>([]);
  const handleDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.filter((file) => !preview.some((previewFile) => previewFile.name === file.name));
    if (newFiles.length === 0) {
      alert('All files are already added!');
    } else {
      setPreview((prevPreview) => [...prevPreview, ...newFiles]);
    }
  };
  const handleRemove = (index: number) => {
    const newFiles = [...preview];
    newFiles.splice(index, 1);
    setPreview(newFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop
  });
  const previews = preview.map((file, index) => (
    <div key={file.name} className="relative p-2.5" >
      <Image
        width={200}
        height={200}
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
      <button
        className="absolute top-0 right-0 p-1 bg-gray-800 text-white rounded-full"
        onClick={() => handleRemove(index)}
      >
        <svg
          className="h-3 w-3 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      </div>
  ));
  return (
    <>
      <div
        {...getRootProps()}
        className="p-4 border border-dashed items-center rounded-md dark:bg-[#212E48] border-sky-500"
      >
        <input {...getInputProps()} />
        <div className="flex flex-1 items-center">
          <FaFileUpload className="text-4xl mr-4 text-sky-400" />
          <div className="">
            <h3 className="font-bold text-base text-gray-900 mb-1 dark:text-white">
            Thả tập tin ở đây hoặc bấm vào để tải lên.
            </h3>
            <span className="text-sm font-normal text-gray-400">
            Tải lên tối đa 10 tệp
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 justify-center w-full">
        {previews}
        </div>
    </>
  );
}