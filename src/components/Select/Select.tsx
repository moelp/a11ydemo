import React, { useState, useEffect, useRef, useId, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';

import { IconChevronDown } from '@tabler/icons-react';

import { useA11yContext } from '#/utils/a11yContext';

interface Option {
  value: string | number;
  label: string;
  namespace?: string;
}

interface SelectProps {
  isA11y?: boolean;
  label: string;
  value: string | number;
  options: Option[];
  namespace?: string;
  className?: string;
  onChange: (value: string | number) => void;
}

const Select = memo(function Select({
  isA11y,
  label,
  value: propValue,
  options,
  namespace = 'default_select_namespace',
  className,
  onChange,
}: SelectProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;
  const SemanticTag = isA11y ? 'button' : 'span';
  const SemanticDropdown = isA11y ? 'ul' : 'div';
  const SemanticDropdownItem = isA11y ? 'li' : 'div';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState<string | number>(propValue || '');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const id = useId();
  const currentNamespace = namespace || id;
  const selectRef = useRef<HTMLDivElement>(null);

  const { refs, update } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(24), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const chosen = options.find((o) => o.value === value);

  const handleSelect = (newValue: string | number) => {
    setValue(newValue);
    onChange(newValue);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    update(); // Ensure positioning updates when toggling
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 < 0 ? options.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isDropdownOpen) {
        // Handle selection if dropdown is open
        if (activeIndex >= 0) {
          handleSelect(options[activeIndex].value);
        }
      } else {
        // Toggle the dropdown when Enter is pressed
        toggleDropdown();
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const classFocus = isA11y
    ? 'ring-offset-current focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary'
    : 'focus-visible:outline-none';

  const classPadding = isA11y
    ? 'ps-5 pe-3 py-3'
    : 'ps-[20px] pe-[12px] py-[12px]';

  return (
    <div
      className={twMerge(`relative ${isA11y ? '' : 'text-[16px]'}`, className)}
      ref={selectRef}
      data-test="select">
      <label id={`${currentNamespace}_label`} className="inline-block mb-2">
        {label}
      </label>
      <div className="select-container">
        <SemanticTag
          ref={refs.setReference}
          className={`select-button flex border-2 border-solid border-foregroundMuted w-full ${classFocus} ${classPadding} ${
            isA11y ? 'rounded-lg' : 'rounded-[8px]'
          }`}
          onClick={toggleDropdown}
          onKeyDown={isA11y ? handleKeyDown : undefined}
          {...(isA11y && { role: 'combobox' })}
          {...(isA11y && { 'aria-haspopup': 'listbox' })}
          {...(isA11y && { 'aria-controls': `${currentNamespace}_dropdown` })}
          {...(isA11y && { 'aria-expanded': isDropdownOpen })}
          {...(isA11y && {
            'aria-activedescendant':
              activeIndex >= 0
                ? `${namespace}_element_${options[activeIndex].value}`
                : undefined,
          })}>
          {chosen ? chosen.label : 'Select an option'}
          <span className={`${isA11y ? 'ms-auto ps-4' : 'ml-auto pl-[16px]'}`}>
            <IconChevronDown
              className={`${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </SemanticTag>
        {/* <button
          ref={refs.setReference}
          className={`select-button flex border-2 border-solid border-foregroundMuted w-full ${classPadding} ${
            isA11y ? 'rounded-lg' : 'rounded-[8px]'
          }`}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-haspopup="listbox"
          aria-controls={`${currentNamespace}_dropdown`}
          aria-expanded={isDropdownOpen}
          aria-activedescendant={
            activeIndex >= 0
              ? `${namespace}_element_${options[activeIndex].value}`
              : undefined
          }>
          {chosen ? chosen.label : 'Select an option'}
          <span className={`${isA11y ? 'ms-auto ps-4' : 'ml-auto pl-[16px]'}`}>
            <IconChevronDown
              className={`${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button> */}
        {isDropdownOpen && (
          <SemanticDropdown
            className={`select-dropdown absolute top-[calc(100%+4px)] border border-solid border-backgroundSecondary bg-backgroundLevel1 shadow-xl z-40 ${
              isA11y
                ? 'start-0 end-0 rounded-lg p-0.5'
                : 'left-0 right-0 rounded-[8px] p-[2px]'
            }`}
            {...(isA11y && { role: 'listbox' })}
            ref={refs.setFloating}
            id={`${currentNamespace}_dropdown`}>
            {options.map((option, index) => (
              <SemanticDropdownItem
                key={option.value}
                id={`${currentNamespace}_element_${option.value}`}
                {...(isA11y && { role: 'option' })}
                {...(isA11y && { 'aria-selected': index === activeIndex })}
                className={`select-option cursor-pointer relative overflow-hidden aria-selected:bg-backgroundLevel1Hover aria-selected:text-foregroundLevel1Hover ${
                  isA11y
                    ? 'px-1 ps-3 py-3 rounded-md'
                    : 'px-[4px] pl-[12px] py-[12px] rounded-[6px]'
                } ${
                  index === activeIndex && !isA11y
                    ? 'bg-backgroundLevel1Hover text-foregroundLevel1Hover'
                    : ''
                } before:[content:""] before:inline-block before:absolute before:w-1 before:start-0 before:top-0 before:bottom-0 ${
                  option.value === chosen?.value
                    ? 'font-semibold text-foregroundLevel1Hover bg-backgroundLevel1Hover before:bg-foreground'
                    : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(option.value)}>
                {option.label}
              </SemanticDropdownItem>
            ))}
          </SemanticDropdown>
        )}
      </div>
      <input type="hidden" name={namespace} value={value} readOnly />
    </div>
  );
});

export default Select;
