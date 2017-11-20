export function asMock<T>(fn: (...params: any[]) => T): jest.Mock<T> {
  expect(jest.isMockFunction(fn)).toBe(true);
  return fn as jest.Mock<T>;
}
