const ansiColors = [
  "",
  "\x1B[94m",
  "\x1B[93m",
  "\x1B[91m",
  "\x1B[95m",
  "\x1B[96m",
  "\x1B[92m",
  "\x1B[35m",
  "\x1B[33m",
  "\x1B[34m",
  "\x1B[32m",
];
const colorEnd = "\x1B[0m";

export const JSONConsoleTransport = (props) => {
  console.log(`${ansiColors[props?.level?.severity]}${new Date().toLocaleString()} | ${props?.level?.text.toUpperCase()} | ${props?.extension}${colorEnd}`)
  console.log(`${ansiColors[props?.level?.severity]}${JSON.stringify(props?.rawMsg, null, 2)}${colorEnd}`);
};
