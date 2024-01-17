import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// import NativeButton from 'apsl-react-native-button';

// const styles: any = StyleSheet.create({
//   btn: {
//     backgroundColor: 'transparent',
//     alignSelf: 'center',
//     borderRadius: 4,
//     borderWidth: 2,
//     width: 320,
//     height: 52,
//     borderColor: 'white',

//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnDisabled: {
//     backgroundColor: 'rgb(243,243,243)',
//     alignSelf: 'center',
//     borderRadius: 4,
//     borderWidth: 2,
//     width: 320,
//     height: 52,
//     borderColor: '#333',

//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   txt: {
//     fontSize: 14,
//     color: 'white',
//   },
//   imgLeft: {
//     width: 24,
//     height: 24,
//     position: 'absolute',
//     left: 16,
//   },
// });

interface ItemProps {
  isDisabled?: boolean;
  onPress?: () => void;
  buttonStyle: any;
  children: any;
}

const Button = ({onPress, buttonStyle, isDisabled, children}: ItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <View style={isDisabled ? buttonStyle.disabledBtn : buttonStyle.btn}>
        <Text style={isDisabled ? buttonStyle.disabledText : buttonStyle.txt}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// class Button extends Component<ItemProps, any> {

//   constructor(props: ItemProps) {
//     super(props);

//   }

//   public render() {
//     // if (this.props.isDisabled) {
//     //   return (
//     //     <View style={this.props.disabledStyle}>
//     //       <Text style={this.props.textStyle}>{this.props.children}</Text>
//     //     </View>
//     //   );
//     // }
//     if (this.props.isLoading) {
//       return (
//         <View style={this.props.style}>
//           <ActivityIndicator size="small" color={this.props.indicatorColor} />
//         </View>
//       );
//     }
//     return (
//       <TouchableOpacity
//         onPress={this.props.onPress}
//       >
//         <View style={this.props.style}>
//           {this.props.imgLeftSrc ? (
//             <Image
//               style={this.props.imgLeftStyle}
//               source={this.props.imgLeftSrc}
//             />
//           ) : null}
//           <Text style={this.props.textStyle}>{this.props.children}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

export default Button;
