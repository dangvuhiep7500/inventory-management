import React, { useRef, useEffect } from "react";
import Tagify from "@yaireo/tagify";
interface TagifyInputProps {
    whitelist: string[];
    maxTags?: number;
    maxDropdownItems?: number;
    dropdownEnabled?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
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
  }, [inputRef,dropdownEnabled,maxDropdownItems,maxTags,whitelist]);
  return <input ref={inputRef} className="block w-full h-10 pl-2 rounded-md placeholder-[#565674] placeholder-opacity-50 dark:placeholder-opacity-100 text-gray-900 text-base focus:outline-none focus:ring-1 dark:focus:ring-[#474761] focus:ring-[#B5B5C3] border border-[#E4E6EF] dark:border-[#323248] dark:text-white dark:bg-[#1E1E2D]" name="tags" />;
};

export default TagifyInput;