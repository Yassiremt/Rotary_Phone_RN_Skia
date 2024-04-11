import { useWindowDimensions } from "react-native";
import React from "react";
import {
  Circle,
  Group,
  LinearGradient,
  RadialGradient,
  vec,
} from "@shopify/react-native-skia";
import { COLORS, LINEAR_GRADIENT } from "../constants";

const MARGINS = 40;

const FrontPart = () => {
  const { width, height } = useWindowDimensions();
  const centeredWidth = width / 2;
  const centeredHeight = height / 2;
  const containerCircleRadius = (width - MARGINS) / 2 + 2;
  const mediumCircleRadius = (width - MARGINS) / 4.4;
  const smallCircleRadius = (width - MARGINS) / 4.8;
  return (
    <Group>
      <Circle
        cx={centeredWidth}
        cy={centeredHeight}
        r={containerCircleRadius}
        strokeWidth={5}
        style={"stroke"}
      >
        <LinearGradient
          start={{
            x: centeredWidth,
            y: centeredHeight - containerCircleRadius,
          }}
          end={{ x: centeredWidth, y: centeredHeight + containerCircleRadius }}
          colors={LINEAR_GRADIENT}
        />
      </Circle>
      <Circle cx={centeredWidth} cy={centeredHeight} r={mediumCircleRadius}>
        <LinearGradient
          start={{ x: centeredWidth, y: centeredHeight + mediumCircleRadius }}
          end={{ x: centeredWidth, y: centeredHeight - mediumCircleRadius }}
          colors={LINEAR_GRADIENT}
        />
      </Circle>
      <Circle cx={centeredWidth} cy={centeredHeight} r={smallCircleRadius}>
        <RadialGradient
          c={vec(centeredWidth, centeredHeight)}
          r={smallCircleRadius}
          colors={[COLORS.brownLight, COLORS.brownDark]}
        />
      </Circle>
    </Group>
  );
};

export { FrontPart };
