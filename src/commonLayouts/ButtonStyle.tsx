import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import colors from '../common/colorConstants';
import {size, wp} from '../common/constants';

interface Props {
  buttonWidth: number;
  buttonText: string;
  bgColor: string;
  brdColor: string;
  textColor: string;
  textStyle?: number;
  noUpperCase?: boolean;
  onPress: (() => void) | null;
  icon?: any;
  disabled?: boolean;
  children?: any;
}
const Buttonstyle: React.FC<Props> = ({
  buttonWidth,
  buttonText,
  bgColor,
  brdColor,
  textColor,
  onPress,
  textStyle,
  children,
  noUpperCase,
  icon,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderColor: brdColor,
          shadowColor: bgColor,
          width: buttonWidth,
        },
      ]}
      disabled={disabled}
      delayPressIn={5}
      onPress={onPress}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.row}>
        <Text
          style={[
            styles.text,
            {color: textColor, fontSize: textStyle || size.mediumfontsize},
            noUpperCase ? styles.none : styles.upper,
          ]}
        >
          {buttonText}
        </Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: colors.white,
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 10, //10,
    flexDirection: 'row',
  },
  text: {
    // fontFamily: font.semibold,
    textAlign: 'center',
  },
  none: {
    textTransform: 'none',
  },
  upper: {
    textTransform: 'uppercase',
  },
  row: {flexDirection: 'row'},
  iconContainer: {
    position: 'absolute',
    left: 0,
  },
});
export default Buttonstyle;
