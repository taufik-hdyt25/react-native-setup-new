import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { Fonts } from '@/assets/fonts/fonts';

type Weight = 'regular' | 'medium' | 'semiBold' | 'bold';

type Variant = 'small' | 'body' | 'heading' | 'title';

interface Props extends TextProps {
  variant?: Variant;
  weight?: Weight; // override
  size?: number; // override
}

/**
 * Typography System
 */
const VARIANT_STYLES: Record<
  Variant,
  { fontSize: number; weight: Weight; lineHeight: number }
> = {
  small: {
    fontSize: 12,
    weight: 'regular',
    lineHeight: 16,
  },
  body: {
    fontSize: 14,
    weight: 'regular',
    lineHeight: 20,
  },
  heading: {
    fontSize: 20,
    weight: 'semiBold',
    lineHeight: 28,
  },
  title: {
    fontSize: 28,
    weight: 'bold',
    lineHeight: 36,
  },
};

export const Typography: React.FC<Props> = ({
  variant = 'body',
  weight,
  size,
  style,
  children,
  ...rest
}) => {
  const variantStyle = VARIANT_STYLES[variant];

  const textStyle: TextStyle = {
    fontFamily: Fonts.Poppins[weight ?? variantStyle.weight],
    fontSize: size ?? variantStyle.fontSize,
    lineHeight: variantStyle.lineHeight,
  };

  return (
    <Text {...rest} style={[textStyle, style]}>
      {children}
    </Text>
  );
};
