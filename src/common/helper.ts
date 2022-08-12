import { monthMapping, UNIFORM_DATE_FORMAT } from './constant';
import moment from 'moment';

export const getDateString = function(date: Date): string {
  return moment(date).format(UNIFORM_DATE_FORMAT);
};

export const getTodayString = function(): string {
  return moment().format(UNIFORM_DATE_FORMAT);
};

export const getDate = function(dateString: string): Date {
  return moment(dateString, UNIFORM_DATE_FORMAT).toDate();
};

/**
 * Gets the formal date string.
 * @param date
 */
export const getFormalDate = function(date: Date): string {
  const monthString = monthMapping[date.getMonth()];
  return `${monthString} ${date.getDate()}`;
};

export const parseEnum = function(enumString: any): number {
  return parseInt(enumString as string);
};

/**
 * Get current timestamp.
 */
export const time = function(): number {
  return new Date().getTime();
};