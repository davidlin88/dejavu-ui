export default function omit<T extends object, K extends keyof T>(
  obj: T,
  filelds: K[],
): Omit<T, K> {
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < filelds.length; i++) {
    const key = filelds[i];
    delete shallowCopy[key];
  }

  return shallowCopy;
}
