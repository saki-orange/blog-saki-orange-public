function range(start: number, end: number, length: number = end - start + 1): number[] {
  return Array.from({ length }, (_, i) => start + i);
}

export { range };
