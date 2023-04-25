const filesDiff = (data1, data2) => {
  // Create filesDifference obj: Compare key: value of data1, data2
  const filesDifference = Object.entries(data2).reduce(
    (accDiff, [key2, value2]) => {
      // if data1 contents key, but the value is updated
      // with data2 value (updated)
      if (data1[key2] && data1[key2] !== value2) {
        return [
          ...accDiff,
          `  - ${key2}: ${data1[key2]}`,
          `  + ${key2}: ${value2}`,
        ];
      }

      // if data1 contents key, but the value is the same
      // as data2 value (without updates)
      if (data1[key2] && data1[key2] === value2) {
        return [...accDiff, `    ${key2}: ${data1[key2]}`];
      }

      // if data1 doesn't content key, but data2 does (added)
      if (!data1[key2] && value2) {
        return [...accDiff, `  + ${key2}: ${value2}`];
      }

      return [...accDiff];
    },
    []
  );

  // if data1 contents key, but data2 doesn't (removed)
  const removedData = Object.entries(data1)
    .filter(([key1]) => !data2[key1])
    .map(([key1, value1]) => [`  - ${key1}: ${value1}`]);

  // Combine a result
  const result = `{\n${[...removedData, ...filesDifference].join('\n')}\n}`;

  return result;
};

export default filesDiff;
