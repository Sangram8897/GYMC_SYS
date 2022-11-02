import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { ColorThemeContext } from '../context/theme_context';

const Container = props => {

  const { Colors } = useContext(ColorThemeContext);
  const netInfo = useNetInfo();

  console.log('theme123', Colors)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.COLOR_TYPE_1 }]}>
      <StatusBar
        style={{ zIndex: 1000 }}
        animated={true}
        showHideTransition={'none'}
        backgroundColor={Colors.COLOR_TYPE_1}
        barStyle={Colors.THEME_TYPE == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View {...props} style={styles.sub_container}>
        {props.children}
      </View>

      {(props.isLoading && netInfo.isConnected) && (
        <View style={styles.fullScreen}>
          <ActivityIndicator size="large" color={Colors.COLOR_PRIMARY} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = {
  fullScreen: {
    // backgroundColor: Colors.COLOR_BLACK_TRANSP,
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    zIndex: 9,
  },
  container: {
    flex: 1,
    //backgroundColor: '#F4F5FA'//Colors.COLOR_WHITE
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
