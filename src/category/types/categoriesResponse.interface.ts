import { CategoryEntity } from "../category.entity";

export interface CategorysResponseInterface {
  count: number;
  data: CategoryEntity[];
}
