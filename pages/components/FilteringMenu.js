import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LIST_VIEW_ICONS = ['border-all','list'];
const DATE_FILTERING_ICONS = ['sort-numeric-up','sort-numeric-down'];

const FilteringMenu = ({ onChange, filter }) => {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon
        className="clickable hoverable mr-3" 
        size="3x"
        icon={LIST_VIEW_ICONS[filter.view.list]}
        onClick={() =>
         onChange("view", { list: +!filter.view.list })} />
      <FontAwesomeIcon
        className="clickable hoverable" 
        size="3x"
        icon={DATE_FILTERING_ICONS[filter.date.asc]}
        onClick={() =>
         onChange("date", { asc: +!filter.date.asc })} />
    </div>
  );
};
export default FilteringMenu;
