import React from 'react';
import {Text, matchFont, useFonts} from '@shopify/react-native-skia';
import {COLORS} from '../constants';

type Props = {
  value: {x: number; y: number; number: number};
};

const fontSize = 36;

const KeyNumber = ({value}: Props) => {
  const customFontMgr = useFonts({
    IrishGrover: [require('../fonts/IrishGrover.ttf')],
  });

  if (!customFontMgr) {
    return null;
  }

  const fontStyle = {
    fontFamily: 'IrishGrover',
    fontSize,
  };

  const font = matchFont(fontStyle, customFontMgr);
  const textDimensions = font.measureText(value.number.toString());

  return (
    <Text
      x={value.x - textDimensions.width / 2}
      y={value.y + textDimensions.height / 2}
      text={value.number.toString()}
      font={font}
      color={COLORS.number}
    />
  );
};

export {KeyNumber};
