import { useState } from 'react';
import { View } from 'react-native';
import { RouteParams } from 'routes';
import { Pages } from './components/Pages';
import { Progress } from './components/Progress';
import { ReadingAdjustments } from './components/ReadingAdjustments';
import { ReadingProvider } from './context/Provider';

export const Reading = ({}: RouteParams<'Reading'>) => {
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(false);

  return (
    <ReadingProvider>
      <View
        style={{
          position: 'relative',
        }}>
        <Pages />

        <Progress />

        <ReadingAdjustments
          open={adjustmentsOpen}
          onClose={() => setAdjustmentsOpen(false)}
        />
      </View>
    </ReadingProvider>
  );
};
