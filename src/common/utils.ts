export const secondsToString = (seconds: number): string => {
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h < 10 ? `0${h}` : h;
  const mDisplay = m < 10 ? `0${m}` : m;
  const sDisplay = s < 10 ? `0${s}` : s;
  return `${hDisplay > 0 ? `${hDisplay}:` : ''}${
    mDisplay > 0 ? `${mDisplay}:` : '00:'
  }${sDisplay > 0 ? `${sDisplay}` : '00'}`;
};
