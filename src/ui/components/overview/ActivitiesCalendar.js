import React from 'react';
import { CalendarList, E } from 'react-native-calendars';
import { colors } from 'ui/styles';

const MAX_MONTH_RANGE = 12;
const DOTS = {
  cardio: { key: 'cardio', color: colors.primary },
  lifting: { key: 'lifting', color: colors.secondary }
};

export default function ActivitiesCalendar({ activities }) {
  const marked = activities;
  Object.keys(activities).map(date => {
    marked[date] = {
      dots: [
        ...activities[date].cardio ? [ DOTS.cardio ] : [],
        ...activities[date].lifting ? [ DOTS.lifting ] : []
      ],
      selected: true
    }
  });
  return (
    <CalendarList
      horizontal={true}
      hideArrows={true}
      pastScrollRange={MAX_MONTH_RANGE}
      futureScrollRange={MAX_MONTH_RANGE}
      markingType={'multi-dot'}
      markedDates={marked}
      theme={{
        calendarBackground: 'transparent',
        monthTextColor: colors.primary,
        dayTextColor: colors.primary,
        todayTextColor: colors.primary,
        textMonthFontWeight: 'bold',
        selectedDayBackgroundColor: 'transparent',
        selectedDayTextColor: colors.secondary,
        'stylesheet.calendar.header': {
          dayHeader: {
            color: colors.primary,
            fontWeight: 'bold'
          }
        }
      }}
    />
  )
};
