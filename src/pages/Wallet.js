import React from 'react';
import './Wallet.css';
import Input from '../components/Input';
import Header from '../components/Header';
import Select from '../components/Select';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
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
    return (
      <div>
        <Select
          labelTitle="Moeda:"
          name="moeda"
          id="moeda"
          value=""
          onChange=""
          options={ [] }
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

export default Wallet;
