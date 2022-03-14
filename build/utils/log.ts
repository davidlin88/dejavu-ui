const [command, info, error] = ['command', 'info', 'error'].map((symbol: string) => {
  return (msg: string) => `[${symbol}] ${msg}`;
});

export { command, info, error };
