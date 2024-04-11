import React from "react";
import {
  Fill,
  FitBox,
  Group,
  LinearGradient,
  Path,
  Skia,
} from "@shopify/react-native-skia";

type Props = {
  x: number;
  y: number;
};

const Stopper = ({ x, y }: Props) => {
  const path =
    "M30.2946 15.0535C44.9216 16.2312 52.5236 15.5824 65.5 11L61.5 21L56.5 30.5L51 39.5L45.5 48C33.7319 43.5441 28.8698 40.3475 18.0162 32.2062C7.3272 22.4674 3.59763 16.3265 0 2.03792C0.123131 0.443747 1.51106 -0.373622 2.88378 0.165635C13.2967 9.44214 18.2901 12.2675 30.2946 15.0535Z";
  const skiaPath = Skia.Path.MakeFromSVGString(path);

  return (
    <Group
      transform={[{ translateY: y }, { translateX: x }, { rotate: -0.5 }]}
      clip={skiaPath}
    >
      <Path path={skiaPath} />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 50, y: 50 }}
        colors={["#C0001C", "#5A000D"]}
      />
    </Group>
  );
};

export { Stopper };
