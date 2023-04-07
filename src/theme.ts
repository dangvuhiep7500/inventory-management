import { CustomFlowbiteTheme } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";

export const flowbiteTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      inner: "h-full overflow-y-auto overflow-x-hidden py-4 px-3 bg-[#1E1E2D]",
    },
    collapse: {
      button:
        "group flex w-full items-center rounded-lg p-2 text-base font-normal transition duration-75 text-white hover:bg-gray-700",
      list: "space-y-2 py-2 list-none",
      label: {
        base: "ml-3 flex-1 whitespace-nowrap text-left text-base text-white",
      },
      icon: {
        base: "h-6 w-6 text-gray-200 transition duration-75 group-hover:text-white dark:text-gray-200 dark:group-hover:text-white",
      },
    },
    item: {
      base: "no-underline flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-700",
      icon: {
        base: "h-6 w-6 text-gray-200 transition duration-75 group-hover:text-white dark:text-gray-200 dark:group-hover:text-white",
      },
    },
  },
};
