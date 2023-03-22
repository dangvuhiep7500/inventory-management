import React, { useRef, useEffect } from "react";
import Tagify from "@yaireo/tagify";
interface TagifyInputProps {
    whitelist: string[];
    maxTags?: number;
    maxDropdownItems?: number;
    dropdownEnabled?: number;
  }

export const TagifyInput: React.FC<TagifyInputProps> = ({
    whitelist,
    maxTags = 10,
    maxDropdownItems = 20,
    dropdownEnabled = 0,
     }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const tagify = new Tagify(inputRef.current, {
        whitelist,
        maxTags,
        dropdown: {
            maxItems: maxDropdownItems,
            enabled: dropdownEnabled,
            classname: "tags-look", 
            closeOnSelect: false,
      },
    });
    }
  }, [inputRef]);
  return <input ref={inputRef} className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]" name="tags" />;
};

export default TagifyInput;