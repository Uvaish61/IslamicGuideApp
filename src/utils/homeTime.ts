export const HYDERABAD_TIME_ZONE = 'Asia/Kolkata';

const hijriDateFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en-IN-u-ca-islamic', {
    timeZone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const timeFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

const clockPartsFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export const formatHijriDate = (date: Date = new Date(), timeZone = HYDERABAD_TIME_ZONE) => {
  try {
    return hijriDateFormatter(timeZone).format(date).replace(/\s+(AH|H)$/i, '');
  } catch {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone,
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
};

export const formatLocalTime = (date: Date = new Date(), timeZone = HYDERABAD_TIME_ZONE) => {
  try {
    return timeFormatter(timeZone).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }
};

export const getMinutesInTimeZone = (date: Date = new Date(), timeZone = HYDERABAD_TIME_ZONE) => {
  try {
    const parts = clockPartsFormatter(timeZone).formatToParts(date);
    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? '0');
    const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? '0');
    return hour * 60 + minute;
  } catch {
    return date.getHours() * 60 + date.getMinutes();
  }
};