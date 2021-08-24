import React, {useState} from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {getAngles, getPathProperty, Point} from './utils';
import {Circle, G, Path, Rect, Svg} from 'react-native-svg';

const TOUCH_RANGE = 24;
const leadLine =
  'M195.774 51.8061C179.122 51.8061 163.331 49.3063 148.504 56.9318C137.569 62.5554 126.858 70.9182 115.756 75.4411C98.7638 82.364 89.5769 93.3369 79.0224 106.907C53.3603 139.901 57.3807 188.15 57.3807 228.072C57.3807 244.355 58.5865 279.354 75.3205 289.58C83.1559 294.368 90.2168 299.901 98.386 304.103C113.305 311.776 128.029 315.121 144.232 319.622C174.204 327.947 206.219 326.408 236.494 320.903C259.394 316.74 282.932 289.416 291.168 268.508C296.774 254.276 307.325 241.968 310.532 226.648C312.864 215.502 311.803 203.699 314.233 192.762C319.485 169.13 305.968 150.796 285.473 139.085C272.681 131.775 255.085 128.58 240.908 125.132C224.348 121.104 206.44 118.602 189.651 116.019C173.53 113.539 146.239 123.029 137.398 138.942C126.539 158.489 133.204 181.778 134.266 203.013C135.883 235.367 175.578 229.187 198.336 225.936C217.21 223.24 228.305 209.088 223.822 188.918C220.264 172.906 206.837 172.259 193.211 172.259';

const TraceLine = () => {
  const points = getPathProperty(leadLine, 30);
  const angles = getAngles(points);
  const [index, setIndex] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      if (index < 0) {
        setIndex(0);
      }
    },
    onPanResponderMove: event => handlePanResponderMove(event),
  });

  const handlePanResponderMove = (event: GestureResponderEvent) => {
    if (index >= points.length) {
      return;
    }
    const {locationX, locationY} = event.nativeEvent;

    if (
      Math.abs(locationX - points[index].x) < TOUCH_RANGE &&
      Math.abs(locationY - points[index].y) < TOUCH_RANGE
    ) {
      setIndex(prev => (prev += 1));
    }
  };
  return (
    <View style={styles.background}>
      <Svg
        {...panResponder.panHandlers}
        width="375"
        height="369"
        viewBox="0 0 375 369"
        fill="none"
      >
        <Path d="M187.5 29.5686L223.51 136.644L223.624 136.984H223.984H340.464L246.244 203.122L245.939 203.337L246.058 203.691L282.056 310.731L187.787 244.559L187.5 244.358L187.213 244.559L92.9444 310.731L128.942 203.691L129.061 203.337L128.756 203.122L34.5359 136.984H151.016H151.376L151.49 136.644L187.5 29.5686Z" />
        {points?.map((point: Point, i: number) => {
          return (
            <G key={i} x={point.x} y={point.y}>
              <Circle
                cx={0}
                cy={0}
                r={6}
                fill={i < index ? '#F8D201' : '#E5E5EA'}
              />
            </G>
          );
        })}
        {index < points.length && (
          <G
            transform={`rotate(${
              index < angles.length
                ? angles[index] - 90
                : angles[angles.length - 1] - 90
            } 0 0)`}
            x={index > 0 ? points[index - 1].x : points[0].x}
            y={index > 0 ? points[index - 1].y : points[0].y}
          >
            <G x={-12} y={-12}>
              <Circle cx="12" cy="12" r="12" fill="#FF4026" />
              <Rect
                x="14.6663"
                y="11.749"
                width="5.33335"
                height="6.41668"
                transform="rotate(-180 14.6663 11.749)"
                fill="white"
              />
              <Path
                d="M11.9998 20L5.07158 11.75L18.928 11.75L11.9998 20Z"
                fill="white"
              />
            </G>
          </G>
        )}
      </Svg>
      <TouchableOpacity style={styles.reset} onPress={() => setIndex(0)}>
        <Text style={styles.reset_text}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TraceLine;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ADADAD',
  },
  reset: {
    backgroundColor: 'red',
  },
  reset_text: {
    fontSize: 24,
    textAlign: 'center',
  },
});
