import CategoryLinks from "./CategoryLinks";
import { Category } from "../libs/api";
export type Props = {
  categories: Category[];
};

export default function CategoryListSP({ categories }: Props) {
  return (
    <div className="block md:hidden ">
      <h2 className="text-lr mb-4 mt-8">カテゴリ一覧</h2>
      <div className="shadow-sm bg-white  rounded-md p-5 text-lr">
        <CategoryLinks categories={categories} />
      </div>
    </div>
  );
}
