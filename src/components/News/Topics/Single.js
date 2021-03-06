import React, { Component } from 'react';

export default class SingleTopic extends Component {
  constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      topic: this.props.topic,
      isActive: this.props.isActive
    };
  }

  handleToggle(e){
    e.preventDefault();
    // allow toggled topic to show as strike-through or something to denote its state
    this.setState({ isActive: !this.state.isActive });
    
    return this.props.subscription(this.state.topic);
  }

  componentDidMount(){
    return this.setState({ isActive: this.props.isActive });
  }

  componentWillReceiveProps(nextProps){
    return this.setState({ isActive: nextProps.isActive });
  }

  render(){
    const hasStrikeThru = this.state.isActive ? 
      'none' : 'line-through';

    return (
      <p>
        <a 
          style={{textDecoration: hasStrikeThru }} 
          href="#test" 
          onClick={this.handleToggle}>
          { this.state.topic }
        </a>
      </p>
    );
  }
}