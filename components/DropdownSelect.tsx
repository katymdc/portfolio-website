'use client'

import { useLayoutEffect, useState, useId, useRef, useEffect } from "react";

interface DropdownSelectProps {
    /** Array of option values and labels */
    options: Array<
        { value: string, label: string }
    >;
    /** Callback function when the value has changed */
    onChange: (value: string) => void,
    /** Whether the dropdown can be interacted with */
    disabled?: boolean;
    /** Whether the options can be searched */
    isSearchable?: boolean;
    /** The text to display when nothing is selected */
    label?: string;
}
  
const DropdownSelect = ({
    options,
    disabled,
    isSearchable,
    onChange,
    label = 'Select One'
}: DropdownSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectValue, setSelectValue] = useState<string>();
    const [labelName, setLabelName] = useState<string>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const selectId = useId();
    const searchId = useId();

    const selectElement = useRef(null);
    const searchElement = useRef(null);

    useLayoutEffect(() => {
        if (isOpen && isSearchable && searchElement.current) {
            searchElement.current.focus();
        } else if (isOpen && selectElement.current) {
            selectElement.current.focus();
        }
        if(!isOpen) {
            setSearchValue('');
        }
    }, [isOpen]);

    useEffect(()=> {
        const selectedOption = options.find((item) => item.value === selectValue);
        if(selectedOption) {
            setLabelName(selectedOption.label);
        }
    }, [selectValue, options]);

    useEffect(()=> {
        const filteredData = options.filter((item) => {
            return item.label.toLowerCase().includes(searchValue.toLowerCase());
        })
        setFilteredOptions(filteredData);
    }, [searchValue, options]);

    const labelClickHandler = () => {
        setIsOpen(!isOpen);
    };
    
    const selectClickHandler = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
        console.log('option click');
        setSelectValue(e.currentTarget.value);
        onChange(e.currentTarget.value);
        setIsOpen(false);
    }

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectValue(e.target.value);
        onChange(e.target.value);
    };

    const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const selectBlurHandler = () => {
        setIsOpen(false);
    };

    return (
        <div className="dropdownSelectComponent w-full">
            <label htmlFor={selectId} className="border-gray-300 border-2 rounded block">
                <button
                    type="button"
                    disabled={disabled}
                    onClick={labelClickHandler}
                    className="flex w-full p-1 pl-2"
                >
                    <span className="flex-auto w-full text-left">{labelName || label}</span>
                    <span className="flex-none w-6 transform rotate-180 text-gray-600 font-bold inline-block scale-x-150 scale-y-125 -mt-1">^</span>
                </button>
            </label>
            {isOpen && (
                <div className="rounded border-gray-300 border-2 w-full mt-1 flex flex-col">
                    {isSearchable && (
                        <div className="bg-gray-100 flex-none p-1">
                            <input
                                id={searchId}
                                ref={searchElement}
                                value={searchValue}
                                onChange={searchChangeHandler}
                                className="pr-1 pl-1 focus:border-blue-600 border-gray-300 border-2 rounded w-full"
                            />
                        </div>
                    )}
                    <select
                        onBlur={selectBlurHandler}
                        ref={selectElement}
                        id={selectId}
                        size={filteredOptions && Math.max(Math.min(filteredOptions.length, 5), 2)}
                        onChange={changeHandler}
                        value={selectValue}
                        className="flex-auto"
                    >
                        {filteredOptions && filteredOptions.map(option => (
                            <option
                                key={option.value}
                                onClick={selectClickHandler}
                                className={`${selectValue == option.value ? 'selectedOption bg-blue-600 text-white' : 'notSelectedOption hover:bg-blue-100 bg-white'} p-1`}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default DropdownSelect;