import {
  ReactNode,
  createContext,
  useContext,
  useId,
  FieldsetHTMLAttributes,
} from 'react';

import type { InputHTMLAttributes, ChangeEvent } from 'react';

interface iSelectGroup extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label: string;
  description?: string;
  children: ReactNode;
}

interface iSelectGroupContext {
  name: string;
  type: 'radio' | 'checkbox';
  variant?: 'default' | 'styled';
  controlIsHidden?: boolean;
  required?: boolean;
}

export interface iSelectGroupItem
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  children?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SelectGroupContext = createContext<iSelectGroupContext | undefined>(
  undefined
);

function useSelectGroupContext() {
  const context = useContext(SelectGroupContext);

  if (!context) {
    throw new Error('Must be within a SelectGroupContext');
  }
  return context;
}

// For simplicity reason the styles for the component are imported into the global styles
// TODO: refactor to be used within the component

export default function SelectGroup({
  label = 'Please select option',
  description,
  name = 'selectgroup',
  type = 'radio',
  variant = 'default',
  controlIsHidden,
  required,
  disabled,
  children,
}: iSelectGroup & iSelectGroupContext) {
  const idDescription = useId();

  return (
    <SelectGroupContext.Provider
      value={{ name, type, variant, controlIsHidden, required }}>
      <fieldset
        className="selectgroup"
        aria-describedby={description ? idDescription : undefined}
        disabled={disabled}>
        <div className="selectgroup__header">
          <label className="selectgroup__title">{label}</label>
          {description && <p id={idDescription}>{description}</p>}
        </div>
        <ul className="selectgroup__items">{children}</ul>
      </fieldset>
    </SelectGroupContext.Provider>
  );
}

SelectGroup.Item = function SelectGroupItem({
  value = 'option',
  label = 'Option',
  description,
  defaultChecked,
  children,
  onChange,
  ...rest
}: iSelectGroupItem) {
  const idItem = useId();
  const { name, type, variant, controlIsHidden, required } =
    useSelectGroupContext();

  const classVariant = variant
    ? `selectitem--${variant}`
    : 'selectitem--default';

  return (
    <li
      className={`selectitem ${classVariant} ${
        controlIsHidden ? 'selectitem__hidden' : ''
      }`}>
      <input
        type={type}
        id={idItem}
        name={name}
        value={value}
        required={required}
        defaultChecked={defaultChecked}
        className="selectitem__input"
        onChange={onChange}
        {...rest}
      />
      <div className="selectitem__inner">
        <label className="selectitem__label" htmlFor={idItem}>
          <span className="checkbox__title">{label}</span>
          {description && (
            <div className="selectitem__description">{description}</div>
          )}
        </label>
        {children && <div className="selectitem__content">{children}</div>}
      </div>
    </li>
  );
};
