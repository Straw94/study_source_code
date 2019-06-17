import React, { Component } from 'react';
import TestChildComponent from '../../components/TestChildComponent'

export default class Index extends Component {
  constructor() {
    super();
    console.log('parents constructor');
    this.state = {
      number: 0,
    }
  }

  componentWillMount() {

    console.log('parents componentWillMount');
  }

  componentDidMount() {
    this.state.number = 111;
    console.log('parents componentDidMount');

  }

  numberAdd() {
    this.setState({
      number: this.state.number + 1,
    })
  }

  render() {
    console.log('parent render')
    return (
      <div onClick={() => this.numberAdd()}>
        { this.state.number }
        <TestChildComponent number={this.state.number} />
      </div>
    )
  }

  componentWillReceiverProps() {
    console.log('parent componentWillReceiverProps');
  }

  shouldComponentUpdate() {
    console.log('parent shouldComponentUpdate');
    return true
  }

  componentWillUpdate() {
    console.log('parent componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('parent componentDidUpdate');
  }
}
