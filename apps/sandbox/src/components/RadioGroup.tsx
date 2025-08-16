import { createContext, useContext, type ReactElement } from 'react';

import FieldWrapper, { type Props as WrapperProps } from './FieldWrapper';

import { cn } from '../utilities';

const RadioGroupContext = createContext<Pick<
  Props<any>,
  'value' | 'onChange' | 'name'
> | null>(null);

const useRadioGroupContext = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('Invalid use');
  return ctx;
};

type Props<TValue> = {
  label?: string;
  value: TValue;
  disabled?: boolean;
  onChange: (value: TValue) => void;
  children?: ReactElement<ItemProps> | ReactElement<ItemProps>[];
} & WrapperProps;

function RadioGroup<TValue>({
  onChange,
  value,
  children,
  ...rest
}: Props<TValue>) {
  return (
    <FieldWrapper {...rest}>
      <RadioGroupContext.Provider value={{ name: rest.name, value, onChange }}>
        {children}
      </RadioGroupContext.Provider>
    </FieldWrapper>
  );
}

type ItemProps = {
  label?: string;
  description?: string;
  value: any;
  disabled?: boolean;
};

function RadioItem({
  label,
  value: checkedValue,
  description,
  disabled,
}: ItemProps) {
  const { name, value, onChange } = useRadioGroupContext();

  return (
    <p
      className={cn(
        'transition-colors duration-300',
        'flex cursor-pointer select-none flex-col',
      )}
    >
      <div
        className={cn('group', description ? 'items-start' : 'items-center')}
      >
        <input
          id={`${name}-${checkedValue}`}
          name={`${name}-${checkedValue}`}
          disabled={disabled}
          type="radio"
          className={cn(
            'h-4 w-4',
            'border-subtle bg-interface',
            'form-CheckBox rounded-mds-4 checked:!bg-brand checked:!ring-brand focus:!ring-brand',
            'disabled:cursor-not-allowed disabled:bg-interface-disabled disabled:text-disabled disabled:hover:bg-interface-disabled',
          )}
          checked={value === checkedValue}
          onChange={({ target: { checked } }) => {
            if (!checked) return;
            onChange(checkedValue);
          }}
        />
        <div className="text-left">
          <p
            className={cn('leading-none', {
              'mt-px': description,
            })}
          >
            {label}
          </p>
          {description && <p className="leading-normal">{description}</p>}
        </div>
      </div>
    </p>
  );
}

RadioGroup.Item = RadioItem;

export default RadioGroup;
