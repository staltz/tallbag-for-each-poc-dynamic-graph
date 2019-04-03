import React from 'react';
import ReactDOM from 'react-dom';

const actualForEach = require('tallbag-for-each');

const container = document.createElement('div');
document.body.appendChild(container);

class Fade extends React.Component {
  state = {now: Date.now()};

  componentDidMount() {
    this._timer = setInterval(() => {
      this.setState({now: Date.now()});
    });
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render() {
    const since = this.state.now - this.props.timestamp;
    const opacity = Math.max(1 - since / 1000, 0);
    return React.createElement('span', {style: {opacity}}, this.props.children);
  }
}

function StreamGraph(props) {
  const metadata = props.metadata;
  let parent = null;
  if (metadata.source && Array.isArray(metadata.source)) {
    parent = React.createElement(
      'div',
      {style: {display: 'flex', flexDirection: 'row'}},
      metadata.source.map(m => React.createElement(StreamGraph, {metadata: m})),
    );
  } else if (metadata.source) {
    parent = React.createElement(StreamGraph, {metadata: metadata.source});
  }

  let data = null;
  if (metadata.timestamp) {
    data = React.createElement(
      'span',
      {style: {color: 'blue', marginLeft: 20}},
      React.createElement(
        Fade,
        {timestamp: metadata.timestamp},
        '' + metadata.data,
      ),
    );
  }

  return React.createElement(
    'div',
    {style: {paddingBottom: 20}},
    parent,
    React.createElement('h3', {}, metadata.name, data),
  );
}

const forEach = operation => source => {
  actualForEach(operation, metadata => {
    ReactDOM.render(React.createElement(StreamGraph, {metadata}), container);
  })(source);
};

module.exports = forEach;
