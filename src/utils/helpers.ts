export const getThreeFirstWords = (str: string | null) => {
  const words = str?.split(" ");
  return words?.slice(0, 3).join(" ");
};
