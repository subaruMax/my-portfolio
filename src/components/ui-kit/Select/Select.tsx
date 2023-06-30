import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { Icon, IconName } from '@ui-kit';

import s from './Select.module.scss';
import { useOnClickOutside } from '@app/hooks';

export type SelectOption = {
  value: string | number;
  label: string | number;
  icon?: IconName;
};

export interface SelectProps {
  value: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  onSelect: (val: string | number) => void;
}

const Select = ({
  value,
  options,
  placeholder = 'Select..',
  className,
  onSelect
}: SelectProps) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const renderCurrentValue = () => {
    if (value !== null) {
      return options.find(el => el.value === value);
    }

    return { label: placeholder, icon: null };
  };

  const currentValue = renderCurrentValue();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <button
      className={cn(s.root, { [s.isOpen]: isOpen }, className)}
      onClick={toggleDropdown}
      ref={ref}
    >
      <div className={s.currentValue}>
        {currentValue?.icon && (
          <Icon name={currentValue?.icon} className={s.currentValueIcon} />
        )}
        {currentValue?.label}
        <Icon name="dropdown" className={s.dropdownIcon} />
      </div>
      <div className={s.options}>
        {options.map(el => (
          <div
            key={el.value}
            onClick={() => onSelect(el.value)}
            className={cn(s.option, { [s.active]: el.value === value })}
          >
            {el.icon ? <Icon name={el.icon} className={s.optionIcon} /> : null}
            {el.label}
          </div>
        ))}
      </div>
    </button>
  );
};

export default Select;
