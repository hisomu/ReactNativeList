import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Image } from 'react-native';

import TabNavigation from './src/components/TabNavigation';

export default createStackNavigator ({
  home: {
    screen: TabNavigation,
    navigationOptions: () => ({
      headerTitle: (<View style={{ flex: 1, alignItems: "center"}}><Image source={require('./assets/logo.png')} style={{width: 40, height: 40 }} /></View>),
      headerStyle:{
        // iOS
        borderBottomWidth:0,
        // Android
        elevation:0
      }
    })
  }
});