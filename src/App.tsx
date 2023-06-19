import React, { Component, MouseEvent } from "react";
import "./App.css";

interface AppState {
  result: string;
}

class ResultComponent extends Component<{ result: string }> {
  render() {
    let { result } = this.props;
    return (
      <div className="result">
        <p>{result}</p>
      </div>
    );
  }
}

class KeyPadComponent extends Component<{ onClick: (button: string) => void }> {
  handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    this.props.onClick(name);
  };

  render() {
    return (
      <div className="button">
        <button name="(" onClick={this.handleClick}>
          (
        </button>
        <button name="CE" onClick={this.handleClick}>
          CE
        </button>
        <button name=")" onClick={this.handleClick}>
          )
        </button>
        <button name="C" onClick={this.handleClick}>
          C
        </button>
        <br />

        <button name="1" onClick={this.handleClick}>
          1
        </button>
        <button name="2" onClick={this.handleClick}>
          2
        </button>
        <button name="3" onClick={this.handleClick}>
          3
        </button>
        <button name="+" onClick={this.handleClick}>
          +
        </button>
        <br />

        <button name="4" onClick={this.handleClick}>
          4
        </button>
        <button name="5" onClick={this.handleClick}>
          5
        </button>
        <button name="6" onClick={this.handleClick}>
          6
        </button>
        <button name="-" onClick={this.handleClick}>
          -
        </button>
        <br />

        <button name="7" onClick={this.handleClick}>
          7
        </button>
        <button name="8" onClick={this.handleClick}>
          8
        </button>
        <button name="9" onClick={this.handleClick}>
          9
        </button>
        <button name="*" onClick={this.handleClick}>
          x
        </button>
        <br />

        <button name="." onClick={this.handleClick}>
          .
        </button>
        <button name="0" onClick={this.handleClick}>
          0
        </button>
        <button name="=" onClick={this.handleClick}>
          =
        </button>
        <button name="/" onClick={this.handleClick}>
          ÷
        </button>
        <br />
      </div>
    );
  }
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      result: "",
    };
  }

  onClick = (button: string) => {
    if (button === "=") {
      this.calculate();
    } else if (button === "C") {
      this.reset();
    } else if (button === "CE") {
      this.backspace();
    } else {
      this.setState((prevState) => ({
        result: prevState.result + button,
      }));
    }
  };

  calculate = () => {
    let checkResult = this.state.result;
    if (this.state.result.includes("--")) {
      checkResult = this.state.result.replace("--", "+");
    }

    try {
      this.setState({
        result: (eval(checkResult) || "") + "",
      });
    } catch (e) {
      this.setState({
        result: "error",
      });
    }
  };

  reset = () => {
    this.setState({
      result: "",
    });
  };

  backspace = () => {
    this.setState((prevState) => ({
      result: prevState.result.slice(0, -1),
    }));
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default App;
