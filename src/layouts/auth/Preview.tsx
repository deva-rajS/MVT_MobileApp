import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../common/colorConstants';
import {hp, rootNames, rw, size, wp} from '../../common/constants';
import AuthButton from '../../commonLayouts/AuthButtton';
import Logo from '../../commonLayouts/Logo';
import OAuthLogin from '../../commonLayouts/OAuthLogin';

const Preview = ({navigation}) => {
  const goToLoginPage = () => {
    navigation.navigate(rootNames.SIGN_IN);
  };
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.body}>
        <OAuthLogin />
        <Text style={styles.or}>- OR -</Text>
        <AuthButton {...{action: goToLoginPage, requesting: false}}>
          <Icon name="envelope" style={styles.icon} />
          <Text style={styles.loginText}>Sign in with Email</Text>
        </AuthButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  or: {
    color: colors.grey,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: size.md,
    fontWeight: 'bold',
    color: colors.white,
  },
  icon: {
    fontSize: rw(20),
    color: colors.white,
    marginRight: rw(10),
  },
});

export default Preview;
