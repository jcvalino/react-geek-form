import { useMemo } from 'react';
import { type IconType } from 'react-icons';

import { cn } from '@/utilities';

const MAP_THEME_NORMAL_CLASS = {
  primary:
    'bg-brand text-onBrand hover:bg-brand-hovered active:bg-brand-pressed',
  info: 'bg-info text-onInfo hover:bg-info-hovered active:bg-info-pressed',
  success:
    'bg-success text-onSuccess hover:bg-success-hovered active:bg-success-pressed',
  warning:
    'bg-warning text-onWarning hover:bg-warning-hovered active:bg-warning-pressed',
  danger:
    'bg-danger text-onDanger hover:bg-danger-hovered active:bg-danger-pressed',
  default:
    'border border-subtle bg-interface-hovered active:bg-interface-hovered hover:bg-interface hover:shadow',
  inverse:
    'bg-inverse text-onInverse hover:bg-inverse-hovered active:bg-inverse-pressed',
};

const MAP_THEME_OUTLINED_CLASS = {
  primary:
    'border border-primary-subtle text-onBrand-subtle bg-brand-subtle hover:bg-brand-hovered-subtle active:bg-brand-pressed-subtle',
  info: 'border border-info-subtle text-onInfo-subtle bg-info-subtle hover:bg-info-hovered-subtle active:bg-info-pressed-subtle',
  success:
    'border border-success-subtle text-onSuccess-subtle bg-success-subtle hover:bg-success-hovered-subtle active:bg-success-pressed-subtle',
  warning:
    'border border-warning-subtle text-onWarning-subtle bg-warning-subtle hover:bg-warning-hovered-subtle active:bg-warning-pressed-subtle',
  danger:
    'border border-danger-subtle text-onDanger-subtle bg-danger-subtle hover:bg-danger-hovered-subtle active:bg-danger-pressed-subtle',
  default:
    'border bg-interface-subtle active:bg-interface-hovered-subtle hover:bg-interface-hovered-subtle',
  inverse:
    'border border-inverse-subtle text-onInverse-subtle bg-inverse-subtle hover:bg-inverse-hovered-subtle active:bg-inverse-pressed-subtle',
};

const MAP_THEME_TEXT_CLASS = {
  primary:
    'text-onBrand-subtle hover:underline active:bg-brand-pressed-subtle py-0.5 px-1 mx-0 h-auto',
  info: 'text-onInfo-subtle hover:underline active:bg-info-pressed-subtle py-0.5 px-1 mx-0 h-auto',
  success:
    'text-onSuccess-subtle hover:underline active:bg-success-pressed-subtle py-0.5 px-1 mx-0 h-auto',
  warning:
    'text-onWarning-subtle hover:underline active:bg-warning-pressed-subtle py-0.5 px-1 mx-0 h-auto',
  danger:
    'text-onDanger-subtle hover:underline active:bg-danger-pressed-subtle py-0.5 px-1 mx-0 h-auto',
  default:
    'hover:underline active:bg-interface-hovered-subtle py-0.5 px-1 mx-0 h-auto',
  inverse:
    'text-onInverse-subtle hover:underline active:bg-inverse-pressed-subtle py-0.5 px-1 mx-0 h-auto',
};

const MAP_THEME_ICON_CLASS = {
  primary:
    'bg-brand text-onBrand hover:bg-brand-hovered active:bg-brand-pressed aspect-square',
  info: 'bg-info text-onInfo hover:bg-info-hovered active:bg-info-pressed aspect-square',
  success:
    'bg-success text-onSuccess hover:bg-success-hovered active:bg-success-pressed aspect-square',
  warning:
    'bg-warning text-onWarning hover:bg-warning-hovered active:bg-warning-pressed aspect-square',
  danger:
    'bg-danger text-onDanger hover:bg-danger-hovered active:bg-danger-pressed aspect-square',
  default:
    'border border-subtle bg-interface-hovered active:bg-interface-hovered hover:bg-interface hover:shadow aspect-square',
  inverse:
    'bg-inverse text-onInverse hover:bg-inverse-hovered active:bg-inverse-pressed aspect-square',
};

const MAP_SIZE_CLASS = {
  small: 'px-[0.375rem] text-xs leading-[0.875rem] font-semibold h-[1.625rem]',
  base: 'px-[0.625rem] text-sm leading-4 font-semibold h-[2.25rem] ',
  large: 'px-4 text-base leading-[1.125rem] font-semibold h-[3.125rem]',
};

type Props = {
  theme?: keyof typeof MAP_THEME_NORMAL_CLASS;
  asSubmit?: boolean;
  size?: 'small' | 'base' | 'large';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
} & (
  | {
      style?: 'normal' | 'outline' | 'text';
      leftIcon?: IconType;
      rightIcon?: IconType;
      children: string;
    }
  | {
      style: 'icon';
      icon: IconType;
      isRounded?: boolean;
    }
);

const Button = ({
  onClick,
  className,
  size = 'base',
  asSubmit = false,
  disabled = false,
  theme = 'default',
  ...rest
}: Props) => {
  const Icon = useMemo(() => {
    if (rest.style !== 'icon') return undefined;
    return rest.icon;
  }, [rest]);
  const LeftIcon = useMemo(() => {
    if (rest.style === 'icon') return undefined;
    return rest.leftIcon;
  }, [rest]);
  const RightIcon = useMemo(() => {
    if (rest.style === 'icon') return undefined;
    return rest.rightIcon;
  }, [rest]);
  return (
    <button
      type={asSubmit ? 'submit' : 'button'}
      className={cn(
        MAP_SIZE_CLASS[size],
        {
          normal: MAP_THEME_NORMAL_CLASS[theme],
          outline: MAP_THEME_OUTLINED_CLASS[theme],
          text: MAP_THEME_TEXT_CLASS[theme],
          icon: MAP_THEME_ICON_CLASS[theme],
        }[rest.style ?? 'normal'],
        'flex items-center justify-center rounded focus:ring-4',
        'disabled:border disabled:border-subtle disabled:bg-interface-disabled disabled:text-disabled',
        rest.style === 'icon' && rest.isRounded ? 'rounded-full' : '',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className="text-inherit"
          style={{
            fontSize: 'inherit',
          }}
        />
      )}
      {LeftIcon && (
        <LeftIcon
          className="text-inherit"
          style={{
            fontSize: 'inherit',
          }}
        />
      )}
      {rest.style !== 'icon' && (
        <span
          className={cn(
            'mx-1 whitespace-nowrap',
            RightIcon ? 'flex-grow text-left' : ''
          )}
        >
          {rest.children}
        </span>
      )}
      {RightIcon && (
        <RightIcon
          className="text-inherit"
          style={{
            fontSize: 'inherit',
          }}
        />
      )}
    </button>
  );
};

export default Button;
