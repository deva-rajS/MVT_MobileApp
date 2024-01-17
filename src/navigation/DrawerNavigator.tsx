import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import constants from '../common/constants';
import TabBar from './TabBar';
import CustomDrawer from '../commonLayouts/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={constants.rootNames.TAB_BAR}
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
