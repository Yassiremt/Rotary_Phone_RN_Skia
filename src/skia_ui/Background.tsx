import {useWindowDimensions} from 'react-native';
import React from 'react';
import {Circle} from '@shopify/react-native-skia';
import {CONTAINER_CIRCLE_MARGINS} from '../constants';

const Background = ({bgColor}: {bgColor: string}) => {
  const {width, height} = useWindowDimensions();
  const centeredWidth = width / 2;
  const centeredHeight = height / 2;
  const containerCircleRadius = (width - CONTAINER_CIRCLE_MARGINS) / 2;
  return (
    <Circle
      cx={centeredWidth}
      cy={centeredHeight}
      r={containerCircleRadius}
      color={bgColor}
    />
  );
};

export {Background};
