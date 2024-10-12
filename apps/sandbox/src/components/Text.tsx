import { type ReactElement } from 'react';
import * as Label from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from './../utilities';

type NonNullableProps<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

const TextStyles = cva('', {
  variants: {
    size: {
      display: 'text-display',
      title: 'text-title',
      heading: 'text-heading',
      subheading: 'text-subheading',
      lead: 'text-lead',
      'body-large': 'text-body-large',
      body: 'text-body',
      caption: 'text-caption',
      overline: 'text-caption font-bold uppercase tracking-[0.5px]',
    },

    lineHeight: {
      tight: '',
      relaxed: '',
      loose: '',
    },

    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },

  defaultVariants: {
    size: 'body',
  },

  compoundVariants: [
    {
      size: 'body',
      lineHeight: 'tight',
      className: 'text-body-tight',
    },
    {
      size: 'body',
      lineHeight: 'relaxed',
      className: 'text-body-relaxed',
    },
    {
      size: 'body',
      lineHeight: 'loose',
      className: 'text-body-loose',
    },
    {
      size: 'body-large',
      lineHeight: 'tight',
      className: 'text-body-large-tight',
    },
    {
      size: 'body-large',
      lineHeight: 'relaxed',
      className: 'text-body-large-relaxed',
    },
    {
      size: 'body-large',
      lineHeight: 'loose',
      className: 'text-body-large-loose',
    },
    {
      size: 'caption',
      lineHeight: 'tight',
      className: 'text-caption-tight',
    },
    {
      size: 'caption',
      lineHeight: 'relaxed',
      className: 'text-caption-relaxed',
    },
    {
      size: 'caption',
      lineHeight: 'loose',
      className: 'text-caption-loose',
    },
  ],
});

type TextCVAProps = NonNullableProps<
  Omit<VariantProps<typeof TextStyles>, 'size'>
>;
type BaseTextProps = TextCVAProps & {
  children: string | ReactElement;
  className?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span';
};

type TextWithoutLineHeight = BaseTextProps & {
  size?: 'display' | 'title' | 'heading' | 'subheading' | 'lead' | 'overline';
};

type TextWithLineHeight = BaseTextProps & {
  size?: 'body' | 'body-large' | 'caption';
  lineHeight?: 'tight' | 'relaxed' | 'loose';
};

type LabelTextProps = Omit<BaseTextProps, 'as'> & {
  as?: 'label';
  htmlFor: string;
};

export type TextProps =
  | LabelTextProps
  | TextWithLineHeight
  | TextWithoutLineHeight;

function isTextLabel(props: any): props is LabelTextProps {
  return props.as == 'label' && 'htmlFor' in props;
}

function hasLineHeight(props: any): props is TextWithLineHeight {
  return true;
}

// eslint-disable-next-line no-redeclare
const Text = ({
  as: Component = 'span',
  children,
  lineHeight,
  className,
  weight,
  ...props
}: TextProps) => {
  const styles = cn(
    TextStyles({
      size: hasLineHeight(props) ? props.size : 'body',
      weight,
      lineHeight,
    }),
    className
  );

  if (isTextLabel(props)) {
    return (
      <Label.Root asChild htmlFor={props.htmlFor}>
        <label className={styles}>{children}</label>
      </Label.Root>
    );
  }

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
};

Text.displayName = 'Text';

export default Text;
