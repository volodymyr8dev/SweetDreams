import { COLORS } from "../../../../styles/Constants";

export const chartConfigDays = {
  topRadius: 8,
  bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  height: 1500,
  barPercentage: 0.95,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: '#B865C1',
  fillShadowGradientOpacity: 1,
  style: {borderRadius: 16},
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.3',
  },
};
export const chartConfigWA = {
  // topRadius: 8,
  // bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  // height: 1500,
  barPercentage: 0.90,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: '#B865C1',
  fillShadowGradientOpacity: 1,
  style: {borderRadius: 16},
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.3',
  },
};
export const chartConfigMonth = {
  topRadius: 8,
  bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  barPercentage: 1.4,
  decimalPlaces: 1,
  height: 1500,
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: "#B865C1",
  fillShadowGradientOpacity: 1,
  style: {borderRadius: 16},
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.3',
  },
};

export const LineChartConfig = {
  backgroundColor: 'transparent',
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const chartConfig = {
  topRadius: 8,
  bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  barPercentage: 1,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: `rgb(184, 101, 193)`,
  fillShadowGradientOpacity: 1,
  style: {borderRadius: 16},
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.3',
  },
};