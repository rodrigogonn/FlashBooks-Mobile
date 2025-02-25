import { useReading } from 'hooks/useReading';
import { useEffect, useRef, useState } from 'react';
import { RouteName, RouteParams } from 'routes/types';
import { Pages } from './components/Pages';
import { Progress } from './components/Progress';
import { ReadingContainer } from './components/ReadingContainer';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'hooks/useTheme';
import ConfettiCannon from 'react-native-confetti-cannon';
import { ReadingThemeName } from 'theme/types';
import { BookDescription } from './components/BookDescription';
import React from 'react';

export const Reading = ({
  route: { params },
}: RouteParams<RouteName.Reading>) => {
  const [loading, setLoading] = useState(true);
  const confettiRef = useRef<ConfettiCannon>(null);
  const { changeReadingBook, shouldDisplayDescription } = useReading({
    onComplete: () => {
      setTimeout(() => {
        confettiRef.current?.start();
      }, 100);
    },
  });
  const { readingTheme } = useTheme();

  useEffect(() => {
    changeReadingBook(params.book);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: readingTheme.colors.background,
        }}
      />
    );
  }

  return (
    <ReadingContainer>
      {shouldDisplayDescription ? (
        <BookDescription />
      ) : (
        <>
          <Pages />
          <Progress />

          <ConfettiCannon
            ref={confettiRef}
            count={60}
            origin={{ x: -50, y: 0 }}
            autoStart={false}
          />
        </>
      )}

      <StatusBar
        style={readingTheme.name === ReadingThemeName.Dark ? 'light' : 'dark'}
      />
    </ReadingContainer>
  );
};
