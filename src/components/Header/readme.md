## STARTER FOR ANIMATED HEADER FLATLIST

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Size from '../styles/Size';
import Color from '../styles/Color';
import Fontstyle from '../styles/Fontstyle';

const Header = props => {
return (
<View
style={{
        height: Size.OF24,
        width: '92%',
        alignSelf: 'center',
      }}>
<View
style={{
          flex: 1,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
<Text style={[Fontstyle.FONT_XLARGE, {color: Color.white}]}>
{props.headername}
</Text>
<View
style={{
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
{/_ <TouchableOpacity
style={{
              height: Size.OF5,
              width: Size.OF5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.white,
              borderRadius: 25,
            }}>
<Image
source={require('icons/symbols/search.png')}
style={{
                padding: Size.OF1,
                height: Size.OF4,
                width: Size.OF4,
                resizeMode: 'contain',
                borderRadius: 20,
              }}
/>
</TouchableOpacity> _/}
<TouchableOpacity
style={{
              height: Size.OF7,
              width: Size.OF7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
<Image
source={require('icons/symbols/notification.png')}
style={{
                height: Size.OF6,
                width: Size.OF6,
                resizeMode: 'contain',
                borderRadius: 20,
              }}
/>
</TouchableOpacity>
<TouchableOpacity style={{height: Size.OF7, width: Size.OF7}}>
<Image
source={require('icons/leads/user.png')}
style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
/>
</TouchableOpacity>
</View>
</View>
<View style={{flex: 1.3, justifyContent: 'space-around'}}>
<Text style={[Fontstyle.FONT_LARGE_SIMPLE, {color: Color.white}]}>
<Text style={[Fontstyle.FONT_LARGE, {color: Color.white}]}>
{props.totalCount}{' '}
</Text>{' '}
{props.label1}
</Text>
<Text style={[Fontstyle.FONT_LARGE_SIMPLE, {color: Color.white}]}>
<Text style={[Fontstyle.FONT_LARGE, {color: Color.white}]}>
{props.subCount}{' '}
</Text>{' '}
{props.label2}
</Text>
</View>
<TouchableOpacity
onPress={() => props.navigation.navigate('Search', {\_sub: props.\_sub})}
style={{
          height: Size.OF6,
          borderRadius: 30,
          width: '100%',
          elevation: 5,
          marginVertical: Size.OF1,
          alignSelf: 'center',
          justifyContent: 'center',
          paddingHorizontal: Size.OF2,
          backgroundColor: Color.white,
        }}>
<Image
source={require('icons/symbols/search.png')}
style={{
            padding: Size.OF1,
            height: Size.OF4,
            width: Size.OF4,
            resizeMode: 'contain',
            borderRadius: 20,
          }}
/>
</TouchableOpacity>
</View>
);
};

export default Header;
