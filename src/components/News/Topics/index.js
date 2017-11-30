import React, { Component } from 'react';
import { Collapse, NavbarToggler } from 'reactstrap';
import AllTopics from './All';

export default class Topics extends Component {
    constructor(props){
        super(props);
        this.toggleTopics = this.toggleTopics.bind(this);
        this.state = {
            topics: this.props.topics,
            isCollapsed: true
        };
    }

    toggleTopics(){
        return this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    componentWillReceiveProps(nextProps){
        return this.setState({ topics: nextProps.topics });
    }

    render(){
    
        return (
            <section>
                <NavbarToggler onClick={this.toggleTopics} className="mr-2 inverse">
                    <strong>Show Topics</strong>
                </NavbarToggler>
                <Collapse isOpen={!this.state.isCollapsed}>
                    <AllTopics 
                        topics={this.state.topics} 
                        subscription={this.props.subscription} 
                        selectAll={this.props.selectAll} 
                        deselectAll={this.props.deselectAll} />
                </Collapse>
            </section>
        );
    }
}