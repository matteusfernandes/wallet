import React from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Header from '../components/Header';
import Select from '../components/Select';
import { getCurrencyThunk } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;

    getCurrencies();
  }

  renderInputs() {
    return (
      <div>
        <Input
          labelTitle="Valor:"
          placeholder=""
          type="text"
          name="valor"
          id="valor"
          value=""
          onChange=""
        />

        <Input
          labelTitle="Descrição:"
          placeholder=""
          type="text"
          name="description"
          id="description"
          value=""
          onChange=""
        />
      </div>
    );
  }

  renderSelects() {
    const { currencies } = this.props;

    return (
      <div>
        <Select
          labelTitle="Moeda:"
          name="moeda"
          id="moeda"
          value=""
          onChange=""
          options={ currencies }
        />

        <Select
          labelTitle="Método de Pagamento:"
          name="pay"
          id="pay"
          value=""
          onChange=""
          options={ [] }
        />

        <Select
          labelTitle="Tag:"
          name="tag"
          id="tag"
          value=""
          onChange=""
          options={ [] }
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <form>
          {this.renderInputs()}
          {this.renderSelects()}
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrencyThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
