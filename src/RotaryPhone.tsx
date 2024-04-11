import React from "react";
import { Canvas, Group, Mask, Rect } from "@shopify/react-native-skia";
import { StatusBar, useWindowDimensions } from "react-native";
import {
  Background,
  FrontPart,
  KeyButton,
  KeyNumber,
  Stopper,
} from "./skia_ui";
import { ANGLES, COLORS, KEY_CIRCLE_RADIUS } from "./constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  findCircleContainingPoint,
  generatePositions,
  generateStopperPosition,
} from "./helpers";
import * as Haptics from "expo-haptics";
import useSoundLoader from "./hooks/useSoundLoader";

const RotaryPhone = () => {
  const { keyInSound, keyOutSound } = useSoundLoader();
  const { width, height } = useWindowDimensions();

  const strokeWidth = 1;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const r = (width - strokeWidth) / 2 - 65;

  const movableAngle = useSharedValue<number | null>(null);
  const movableTheta = useSharedValue(0);

  const positions = generatePositions(halfWidth, halfHeight, r);
  const stopperPosition = generateStopperPosition(halfWidth, halfHeight, r);

  const playOut = async () => {
    await keyOutSound.playFromPositionAsync(0);
  };
  const playIn = async () => {
    await keyInSound.playFromPositionAsync(0);
  };

  const panGesture = Gesture.Pan()
    .onBegin(({ x, y }) => {
      const foundNumber = findCircleContainingPoint(
        { x, y },
        positions,
        KEY_CIRCLE_RADIUS
      );
      if (foundNumber) {
        movableAngle.value = foundNumber.angle;
      } else {
        movableAngle.value = null;
      }
    })
    .onUpdate(({ translationX, translationY }) => {
      if (movableAngle.value) {
        const ang = movableAngle.value;
        const mX = halfWidth + r * Math.cos(ang);
        const mY = -r * Math.sin(ang) + halfHeight;
        const oldCanvasX = translationX + mX;
        const oldCanvasY = translationY + mY;
        const xPrime = oldCanvasX - halfWidth;
        const yPrime = -(oldCanvasY - halfHeight);
        let theta = Math.atan2(yPrime, xPrime);

        if (theta < 0) {
          theta = 2 * Math.PI + theta;
        }
        if (ang - theta > 0) {
          movableTheta.value = ang - theta;
        }
        const mappedAngles = ANGLES.map((a) => a.toFixed(2));
        const fixedTheta = theta.toFixed(2);

        if (mappedAngles.includes(fixedTheta)) {
          runOnJS(playIn)();
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    })
    .onEnd(() => {
      if (movableAngle.value) {
        movableAngle.value = null;
        runOnJS(playOut)();
        movableTheta.value = withTiming(0, undefined, () => {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
        });
      }
    });

  const transformGroup = useDerivedValue(() => [
    { rotate: movableTheta.value },
  ]);

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
      <GestureDetector gesture={panGesture}>
        <Canvas style={{ flex: 1 }}>
          <Background bgColor={COLORS.brownDark} />
          {positions.map((v) => (
            <KeyNumber key={v.number} value={v} />
          ))}

          <Group>
            <Mask
              mode="luminance"
              mask={
                <>
                  <Background bgColor={COLORS.white} />
                  <Group
                    origin={{ x: halfWidth, y: halfHeight }}
                    transform={transformGroup}
                  >
                    {positions.map((v) => (
                      <KeyButton key={v.number} value={v} />
                    ))}
                  </Group>
                </>
              }
            >
              <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                color={COLORS.brownLight}
              />
            </Mask>
          </Group>
          <FrontPart />
          <Stopper x={stopperPosition.x} y={stopperPosition.y} />
        </Canvas>
      </GestureDetector>
    </>
  );
};

export default RotaryPhone;
