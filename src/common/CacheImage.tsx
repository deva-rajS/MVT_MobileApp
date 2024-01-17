import React, { FC, useState } from 'react';
import { Image, StyleSheet, ActivityIndicator, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../assets';
import { baseURL } from '../service/networks';
import colors from './colorConstants';
interface Props {
  image: string;
  style?: any;
  resizeMode?: any;
}

const CacheImage: FC<Props> = ({ image, style, resizeMode }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const imageStyle = [styles.img, style ? style : {}];
  const loadStart = () => {
    setLoading(true);
  };
  const loadEnd = () => {
    setLoading(false);
  };

  if (
    image === null ||
    image === undefined ||
    image?.length === 0 ||
    typeof image === 'number'
  ) {
    return (
      <Image
        source={images.placeholder}
        style={[imageStyle, { resizeMode: 'contain' }]}
      />
    );
  }
  return (
    <View style={imageStyle}>
      <FastImage
        source={{
          uri: image,
          headers: {
            Referer: baseURL,
          },
        }}
        onLoad={loadStart}
        onLoadEnd={loadEnd}
        onError={loadStart}
        style={imageStyle}
        resizeMode={style?.resizeMode || 'stretch'}
      />
      {/* {loading && (
        <ActivityIndicator
          style={styles.indicator}
          color={colors.primaryText}
          size="small"
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    resizeMode: 'stretch',
  },
  indicator: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    // backgroundColor: colors.white,
  },
});

export default CacheImage;
