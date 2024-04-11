import React from 'react';
import {Circle, Group} from '@shopify/react-native-skia';
import {COLORS, KEY_CIRCLE_RADIUS} from '../constants';

type Props = {
  value: {x: number; y: number; number: number};
};

const KeyButton = ({value}: Props) => {
  return (
    <Group color={COLORS.black}>
      <Circle c={{x: value.x, y: value.y}} r={KEY_CIRCLE_RADIUS}>
        {/* <Shadow inner blur={3} color={COLORS.black} dx={0} dy={0} /> */}
      </Circle>
    </Group>
  );
};

export {KeyButton};
