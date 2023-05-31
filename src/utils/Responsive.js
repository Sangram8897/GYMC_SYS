import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
export const responsiveHeight = h => {
  const { height } = Dimensions.get('window');
  return height * (h / 100);
};
export const responsiveWidth = w => {
  const { width } = Dimensions.get('window');
  return width * (w / 100);
};
export const responsiveFontSize = f => {
  const { width } = Dimensions.get('window');
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};
export const useResponsiveHeight = h => {
  const [calculatedHeight, setCalculatedHeight] = useState(responsiveHeight(h));
  useEffect(() => {
    function handleDimensionChange() {
      setCalculatedHeight(responsiveHeight(h));
    }
    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', handleDimensionChange);
    };
  });
  return calculatedHeight;
};
export const useResponsiveWidth = w => {
  const [calculatedWidth, setCalculatedWidth] = useState(responsiveWidth(w));
  useEffect(() => {
    function handleDimensionChange() {
      setCalculatedWidth(responsiveWidth(w));
    }
    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', handleDimensionChange);
    };
  });
  return calculatedWidth;
};
export const useResponsiveFontSize = f => {
  const [calculatedFontSize, setCalculatedFontSize] = useState(
    responsiveFontSize(f),
  );
  useEffect(() => {
    function handleDimensionChange() {
      setCalculatedFontSize(responsiveFontSize(f));
    }
    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', handleDimensionChange);
    };
  });
  return calculatedFontSize;
};