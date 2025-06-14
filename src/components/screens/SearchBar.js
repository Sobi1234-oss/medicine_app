import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SliderItem = ({ image, scrollX, index }) => {
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.slideContainer, animatedStyle]}>
      <Image source={image} style={styles.slideImage} resizeMode="cover" />
    </Animated.View>
  );
};

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const width = useSharedValue(50);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  
  const searchAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, { duration: 300 }),
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const toggleSearch = () => {
    if (isExpanded) {
      width.value = 15; 
    } else {
      width.value = '90%'; 
    }
    setIsExpanded(!isExpanded);
  };

  const images = [
    require('../../assets/images/facility1.png'),
    require('../../assets/images/facility2.png'),
    require('../../assets/images/facility3.png')
  ];

  return (
    <View style={styles.screenContainer}>
      <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
        {isExpanded && (
          <TextInput 
            style={styles.input} 
            placeholder="Search here..."
            placeholderTextColor="black"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
          />
        )}
        <TouchableOpacity 
          onPress={toggleSearch} 
          style={styles.iconContainer}
        >
          <Icon 
            name={isExpanded ? "times" : "search"} 
            size={20} 
            color="#000" 
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.sliderContainer}>
        <AnimatedFlatList 
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SliderItem image={item} scrollX={scrollX} index={index} />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    width: screenWidth - 40,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  slideImage: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
  },
});

export default SearchBar;