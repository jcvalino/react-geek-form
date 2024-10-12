import React from 'react';
import Lottie from 'lottie-react';
import { type ReactElement } from 'react';
import { type IconType } from 'react-icons';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from './../utilities';

import Text from './Text';

import LoadingSpinner from './LoadingSpinner.json';

const SolidButtonStyle = cva('hover:shadow-button-hover', {
  variants: {
    intent: {
      default:
        'bg-interface-subtle text active:bg-interface-active hover:bg-interface-hovered drop-shadow-sm',
      primary:
        'bg-brand text-onBrand hover:bg-brand-hovered active:bg-brand-active',
      info: 'bg-info text-onInfo hover:bg-info-hovered active:bg-info-active',
      success:
        'bg-success text-onSuccess hover:bg-success-hovered active:bg-success-active',
      warning:
        'bg-warning text-onWarning hover:bg-warning-hovered active:bg-warning-active',
      danger:
        'bg-danger text-onDanger hover:bg-danger-hovered active:bg-danger-active',
      inverse:
        'bg-inverse text-onInverse hover:bg-inverse-hovered active:bg-inverse-active',
    },
  },
});

const OutlineButtonStyle = cva('hover:shadow-button outline-1 outline', {
  variants: {
    intent: {
      default:
        'outline text bg-interface-subtle hover:bg-interface-subtle-hovered active:bg-interface-subtle-active',
      primary:
        'outline-brand-subtle text-onBrand-subtle bg-brand-subtle hover:bg-brand-subtle-hovered active:bg-brand-subtle-active',
      info: 'outline-info-subtle text-onInfo-subtle bg-info-subtle hover:bg-info-subtle-hovered active:bg-info-subtle-active',
      success:
        'outline-success-subtle text-onSuccess-subtle bg-success-subtle hover:bg-success-subtle-hovered active:bg-success-subtle-active',
      warning:
        'outline-warning-subtle text-onWarning-subtle bg-warning-subtle hover:bg-warning-subtle-hovered active:bg-warning-subtle-active',
      danger:
        'outline-danger-subtle text-onDanger-subtle bg-danger-subtle hover:bg-danger-subtle-hovered active:bg-danger-subtle-active',
      inverse: '', //we don't have this yet.
    },
  },
});

const TextButtonStyle = cva(
  'h-auto gap-1 active:bg-interface-selected-subtle',
  {
    variants: {
      style: {
        default: '',
        bare: 'px-0.5 py-0 hover:underline',
      },
      intent: {
        default: 'text hover:bg-interface-subtle',
        primary: 'text-brand hover:bg-brand-subtle',
        info: 'text-info hover:bg-info-subtle',
        success: 'text-success hover:bg-success-subtle',
        warning: 'text-warning hover:bg-warning-subtle',
        danger: 'text-danger hover:bg-warning-subtle',
        inverse: '', //we don't have this yet.
      },
    },
  }
);

const IconButtonStyle = cva('hover:shadow-button aspect-square', {
  variants: {
    size: {
      small: 'text-caption p-[0.375rem] h-[1.625rem]',
      default: 'text-body p-[0.625rem] h-9',
      large: 'text-body-large p-4 h-[3.125rem]',
    },
    intent: {
      default:
        'text border bg-interface-subtle hover:bg-interface-hovered active:bg-interface-active',
      primary:
        'bg-brand text-onBrand hover:bg-brand-hovered active:bg-brand-active',
      info: 'bg-info text-onInfo hover:bg-info-hovered active:bg-info-active',
      success:
        'bg-success text-onSuccess hover:bg-success-hovered active:bg-success-active',
      warning:
        'bg-warning text-onWarning hover:bg-warning-hovered active:bg-warning-active',
      danger:
        'bg-danger text-onDanger hover:bg-danger-hovered active:bg-danger-active',
      inverse:
        'bg-inverse text-onInverse hover:bg-inverse-hovered active:bg-inverse-active',
    },
    rounded: {
      true: 'rounded-full',
      false: 'rounded',
    },
  },
});

const SizeStyle = cva('box-border gap-1', {
  variants: {
    size: {
      small: 'px-2 py-[0.375rem] max-h-[1.625rem]',
      default: 'px-3 py-[0.625rem] max-h-9',
      large: 'px-[1.125rem] py-4 max-h-[3.125rem]',
    },
    leadingIcon: {
      true: 'pl-[0.625rem]',
    },
    trailingIcon: {
      true: 'pr-[0.625rem]',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  compoundVariants: [
    {
      size: 'small',
      leadingIcon: true,
      className: 'pl-2',
    },
    {
      size: 'small',
      trailingIcon: true,
      className: 'pr-2',
    },
    {
      size: 'large',
      leadingIcon: true,
      className: 'pl-4',
    },
    {
      size: 'large',
      trailingIcon: true,
      className: 'pr-4',
    },
  ],
});

type Icon = IconType | ReactElement;

type MiscProps = {
  leadingIcon?: Icon;
  trailingIcon?: Icon;
  fullWidth?: boolean;
  children: string;
};

type VariantProps = {
  variant?: 'solid' | 'outline';
} & MiscProps;

type TextVariantProps = {
  variant: 'text';
  style?: 'default' | 'bare';
} & MiscProps;

type IconVariantProps = {
  variant: 'icon';
  icon: Icon;
  rounded?: boolean;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?:
    | 'default'
    | 'primary'
    | 'info'
    | 'warning'
    | 'success'
    | 'danger'
    | 'inverse';
  size?: 'default' | 'small' | 'large';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
} & (VariantProps | TextVariantProps | IconVariantProps);

const Button = ({
  onClick,
  className,
  size = 'default',
  intent = 'default',
  disabled = false,
  ...props
}: ButtonProps) => {
  const {
    leadingIcon,
    trailingIcon,
    fullWidth = false,
    variant,
    icon: Icon,
    style,
    rounded,
    children: label = 'Button',
  } = props as VariantProps & TextVariantProps & IconVariantProps;

  const labelSize = {
    small: 'caption',
    default: 'body',
    large: 'body-large',
  };

  const iconSize = {
    small: 'text-caption',
    default: 'text-body',
    large: 'text-body-large',
  };

  const ButtonStyle = cn(
    {
      solid: SolidButtonStyle({ intent }),
      outline: OutlineButtonStyle({ intent }),
      text: TextButtonStyle({ intent, style }),
      icon: IconButtonStyle({ intent, size, rounded }),
    }[variant ?? 'solid'],
    props.style !== 'bare' &&
      variant !== 'icon' &&
      SizeStyle({
        size: size,
        leadingIcon: !!leadingIcon,
        trailingIcon: !!trailingIcon,
        fullWidth,
      }),
    'relative transition-colors ease-in-out',
    'flex items-center justify-center rounded',
    'transition-shadow ease-in-out ring-0 focus:outline-none focus:ring-4 focus:ring-interface-focus',
    'disabled:border disabled:border-subtle disabled:bg-interface-disabled disabled:text-disabled disabled:cursor-not-allowed',
    className
  );

  const renderIcon = (Icon: Icon) => {
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    if (typeof Icon === 'function') {
      return <Icon />;
    }
    return null;
  };

  return (
    <button
      type={props.type}
      className={ButtonStyle}
      onClick={onClick}
      disabled={disabled}
      aria-busy={props.loading}
      aria-disabled={disabled}
      aria-label={label}
    >
      {Icon && variant === 'icon' && (
        <Slot className={`${iconSize[size]} ${props.loading && 'opacity-25'}`}>
          {renderIcon(Icon)}
        </Slot>
      )}
      {leadingIcon && (
        <Slot className={`${iconSize[size]} ${props.loading && 'opacity-25'}`}>
          {renderIcon(leadingIcon)}
        </Slot>
      )}
      {props.loading && (
        <Lottie
          animationData={LoadingSpinner}
          loop={true}
          className="absolute mx-auto h-[18px] w-[18px]"
        />
      )}

      {!Icon && (
        <Text
          size={labelSize[size] as 'caption' | 'body' | 'body-large'}
          className={`text-nowrap ${props.loading && 'opacity-25'}`}
          as="span"
          weight="semibold"
        >
          {label as string}
        </Text>
      )}
      {trailingIcon && (
        <Slot className={`${iconSize[size]} ${props.loading && 'opacity-25'}`}>
          {renderIcon(trailingIcon)}
        </Slot>
      )}
    </button>
  );
};

export default Button;
