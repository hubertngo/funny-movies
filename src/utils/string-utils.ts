export const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...';
}