import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import CacheImage from '../common/CacheImage';
import colors from '../common/colorConstants';
import {size, wp} from '../common/constants';

interface Props {
  gridViewData: any;
  onGridItemPress: any;
  loadMore: any;
  headerName?: any;
}

const GridView = ({
  gridViewData,
  onGridItemPress,
  loadMore,
  headerName,
}: Props) => {
  const HeaderComponent = () => {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.headingText} numberOfLines={1}>
          {headerName}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{width: wp(40), marginHorizontal: wp(5), marginVertical: wp(2)}}
        onPress={() => onGridItemPress(item, index)}>
        <CacheImage style={styles.imageStyle} image={item?.thumbnail} />
        <Text style={styles.titleText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={gridViewData}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={loadMore}
        ListHeaderComponent={headerName ? HeaderComponent : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  titleText: {
    color: colors.primaryTextColor,
    fontSize: size.medium,
    marginVertical: wp(0.5),
  },
  subTitleText: {
    fontSize: size.small,
    color: colors.secondaryTextColor,
  },
  headingContainer: {
    marginLeft: wp(5),
    marginRight: wp(5),
    paddingTop: 10,
    paddingBottom: 5,
  },
  headingText: {
    fontSize: size.large,
    color: colors.primaryTextColor,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: wp(40),
    height: wp(40),
    borderRadius: 10,
  },
});

export default GridView;
