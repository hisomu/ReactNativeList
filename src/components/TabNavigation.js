import { createMaterialTopTabNavigator } from 'react-navigation';

import {PRIMARY_COLOR, BRAND_COLOR} from '../styles/variables';
import FeedList from '../components/FeedList';

export default createMaterialTopTabNavigator ( {
  todayTab: {
    screen: FeedList,
    navigationOptions: {
      title: 'today',
    },
  },
  trendingTab: {
    screen: FeedList,
    navigationOptions: {
      title: 'trending',
    },
  },
  discoverTab: {
    screen: FeedList,
    navigationOptions: {
      title: 'discover',
    },
  },
  musicTab: {
    screen: FeedList,
    navigationOptions: {
      title: 'music',
    },
  },
  foodTab: {
    screen: FeedList,
    navigationOptions: {
      title: 'food',
    },
  },
},
{
  lazy: true,
  animationEnabled: false,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: PRIMARY_COLOR,
    inactiveTintColor: 'gray',
    scrollEnabled: true,
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 16,
      fontWeight: '700'
    },
    tabStyle: {
      width: 95
    },
    indicatorStyle: {
      backgroundColor: BRAND_COLOR
    },
    style: {
      backgroundColor: '#FFF'
    }
  }
});