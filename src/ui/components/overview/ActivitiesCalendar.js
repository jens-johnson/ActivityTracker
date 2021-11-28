import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { colors } from 'ui/styles';

// Maximum number of months to display past and present from the current date
const MAX_MONTH_RANGE = 12;

// Dot styling for calendar marking
const DOTS = {
  cardio: { key: 'cardio', color: colors.primary },
  lifting: { key: 'lifting', color: colors.secondary }
};

/**
 * Functional activity calendar component for overview screen
 *
 * @param props - Component props
 * @param props.activities - Mapping of dates to lifting/cardio activities
 * @return {JSX.Element}
 * @constructor
 */
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
  );
};
