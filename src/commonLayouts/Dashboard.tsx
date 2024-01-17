import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {size, wp} from '../common/constants';
import colors from '../common/colorConstants';
import Carousel, {Pagination} from 'react-native-x2-carousel';
import PodcastEpisodeListitem from './PodcastEpisodeListItem';
import CacheImage from '../common/CacheImage';

const Dashboard = ({
  latestEpisodes,
  browseByData,
  dashboardData,
  onSeeAllPress,
  onPodcastClick,
  onBrowseByClick,
  onPodcastItemClick,
  onLatestSeeAllPress,
}) => {
  const carouselDummyData = () => {
    let data = [];

    for (let i = 0; i < 5; i++) {
      if ((i + 1) % 2 == 0) {
        data.push({
          id: i,
          image:
            'https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg',
        });
      } else {
        data.push({
          id: i,
          image:
            'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg',
        });
      }
    }

    return data;
  };

  const renderCarousel = item => {
    return (
      <View key={item.id} style={{height: wp(55), width: wp(90)}}>
        <Image
          style={{
            width: '100%',
            height: wp(45),
            borderRadius: 15,
            overflow: 'hidden',
          }}
          source={{uri: item.image}}
        />
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View
        style={{width: wp(90), alignItems: 'center', justifyContent: 'center'}}>
        <Carousel
          pagination={Pagination}
          renderItem={renderCarousel}
          data={carouselDummyData()}
          // loop={true}
          // autoplay={true}
        />
      </View>
    );
  };

  const renderRail = ({item, index}) => (
    <View style={styles.imageRailContainer}>
      <TouchableOpacity onPress={() => onPodcastClick(item, index)}>
        <View style={styles.imageContainer}>
          <CacheImage style={styles.imageStyle} image={item.thumbnail} />
          <MaterialCommunityIcons
            name="play-circle-outline"
            color={'white'}
            size={40}
            style={styles.overlayIcon}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.podcastTitle} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.podcastSubTitle} numberOfLines={1}>
        {item.description}
      </Text>
    </View>
  );

  const renderItem = ({item, index}) => {
    if (item?.type === 'browseBy') {
      return <BrowseByComponent />;
    } else if (item?.type === 'latest') {
      return (
        <View style={styles.latestCon}>
          <View style={styles.railContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.railTitleText} numberOfLines={1}>
                Latest
              </Text>
            </View>
            <TouchableOpacity
              style={styles.seeAllContainer}
              onPress={() => onLatestSeeAllPress(item, index)}>
              <Text style={styles.railSeeAllText} numberOfLines={1}>
                see all
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.latestItemCon}>
            <FlatList
              data={latestEpisodes}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <PodcastEpisodeListitem
                  item={item}
                  index={index}
                  onPodcastClick={onPodcastItemClick}
                  fullData={latestEpisodes}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.railContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.railTitleText} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.seeAllContainer}
              onPress={() => onSeeAllPress(item, index)}>
              <Text style={styles.railSeeAllText} numberOfLines={1}>
                see all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={item.podcasts}
            renderItem={renderRail}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }
  };

  const BrowseByComponent = () => {
    return (
      <>
        <View style={styles.browseByContainer}>
          <Text style={styles.browseByText}>Browse by</Text>
        </View>

        {browseByData.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.browseByItemCon}
              onPress={() => onBrowseByClick(item.route)}>
              <View style={styles.browseByLeftCon}>
                <Text style={styles.browseByItemText}>{item.name}</Text>
              </View>
              <View style={styles.browseByRightCon}>
                <MaterialCommunityIcons
                  name={'chevron-right'}
                  color={colors.secondaryText}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={dashboardData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        // ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    backgroundColor: colors.appBackground,
  },
  railContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headingContainer: {
    width: '80%',
    paddingTop: 10,
    paddingBottom: 2,
    // backgroundColor: 'green'
  },
  seeAllContainer: {
    width: '20%',
    // backgroundColor: 'red'
  },
  railTitleText: {
    fontSize: size.lg,
    fontWeight: 'bold',
    color: colors.primaryText,
    paddingVertical: wp(2),
  },
  railSeeAllText: {
    color: colors.primaryText,
    marginRight: 20,
    fontSize: size.sm,
    marginTop: wp(1),
  },
  imageRailContainer: {
    marginRight: 20,
    width: wp(40),
  },
  imageStyle: {
    width: wp(40),
    height: wp(40),
    // aspectRatio: 1.1,
    borderRadius: 7,
  },
  imageContainer: {
    width: wp(40),
    height: wp(40),
  },
  overlayIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  podcastTitle: {
    color: colors.primaryText,
    fontSize: size.md,
    fontWeight: '600',
  },
  podcastSubTitle: {
    fontSize: size.sm,
  },
  browseByContainer: {marginTop: 20},
  browseByText: {fontSize: size.lg, color: 'black', fontWeight: 'bold'},
  browseByItemCon: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  browseByLeftCon: {width: '80%'},
  browseByItemText: {fontSize: size.md, color: colors.appTheme},
  browseByRightCon: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  latestCon: {
    // backgroundColor: 'red',
  },
  latestItemCon: {
    paddingRight: wp(5),
  },
});

export default Dashboard;
