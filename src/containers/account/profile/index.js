import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ColorThemeContext } from '../../../context/theme_context';
import Themes from '../../../style/AppThemeColors';

const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = useContext(ColorThemeContext)

  useEffect(() => {
    console.log('theme.Colors.COLOR_THEME', theme.Colors.COLOR_THEME)
    if (theme.Colors.COLOR_THEME == 'dark') setIsEnabled(true)
  }, [])
  const toggleSwitch = () => {
    theme.ToggleTheme()
    console.log('theme.Colors.COLOR_THEME', theme.Colors.COLOR_THEME)
    console.log('theme.Colors.COLOR_THEME', Themes.lightTheme)
    // if (theme.Colors.COLOR_THEME == 'light') theme.setColors(Themes.darkTheme)
    // else theme.setColors(Themes.lightTheme)
    setIsEnabled(isEnabled => !isEnabled)
  }

  return (
    <View>
      <Text>Profile</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})