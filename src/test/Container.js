import React from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '@Theme'



const Container = (props) => {
  const netInfo = useNetInfo();
  const { Layout, Gutters, Colors, Fonts, Common, DualThemeColors } = useTheme()

  return (
    <View style={[Gutters.tinyVMargin,props.style]}>
      {props.children}
      {(props.isLoading && netInfo.isConnected) && (
        <View style={[styles.fullScreen,{backgroundColor:Colors.whiteOpacity}]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
};
const styles = {
  fullScreen: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    zIndex: 9,
  },
  container: {
    flex: 1,
  },
  sub_container: {
    flex: 1,
  },
  zIndex: {
    flex: 1,
    zIndex: 0,
  },
};



export default Container;
