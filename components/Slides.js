import React, { Component } from 'react';
import { ImageBackground, Text, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Ionicons
          style={styles.buttonStyle}
          color={'#BECE33'}
          name="ios-paw"
          size={220}
          onPress={this.props.onComplete}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <ImageBackground
          style={styles.slideStyle}
          key={slide.text}
          source={slide.path}
        >
          <Text
            style={[
              styles.textStyle,
              {
                color: slide.color,
                fontFamily: slide.fontFamily,
                marginTop: slide.marginTop,
                marginLeft: slide.marginLeft,
                marginRight: slide.marginRight,
              },
            ]}
          >
            {slide.text}
          </Text>
          {this.renderLastSlide(index)}
        </ImageBackground>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 90,
  },
};

export default Slides;
