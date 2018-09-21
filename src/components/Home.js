import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className='m-2'>
        <h1>Create Game</h1>
        <form className='text-2xl' onSubmit={this.handleSubmit}>
          <label className='flex my-2'>
            <span className='mr-2'>Name:</span>

            <input className='border bg-grey-lighter w-full' type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className='w-full' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Home
