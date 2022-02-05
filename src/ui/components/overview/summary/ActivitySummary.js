import React from 'react';
import { HStack, VStack } from 'native-base';

import SummaryItem from './SummaryItem';

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
