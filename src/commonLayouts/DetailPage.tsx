import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../common/colorConstants';
import {size} from '../common/constants';
import PodcastEpisodeListitem from '../commonLayouts/PodcastEpisodeListItem';
import _ from 'lodash';
import CacheImage from '../common/CacheImage';

const DetailPage = ({detailPageData, onPodcastClick, loadMore}) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [isMoreText, setIsMoreText] = useState(false);
  const navigation = useNavigation();
  const [favourite, setFavourite] = useState(false);
  const playIcon = 'arrow-right-drop-circle';
  const pauseIcon = 'pause-circle';

 const toggleViewMore = () => {
    setIsViewMore(!isViewMore);
  };

  const onTextLayout = useCallback(e => {
    setIsMoreText(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  // const renderItem = ({item, index}) => {
  //   return (
  //     <View style={style.flatListContainer}>
  //         <TouchableOpacity onPress = {onPodcastClick}>
  //       <View style={style.leftSideContainer}>
  //         <Text style={style.episodeAndTime}>{`Episode ${index} - Apr 6`}</Text>

  //         <Text style={style.podcastTitleText}>{item.podcastTitle}</Text>
  //         <Text style={style.podcastDescriptionText} numberOfLines={3}>
  //           {item.description}
  //         </Text>
  //       </View>
  //       </TouchableOpacity>
  //       <View style={style.rightSideContainer}>
  //         <View style={style.iconStyle}>
  //           <MaterialCommunityIcons name={playIcon} size={40} color = {colors.appTheme} />
  //         </View>
  //         <Text style={style.durationText}>{item.duration}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  const getArtistName = (artists: String[]) => {
    if (artists) {
      return _.join(_.map(artists, 'name'));
    } else {
      return '';
    }
  };

  const getIcon = () => {};

  const headerComponent = () => {
    return (
      <View>
        <View style={style.detailContainer}>
          <View style={style.detailRowContainer}>
            <CacheImage
              style={style.imageStyle}
              image={detailPageData?.details?.thumbnail}
            />
            <View style={style.titleContainer}>
              <View>
                <Text style={style.titleTxt}>
                  {detailPageData?.details?.name}
                </Text>

                <Text style={style.subTitleText}>
                  by {getArtistName(detailPageData?.details?.podcast_artists)}
                </Text>
              </View>
              <TouchableOpacity
                style={style.favContainer}
                onPress={() => setFavourite(!favourite)}>
                <MaterialCommunityIcons
                  name="heart"
                  color={
                    favourite ? colors.appTheme : colors.secondaryText
                  }
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={style.descriptionText}
            onTextLayout={onTextLayout}
            numberOfLines={isViewMore ? undefined : 3}>
            {detailPageData?.details?.description}
          </Text>
          {isMoreText ? (
            <TouchableOpacity onPress={() => toggleViewMore()}>
              <Text style={style.showMoreText}>
                {isViewMore ? 'show less' : 'show more'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={style.listHeaderText}>Episodes</Text>
      </View>
    );
  };
  console.log('data..', detailPageData);
  return (
    <View style={style.container}>
      <View style={style.flatListOuterContainer}>
        <FlatList
          data={detailPageData?.episodes}
          keyExtractor={item => item.podcastTitle}
          renderItem={({item, index}) => (
            <PodcastEpisodeListitem
              item={item}
              index={index}
              onPodcastClick={onPodcastClick}
              fullData={detailPageData?.episodes}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          ListHeaderComponent={headerComponent}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.appBackground,
  },
  detailContainer: {
    paddingTop: 10,
    borderBottomColor: colors.secondaryText,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  detailRowContainer: {
    height: 100,
    width: '100%',
    // backgroundColor: 'green',
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  titleTxt: {
    fontSize: size.md,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  subTitleText: {
    fontSize: size.sm,
    color: colors.secondaryText,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  descriptionText: {
    marginTop: size.md,
    color: colors.primaryText,
    textAlign: 'justify',
  },
  listHeaderText: {
    color: colors.primaryText,
    fontSize: size.lg,
    fontWeight: 'bold',
    marginTop: 20,
  },
  flatListOuterContainer: {},
  flatListContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.secondaryText,
    marginVertical: 10,
    borderRadius: 10,
  },
  leftSideContainer: {
    width: '90%',
    flexDirection: 'column',
    padding: 10,
    // backgroundColor: 'red'
  },
  rightSideContainer: {
    width: '15%',
    alignSelf: 'center',
    // backgroundColor: 'green'
  },
  podcastTitleText: {
    fontSize: size.md,
    color: colors.primaryText,
    fontWeight: '700',
  },
  podcastDescriptionText: {
    color: colors.primaryText,
    textAlign: 'justify',
    fontSize: size.sm,
  },
  durationText: {
    fontSize: size.sm,
    alignSelf: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  episodeAndTime: {
    // flexDirection: 'row'
    color: colors.secondaryText,
    fontSize: size.sm,
  },
  showMoreText: {
    color: colors.secondaryText,
  },
  favContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  favText: {
    marginLeft: 5,
  },
});

export default DetailPage;
