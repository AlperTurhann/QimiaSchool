interface IFileUtils<T> {
  readData: () => T[];
  writeData: (data: T[]) => void;
}

const parseJSON = async (response: Response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export type { IFileUtils };
export { parseJSON };
