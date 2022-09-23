import PropTypes from 'prop-types';

import Title from '../Title/Title';
const Filter = ({filterContact }) => {
  return (
    <>
      <Title title="Find contacts by name" />
      <label>
        <input type="text" onChange={e=>{filterContact(e)} } />
      </label>
    </>
  );
};

Filter.propTypes = {
  filterChange: PropTypes.func,
};

export default Filter;