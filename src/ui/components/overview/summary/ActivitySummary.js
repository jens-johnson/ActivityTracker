import React from 'react';
import { HStack, VStack } from 'native-base';

import SummaryItem from './SummaryItem';

/**
 * Component used to display activity summaries across a horizontal stack
 *
 * @param {Object} props - Component props
 * @param {Object[]} props.summaries - Summaries to be displayed
 * @constructor
 */
function ActivitySummary({ summaries }) {
  return (
    <VStack>
      <HStack
        justify={'flex-start'}
      >
        {
          summaries.map(summary => <SummaryItem key={summary.id} summary={summary}/>)
        }
      </HStack>
    </VStack>
  );
}

export default ActivitySummary;
