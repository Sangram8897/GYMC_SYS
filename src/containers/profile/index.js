import React, { useState, useContext } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { ColorThemeContext } from "../../context/theme_context";
import Themes from "../../style/AppThemeColors";


//import CircularProgress from 'react-native-circular-progress-indicator';

const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = useContext(ColorThemeContext)

  const toggleSwitch = () => {
    console.log('theme.Colors.COLOR_THEME', theme.Colors.COLOR_THEME)
    if (theme.Colors.COLOR_THEME == 'light') theme.setColors(Themes.darkTheme)
    else theme.setColors(Themes.lightTheme)
    setIsEnabled(previousState => !previousState)
  }


  return (
    <View style={[styles.container, { backgroundColor: theme.Colors.COLOR_BACKGROUND }]}>
      {/* <CircularProgress
        value={60}
        radius={120}
        duration={2000}
        progressValueColor={'#ecf0f1'}
        maxValue={200}
        title={'KM/H'}
        titleColor={'white'}
      /> */}
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;

// import React, { useEffect } from 'react';
// import { useCallback } from 'react';
// import { Dimensions, TouchableOpacity } from 'react-native';
// import { StyleSheet, Text, View } from 'react-native';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedProps,
// } from 'react-native-reanimated';
// import { useDerivedValue } from 'react-native-reanimated';
// import { ReText } from 'react-native-redash';

// import Svg, { Circle } from 'react-native-svg';

// const BACKGROUND_COLOR = '#444B6F';
// const BACKGROUND_STROKE_COLOR = '#303858';
// const STROKE_COLOR = '#A6E1FA';

// const { width, height } = Dimensions.get('window');

// const CIRCLE_LENGTH = 1000; // 2PI*R
// const R = CIRCLE_LENGTH / (2 * Math.PI);

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// export default function Profile() {
//   const progress = useSharedValue(0);

//   const animatedProps = useAnimatedProps(() => ({
//     strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
//   }));

//   const progressText = useDerivedValue(() => {
//     return `${Math.floor(progress.value * 100)}`;
//   });

//   const onPress = useCallback(() => {
//     progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ReText style={styles.progressText} text={progressText} />
//       <Svg style={{ position: 'absolute' }}>
//         <Circle
//           cx={width / 2}
//           cy={height / 2}
//           r={R}
//           stroke={BACKGROUND_STROKE_COLOR}
//           strokeWidth={30}
//         />
//         <AnimatedCircle
//           cx={width / 2}
//           cy={height / 2}
//           r={R}
//           stroke={STROKE_COLOR}
//           strokeWidth={15}
//           strokeDasharray={CIRCLE_LENGTH}
//           animatedProps={animatedProps}
//           strokeLinecap={'round'}
//         />
//       </Svg>
//       <TouchableOpacity onPress={onPress} style={styles.button}>
//         <Text style={styles.buttonText}>Run</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BACKGROUND_COLOR,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressText: {
//     fontSize: 80,
//     color: 'rgba(256,256,256,0.7)',
//     width: 200,
//     textAlign: 'center',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 80,
//     width: width * 0.7,
//     height: 60,
//     backgroundColor: BACKGROUND_STROKE_COLOR,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 25,
//     color: 'white',
//     letterSpacing: 2.0,
//   },
// });

// import React, { useState, useContext } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { ColorThemeContext } from "../../context/theme_context";
// import Themes from "../../style/AppThemeColors";
// const Profile = () => {
//   const theme = useContext(ColorThemeContext)
//   console.log('theme',theme)
//   return (
//     <View>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})
