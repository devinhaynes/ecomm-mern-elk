import { FC } from "react";
import "./SearchBar.scss";
import SearchIcon from "@material-ui/icons/Search";

interface ISearchBarProps {
  searchableContent: any[];
  criteria: string[];
}

export const SearchBar: FC<ISearchBarProps> = ({
  searchableContent,
  criteria,
}) => {
  return (
    <div className="SearchBar">
      <SearchIcon style={{ color: "#284ad4" }} />
      <input type="text" />
    </div>
  );
};
