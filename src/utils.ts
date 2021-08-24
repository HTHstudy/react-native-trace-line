import {svgPathProperties} from 'svg-path-properties';

export const getPathProperty = (path: string, totalSlice: number) => {
  const pathProperty = new svgPathProperties(path);
  const pathSegmentArray = [];
  for (let i = 1; i <= totalSlice; ++i) {
    const leaderSegment = (i / totalSlice) * pathProperty.getTotalLength();
    const {x: lx, y: ly} = pathProperty.getPropertiesAtLength(leaderSegment);
    const point: Point = {x: lx, y: ly};
    pathSegmentArray.push(point);
  }
  return pathSegmentArray;
};

const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
  var rad = Math.atan2(y2 - y1, x2 - x1);
  return (rad * 180) / Math.PI;
};
export const getAngles = (points: any) => {
  let angles = [getAngle(points[0].x, points[0].y, points[1].x, points[1].y)];

  for (let i = 0; i < points.length - 1; i++) {
    angles.push(
      getAngle(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y),
    );
  }
  return angles;
};

export type Point = {
  x: number;
  y: number;
};
