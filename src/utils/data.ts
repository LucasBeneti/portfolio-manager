export function formatUserObjectivesToSlider(data: any) {
  return Object.entries(data).reduce((acc, curr) => {
    const key = curr[0];
    const value = curr[1];
    return {
      ...acc,
      [key]: [value],
    };
  }, {});
}
