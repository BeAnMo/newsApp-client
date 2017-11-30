import React, { Component } from 'react';
import SingleTopic from './Single';
import { Container, Col, Row } from 'reactstrap';

/*
how to make number of topic columns change with screen size?
*/
export default class AllTopics extends Component {
    constructor(props){
        super(props);
        this.state = {
            topics: this.props.topics
        };
    }

    componentWillReceiveProps(nextProps){
        return this.setState({ topics: nextProps.topics });
    }

    render(){
        const topics = Object.keys(this.state.topics).sort((a, b) => a.localeCompare(b));
        const { first, last } = splitArrayInHalf(topics);
 
        return (
            <Container>
              <Row>
                <GroupSelection select={this.props.selectAll} display="Select All" />
                <GroupSelection select={this.props.deselectAll} display="Deselect All" />
              </Row>
              <Row>
                <GroupRow 
                  topics={first} 
                  subscription={this.props.subscription}
                  state={this.state.topics} />
                <GroupRow 
                  topics={last} 
                  subscription={this.props.subscription} 
                  state={this.state.topics} />
              </Row>
            </Container>
        );
    }
}

/* how to organize rows better? */
function GroupRow({ topics, subscription, state }){
  const { first, last} = splitArrayInHalf(topics);

  return (
    <Row>
      <TopicGrouping 
        order={1} 
        topics={first} 
        subscription={subscription} 
        state={state} />
      <TopicGrouping 
        order={2} 
        topics={last} 
        subscription={subscription} 
        state={state} />
    </Row>   
  );
}

function TopicGrouping({ topics, subscription, order , state }){
  const flexPos = order === 1 ? 
    'flex-first' : 'flex-last'; 
  const val = 'col-xs-6 col-md-6 text-center ' + flexPos;

  return (
    <Col className={val}>  
      {topics.map(topic => {
        return <SingleTopic 
          topic={topic}
          isActive={state[topic]} // pull up state to where?
          key={topic} 
          subscription={subscription} />;
      })}
  </Col>
  );
}

function GroupSelection({ select, display }){
  return (
    <Col md="4">
      <p>
        <a href="#test" onClick={select}>
          <strong>{display}</strong>
        </a>
      </p>
    </Col>
  );
}

/* Array -> Object */
function splitArrayInHalf(arr){
  const half = Math.floor(arr.length / 2);
  const frontHalf = arr.slice(0, half);
  const backHalf = arr.slice(half);

  return { first: frontHalf, last: backHalf };
}