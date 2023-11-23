import CategoryLinks from "./CategoryLinks";
import { Category } from "../libs/api";
export type Props = {
  categories: Category[];
};

export default function CategoryListPC({ categories }: Props) {
  return (
    <div className="box overflow-hidden">
      <div className="py-5 bg-sGray text-center">カテゴリ一覧</div>
      <div className="p-5 ">
        <CategoryLinks categories={categories} />
      </div>
    </div>
  );
}
