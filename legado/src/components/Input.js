import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      labelTitle,
      testId,
      placeholder,
      type,
      name,
      id,
      value,
      onChange,
    } = this.props;

    return (
      <label htmlFor={ id }>
        {labelTitle}
        <input
          data-testid={ testId }
          placeholder={ placeholder }
          type={ type }
          name={ name }
          id={ id }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  labelTitle: PropTypes.string,
  testId: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  labelTitle: '',
  testId: '',
};

export default Input;
