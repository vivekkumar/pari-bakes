import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

class QuantityControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity
    };
  }

  handleChange = () => {
    const { onChange } = this.props;

    return onChange && onChange(this.state.quantity);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.quantity !== prevState.quantity) {
      this.handleChange();
    }
  }

  decrement = () => {
    this.setState(ps => {
      return { quantity: ps.quantity - 1 };
    });
  };

  increment = () => {
    this.setState(ps => {
      return { quantity: ps.quantity + 1 };
    });
  };

  render() {
    const { quantity } = this.state;

    return (
      <InputGroup style={{ maxWidth: 140 }} className="float-right">
        <InputGroup.Prepend onClick={this.decrement}>
          <InputGroup.Text>
            <i className="fas fa-minus" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
          value={quantity}
          onChange={this.handleChange}
          className="text-center"
        />
        <InputGroup.Append onClick={this.increment}>
          <InputGroup.Text id="btnGroupAddon">
            <i className="fas fa-plus" />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default QuantityControl;
