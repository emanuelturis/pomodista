export const formatTimer = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  return (
    minutes + ':' + (seconds.toString().length < 2 ? '0' + seconds : seconds)
  );
};
