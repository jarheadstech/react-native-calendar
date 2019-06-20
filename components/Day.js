import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    event: PropTypes.object,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    // if (isToday) {
    //   dayCircleStyle.push(styles.currentDayCircle, event ? customStyle.currentDayCircleEvent : customStyle.currentDayCircle);
    // }

    if (isSelected) {
      // if (isToday) {
      //   dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle);
      // } else {
      // dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
      //  }
    }

    if (event) {
      // if (isSelected) {
      //   dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
      // } else {
      if (typeof event.hasEventCircle.backgroundColor != 'undefined')
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
      else
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, { backgroundColor: 'rgb(123, 174, 253)' });

    }
    //}
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
    }

    if (event) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
    }
    return dayTextStyle;
  }

  dayButtonStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayButtonStyle = [styles.dayButton, customStyle.dayButton];

    if (isToday) {
      dayButtonStyle.push(styles.todayDayButton, customStyle.todayDayButton);
    }

    if (isWeekend) {
      dayButtonStyle.push(styles.weekendDayButton, customStyle.weekendDayButton);
    }
    return dayButtonStyle;
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      filler,
      event,
      isWeekend,
      isSelected,
      isToday,
      showEventIndicators,
    } = this.props;
    return filler
      ? (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <View style={styles.dayCircleFiller}>
            <Text style={[styles.day, styles.fillerDay, customStyle.day, this.dayTextStyle(isWeekend, false, false, null)]} >{caption}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
      : (
        <TouchableOpacity
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
        >
          <View style={this.dayButtonStyle(isWeekend, isSelected, isToday, event)}>
          {
            event && event.no_of_events > 1 ?
            <View style={this.dayCircleStyle( event)}>
              <Image style={styles.multiEventImg} source = {require('../images/multiple_circle.png')}/>
                <Text style={[styles.activeDay, this.dayTextStyle(isWeekend, isSelected, isToday, event)]}>{caption}</Text>
            
            </View>
            :
            <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
              <Text style={[styles.activeDay, this.dayTextStyle(isWeekend, isSelected, isToday, event)]}>{caption}</Text>
            </View>
          }
            <View style={styles.eventIndicatorContainer}>
            {showEventIndicators &&
            <View style={[
              styles.eventIndicatorFiller,
              customStyle.eventIndicatorFiller,
              event && styles.eventIndicator,
              event && customStyle.eventIndicator,
              event && event.eventIndicator]}
            />
          }
          {
            showEventIndicators && event && event.no_of_events > 1 &&
            <View style={[
              styles.eventIndicatorFiller,
              customStyle.eventIndicatorFiller,
              event && styles.eventIndicator,
              event && customStyle.eventIndicator,
              event && event.eventIndicator]}
            />
          }
          </View>
          </View>
        </TouchableOpacity>
      );
  }
}
