import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../common/colorConstants';
import {size, wp} from '../common/constants';
import {PodcastContext} from '../context/PodcastContext';
import PodcastEpisodeListitem from './PodcastEpisodeListItem';

const DescriptionPage = ({descriptionPageData, onPodcastClick}) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [isMoreText, setIsMoreText] = useState(false);
  const {onPlayAudio, pausePlayer, onResumeAudio, currentSong, isPlaying} =
    useContext(PodcastContext);
  const [currentDetail, setCurrentDetail] = useState({});
  const navigation = useNavigation();
  const playIcon = 'arrow-right-drop-circle';
  const pauseIcon = 'pause-circle';
  const currentIndex = useRoute()?.params?.currentIndex;

  const dummyData = () => {
    const data = [];
    for (let i = 0; i <= 20; i++) {
      data.push({
        podcastTitle: `podcast${i}`,
        description: `An essay is, generally, a piece of writing that gives the author's own argument, but the definition is vague, overlapping with those of a letter, a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme${i}`,
        duration: '30 Min',
      });
    }

    return data;
  };

  useEffect(() => {
    console.log('descriptionPageData', descriptionPageData);

    if (typeof currentIndex === 'number' && descriptionPageData?.podcasts) {
      setCurrentDetail(descriptionPageData?.podcasts[currentIndex]);
    }
  }, []);

  const getPlayerState = () => {
    // console.log('curentdetail', currentDetail, currentIndex);

    if (currentDetail?.id == currentSong?.id && isPlaying) {
      return true;
    } else {
      return false;
    }
  };
  const toggleViewMore = () => {
    setIsViewMore(!isViewMore);
  };

  const onClick = (item, index) => {
    setCurrentDetail(item);

    if (onPodcastClick) {
      onPodcastClick(item, index);
    }
  };

  const onTextLayout = useCallback(e => {
    setIsMoreText(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const onPlayClick = (item, index) => {
    const songs = descriptionPageData?.podcasts;

    onPlayAudio({songs, index});
  };

  const onPauseClick = (item, index) => {
    pausePlayer();
  };

  const onResumeClick = (item, index) => {
    onResumeAudio(item);
  };

  const playOrPauseClick = (item, index) => {
    setCurrentDetail(item);
  };

  const togglePlayer = () => {
    if (currentDetail?.id == currentSong?.id && isPlaying) {
      onPauseClick(currentDetail, currentIndex);
    } else if (currentDetail?.id == currentSong?.id && !isPlaying) {
      onResumeClick(currentDetail, currentIndex);
    } else {
      onPlayClick(currentDetail, currentIndex);
    }
  };

  const headerComponent = () => {
    return (
      <View>
        <View style={style.detailContainer}>
          <View style={style.detailRowContainer}>
            <Image
              style={style.imageStyle}
              source={{
                uri: 'https://st2.depositphotos.com/1105977/5461/i/950/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg',
              }}
            />
            <View style={style.titleContainer}>
              <Text style={style.titleTxt}>{currentDetail?.name}</Text>
              <Text style={style.subTitleText}>{`by Wondery`}</Text>
              <Text style={style.subTitleText}>{`English`}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              marginTop: 10,
              backgroundColor: colors.appTheme,
              width: wp(70),
              height: wp(10),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={togglePlayer}
          >
            <Text
              style={{color: colors.primaryText, fontSize: size.md}}
            >
              {getPlayerState() ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          <Text
            style={style.descriptionText}
            onTextLayout={onTextLayout}
            numberOfLines={isViewMore ? undefined : 3}
          >
            {currentDetail?.description || ''}
          </Text>
          {isMoreText ? (
            <TouchableOpacity onPress={() => toggleViewMore()}>
              <Text style={style.showMoreText}>
                {isViewMore ? 'show less' : 'show more'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={style.listHeaderText}>Trailer</Text>
      </View>
    );
  };
  return (
    <View style={style.container}>
      <View style={style.flatListOuterContainer}>
        <FlatList
          data={descriptionPageData?.podcasts}
          keyExtractor={item => item.podcastTitle}
          renderItem={({item, index}) => (
            <View style={style.podcastEpisodeCon}>
              <PodcastEpisodeListitem
                item={item}
                index={index}
                onPodcastClick={onClick}
                fullData={descriptionPageData}
                playOrPauseClick={playOrPauseClick}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
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
  showMoreText: {
    color: colors.secondaryText,
  },
  podcastEpisodeCon: {
    paddingLeft: 10,
  },
});

export default DescriptionPage;
