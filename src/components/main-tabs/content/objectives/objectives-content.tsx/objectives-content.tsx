import { CATEGORY_BADGE_COLOR } from "@/contants/category";
import { Slider } from "@/components/ui/slider";

export function ObjectivesContent() {
  const objectivesMap = Object.entries(CATEGORY_BADGE_COLOR).reduce(
    (acc, curr) => {
      const key = curr[0];
      const value = curr[1];
      return {
        ...acc,
        [key]: {
          key,
          title: value.title,
          percentage: 0,
        },
      };
    },
    {}
  );

  console.log("objectivesMap", objectivesMap);

  return (
    <section>
      <Slider />
    </section>
  );
}
