import React, { Component } from 'react';

export default class TestChildComponent extends Component {
  constructor() {
    console.log('child constructor')
    super();
  }

  componentWillMount() {
    console.log('child componentWillMount');
  }

  componentDidMount() {
    console.log('child componentDidMount')
  }

  numberAdd() {
    this.setState({
      number: this.state.number + 1,
    })
  }

  render() {
    console.log('child render')
    return (
      <div>
        { `parentprops: ${this.props.number}` }
      </div>
    )
  }

  componentWillReceiverProps() {
    console.log('child componentWillReceiverProps');
  }

  shouldComponentUpdate() {
    console.log('child shouldComponentUpdate');
    return true
  }

  componentWillUpdate() {
    console.log('child componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('child componentDidUpdate');
  }
}