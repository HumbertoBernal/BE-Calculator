import { Dispatch, SetStateAction } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { Search } from "@/lib/alphavantage";

type ComboBoxProps<TData> = {
  options: TData[];
  selected: TData | undefined;
  setSelected: Dispatch<SetStateAction<TData | undefined>>;
  setQuery: Dispatch<SetStateAction<string>>;
  placeholder?: string;
};

const ComboBox = <TData,>({
  options,
  setQuery,
  selected,
  setSelected,
  placeholder = "",
}: ComboBoxProps<TData>) => {
  return (
    <Combobox
      as="div"
      value={selected}
      defaultValue=""
      onChange={(value: any) => {
        setSelected(value);
      }}
      className="w-full"
    >
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: Search) =>
            option["1. symbol"] ? option["2. name"] + " (" + option["1. symbol"] + ")" : ""
          }
          placeholder={placeholder}
          autoComplete="off"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {options.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, idx) => {
              const userProfile = option as Search;

              return (
                <Combobox.Option
                  key={idx}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9",
                    ${active ? "bg-blue-500 text-white" : "text-gray-900"}`
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span className={`block truncate ${selected && "font-semibold"}`}>
                        {userProfile["2. name"] ? userProfile["2. name"] + " (" + userProfile["1. symbol"] + ")" : " Display error"}
                      </span>

                      {selected && (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-4
                          ${active ? "text-white" : "text-blue-500"}`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default ComboBox;
