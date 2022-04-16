import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0", //valor que aparecera na tela de display chamado na linha 42
  clearDisplay: false,
  operation: null, //vai armazenar as operaçoes
  values: [0, 0], //sera um array de dois valores porque
  //preciso de do primeiro valor para interagir com o  segundo valor atraves de uma operacao
  current: 0, // esse paremetro vai dizer se estou trabalhando com o indice 0 do array ou o indice 1 do array values
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0){
        this.setState({operation, current:1, clearDisplay: true})
    }else{
        const finishOperation = operation === '='
        const currentOperation = this.state.operation

        const values = [...this.state.values]
        try{
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            if (isNaN(values[0]) || !isFinite(values[0])){
                this.clearMemory()
                return
            }
        }catch(e){
            values[0] = this.state.values[0]
        }

        values[1] = 0

        this.setState({
            displayValue: values[0],
            operation: finishOperation ? null : operation,
            current: finishOperation ? 0 : 1,
            clearDisplay: !finishOperation,
            values
        })
    }

  }

  addDigit(n) {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }

    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;
    // na declaração de cima ele entende que é preciso limpar o display? se o digito for igual a 0
    // ou se a variavel for verdadeira do state

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    // se clearDisplay for verdadeiro, ou seja precisa ser limpo ele retornara '' (string vazia)
    // se eu não precisar sera o valor que esta atualmente no Display
    // e ao pegar o valor displayvalue ele vai executar a logica do currentValue  + n numero inserido

    if (n !== '.'){
        const index = this.state.current
        const newValue = parseFloat(displayValue)
        const values = [...this.state.values]
        values[index] = newValue
        this.setState({ values })
        console.log (values)

    }
  }
  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
