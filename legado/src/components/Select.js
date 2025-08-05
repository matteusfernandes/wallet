import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { labelTitle, name, id, value, onChange, options } = this.props;

    return (
      <label htmlFor={ id }>
        {labelTitle}
        <select name={ name } id={ id } value={ value } onChange={ onChange }>
          {options.map((option, index) => (
            <option key={ index } value={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  labelTitle: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

Select.defaultProps = {
  placeholder: '',
};

export default Select;
