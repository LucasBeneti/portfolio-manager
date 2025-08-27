import { Badge } from '../ui/badge';
import { CATEGORY_BADGE_COLOR } from '@/contants/category';
import { type Category } from '../../interfaces/assets';

type CategoryBadgeProps = {
  name: Category;
  color?: string;
};
export function CategoryBadge(props: CategoryBadgeProps) {
  const { name } = props;
  const mappedAsset = CATEGORY_BADGE_COLOR[name];
  const assetTitle = mappedAsset?.title || name;
  const styling = mappedAsset?.styling || '';
  return <Badge className={[styling, 'mx-3'].join(' ')}>{assetTitle}</Badge>;
}
