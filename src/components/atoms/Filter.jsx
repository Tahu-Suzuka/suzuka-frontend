import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ChevronDown } from "lucide-react";

const Filter = ({ value, onChange, options = [] }) => {
  const selectedOption = options.find((opt) => opt.value === value) || {
    label: "Filter",
    value: "",
  };

  return (
    <div className="relative w-full max-w-[200px] text-sm">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full flex items-center justify-between border border-gray-300 rounded-md bg-white px-4 py-2 text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
            <div className="flex items-center gap-2">
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4 text-gray-600" />
              <span>
                {options.find((opt) => opt.value === value)?.label || "Filter"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg focus:outline-none">
              {options.map((opt) => (
                <Listbox.Option
                  key={opt.value}
                  value={opt.value}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-secondary font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  {opt.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Filter;
