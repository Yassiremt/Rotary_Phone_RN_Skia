import { ANGLES, CONTAINER_CIRCLE_MARGINS } from "../constants";

export const generatePositions = (
  halfWidth: number,
  halfHeight: number,
  r: number
) => {
  const phoneDigits = Array.from({ length: 10 }, (_, i) =>
    i === 0 ? 0 : 9 - i + 1
  );
  return phoneDigits.map((v, i) => {
    const angle = ANGLES[i];
    const x = halfWidth + r * Math.cos(angle);
    const y = -r * Math.sin(angle) + halfHeight;
    return { number: v, x, y, angle };
  });
};
export const generateStopperPosition = (
  halfWidth: number,
  halfHeight: number,
  r: number
) => {
  const angle = 0;
  const x = halfWidth + r * Math.cos(angle) - CONTAINER_CIRCLE_MARGINS / 2 + 2;
  const y = -r * Math.sin(angle) + halfHeight;
  return { x, y };
};

export const findCircleContainingPoint = (
  point: Point,
  circles: Circle[],
  radius: number
) => {
  "worklet";
  for (const circle of circles) {
    const distanceSquared =
      (point.x - circle.x) ** 2 + (point.y - circle.y) ** 2;
    const radiusSquared = radius ** 2;
    if (distanceSquared <= radiusSquared) {
      return circle;
    }
  }
  return null;
};

interface Point {
  x: number;
  y: number;
}

interface Circle {
  x: number;
  y: number;
  angle: number;
  number: number;
}
