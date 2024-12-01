'use client';

import { useId } from 'react';
import { useA11yContext } from '#/utils/a11yContext';

type ToggleProps = {
  isA11y?: boolean;
  label: string;
  value?: string;
  size?: 'default' | 'huge';
  orientation?: 'horizontal' | 'vertical';
  isChecked?: boolean;
  isFullWidth?: boolean;
  onChange: () => void;
  className?: string;
};

export default function Toggle({
  isA11y,
  label = 'Toggle me',
  value,
  onChange,
  isChecked = false,
  isFullWidth,
  size = 'default',
  orientation = 'horizontal',
  className,
}: ToggleProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const uid = useId();

  const SemanticTagLabel = isA11y ? 'label' : 'span';

  const classFocus = isA11y
    ? 'ring-offset-foregroundOnPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-offset-2 peer-focus:ring-primary'
    : '';

  const classTogglePosition = isA11y
    ? 'after:top-[0.125rem] after:start-[0.125rem]'
    : 'after:top-[2px] after:start-[2px]';

  const classSizeDefault = isA11y
    ? 'w-[3.75rem] h-8 after:h-7 after:w-7'
    : 'w-[60px] h-[32px] after:h-[28px] after:w-[28px]';

  const classSizeHuge = isA11y
    ? 'w-[7.75rem] h-[4rem] after:h-[3.75rem] after:w-[3.75rem]'
    : 'w-[124px] h-[64px] after:h-[60px] after:w-[60px]';

  const classSize = size === 'huge' ? classSizeHuge : classSizeDefault;

  const classHorizontal = isA11y
    ? 'gap-2 items-center'
    : 'gap-[8px] items-center';

  const classVertical = isA11y ? 'flex-col gap-2' : 'flex-col gap-[8px]';

  const classFullwidth = isFullWidth
    ? 'flex w-full space-between'
    : 'inline-flex w-fit';

  const classOrientation =
    orientation === 'horizontal' ? classHorizontal : classVertical;

  return (
    <SemanticTagLabel
      className={`${classFullwidth} ${classFocus} cursor-pointer ${classOrientation} ${
        className ? className : ''
      }`}
      onClick={isA11y ? undefined : onChange}
      data-test="toggle">
      <span className={`font-medium ${isA11y ? 'text-sm' : 'text-[14px]'}`}>
        {label}
      </span>
      <input
        type="checkbox"
        id={`toggle-${uid}`}
        value={value}
        className="sr-only peer"
        checked={isChecked}
        onChange={onChange}
      />
      <div
        className={`relative ${
          isA11y ? 'bg-gray-500' : 'bg-gray-300'
        } rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-foregroundOnPrimary after:content-[''] ${classTogglePosition} after:absolute after:bg-foregroundOnPrimary after:border-foregroundOnPrimary after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-primary ${classFocus} ${classSize} ${
          isFullWidth ? 'ms-auto' : ''
        }`}></div>
    </SemanticTagLabel>
  );
}
