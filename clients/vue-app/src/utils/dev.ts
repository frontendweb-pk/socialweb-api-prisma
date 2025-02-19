export const dev = (msg: string) => {
  if (import.meta.env.DEV) {
    console.log(msg);
  }
};
