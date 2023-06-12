import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    // Using async will return a represention of the eventual promise, use await to prolong exuctuion until promise is handled
    e.preventDefault();
    const { title, urlToShorten } = this.state;
    const response = await fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'content-Type': 'aplicatipon/json'
      },
      body: JSON.stringify({
        title: title,
        long_rul: urlToShorten
      })
    });
    if (response.ok) {
      const data = await response.json();
      this.props.addUrl(data);
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
