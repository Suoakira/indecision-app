import React from 'react'

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      option: "",
      error: undefined
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(() => ({ option: "" }));
    this.setState({ error: undefined });
    if (
      this.state.option !== "" &&
      this.props.options.indexOf(this.state.option) == -1
    ) {
      this.props.handleAddOption(this.state.option);
    } else if (this.props.options.indexOf(this.state.option) !== -1) {
      this.setState({ error: "This options already exists" });
    } else {
      this.setState({ error: "Please enter some text" });
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            type="text"
            onChange={event => this.handleChange(event)}
            name="option"
            value={this.state.option}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}