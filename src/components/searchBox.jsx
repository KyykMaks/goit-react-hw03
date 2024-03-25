import { useId } from 'react';
import css from './searchBox.module.css';

export const SearchBox = ({ value, onChange }) => {
  const searchId = useId();

  return (
    <div className={css.form}>
      <label htmlFor={searchId}>Find contacts by name</label>
      <input
        className={css.field}
        type="text"
        name="search"
        id={searchId}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};