import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../common/colorConstants';
import {rootNames, wp} from '../common/constants';
import PodcastFavouriteDetailScreen from '../layouts/favourite/PodcastFavouriteDetailScreen';
import PodcastFavoriteDescriptionScreen from '../layouts/favourite/PodcastFavoriteDescriptionScreen';
import PodcastFavourite from '../layouts/favourite/PodcastFavourite';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeHeader from '../commonLayouts/HomepageHeader';

const Stack = createNativeStackNavigator();

const backArrow = (route, nav) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: wp(15),
        backgroundColor: colors.appBackground,
      }}
    >
      <TouchableOpacity onPress={() => nav.goBack()}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.appTheme}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
};

// const homeHeader = () => {
//   return(
//     <View style ={{   height: wp(15), backgroundColor : colors.appBackgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
//       <TouchableOpacity  onPress = {() => navigation.toggleDrawer()} style = {{position: 'absolute', left: 15}}>
//       <MaterialCommunityIcons name="menu" color={colors.appTheme} size={30}  />
//     </TouchableOpacity>
//     <Image
//     style = {{width: 70, height: 45, }}
//     source={LOGO}
//     />

//     </View>
//   )
// }

const FavouritePodcastNavigator = ({route, navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName={rootNames.FAVOURITE_PODCAST}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: colors.white},
      }}
    >
      <Stack.Screen
        name={rootNames.FAVOURITE_PODCAST}
        component={PodcastFavourite}
        // options={{
        //   // title: constants.appName,
        //   // headerTintColor: colors.primaryTextColor,
        //   // headerTitleAlign: 'center',
        //   // headerLeft: () => (
        //   //   <MaterialCommunityIcons
        //   //     name="menu"
        //   //     color={colors.appTheme}
        //   //     size={30}
        //   //     onPress={() => navigation.toggleDrawer()}
        //   //   />
        //   // ),
        //   header: () => homeHeader()
        // }}
        options={({route, navigation}) => ({
          header: () => HomeHeader(route, navigation),
        })}
      />
      <Stack.Screen
        name={rootNames.PODCAST_FAVORITE_DETAIL_SCREEN}
        component={PodcastFavouriteDetailScreen}
        options={({route, navigation}) => ({
          header: () => backArrow(route, navigation),
        })}
      />
      <Stack.Screen
        name={rootNames.PODCAST_FAVORITE_DESCRIPTION_SCREEN}
        component={PodcastFavoriteDescriptionScreen}
        options={({route, navigation}) => ({
          header: () => backArrow(route, navigation),
        })}
      />
    </Stack.Navigator>
  );
};

export default FavouritePodcastNavigator;
