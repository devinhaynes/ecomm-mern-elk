import { ChangeEvent, FC, useContext } from "react";
import "./SearchBar.scss";
import SearchIcon from "@material-ui/icons/Search";
import { ProductContext } from "../../state/context/Products";

interface ISearchBarProps {
  searchableContent: any[];
  criteria: string[];
}

export const SearchBar: FC<ISearchBarProps> = ({
  searchableContent,
  criteria,
}) => {
  const { products, dispatchProducts } = useContext(ProductContext);
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    e.preventDefault();
    const filteredElements = searchableContent.filter((item) => {
      return criteria.some(
        (criteria) =>
          item[criteria] &&
          item[criteria].toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    console.log(filteredElements);
    dispatchProducts({
      type: "APPLY_FILTER",
      payload: { multipleProducts: filteredElements },
    });
  };
  return (
    <div className="SearchBar">
      <SearchIcon style={{ color: "#284ad4" }} />
      <input onChange={search} type="text" />
    </div>
  );
};
