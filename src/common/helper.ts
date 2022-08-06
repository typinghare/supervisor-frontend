export const monthMapping = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getFormalDate = function (date: Date): string {
  const month = monthMapping[date.getMonth()];
  return `${month} ${date.getDay()}, ${date.getFullYear()}`;
};
