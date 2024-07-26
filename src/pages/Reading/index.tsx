import { useReading } from 'contexts/readingContext/useReading';
import { useEffect, useState } from 'react';
import { RouteName, RouteParams } from 'routes/types';
import { Pages } from './components/Pages';
import { Progress } from './components/Progress';
import { ReadingContainer } from './components/ReadingContainer';

export const Reading = ({
  route: { params },
}: RouteParams<RouteName.Reading>) => {
  const [loading, setLoading] = useState(true);
  const { changeReadingBook } = useReading();

  useEffect(() => {
    changeReadingBook(params.book);
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ReadingContainer>
      <Pages />
      <Progress />
    </ReadingContainer>
  );
};
