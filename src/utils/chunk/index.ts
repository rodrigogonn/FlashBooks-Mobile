export const chunk = <T = any>(array: T[], chunkSize: number): Array<T[]> => {
  const chunks: Array<T[]> = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
