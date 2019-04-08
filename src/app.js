import React from 'react'
import ReactDOM from 'react-dom'
import AddOption from "./components/AddOption"
import Header from "./components/Header"
import Action from "./components/Action"
import Options from "./components/Options"


class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: props.options
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem("options")
            const options = JSON.parse(json)
            if (options) {
                this.setState(() => ({ options }))
            }
        }
        catch (error) {
            // do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // fires every time components updates
        // this.state this.props
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem("options", json)
            console.log("savingdata")

        }
    }

    componentWillUnmount() {
        // unmounts any running components at the end of our app
    }
    handleDeleteOptions() {
        return this.setState(() => ({ options: [] }))
    }

    handleDeleteOption(opt) {
        const copyOptions = [...this.state.options]
        this.setState(() => ({ options: copyOptions.filter(option => option !== opt) }))
    }

    handlePick() {
        let length = this.state.options.length
        if (length > 0) {
            let randNum = Math.floor(Math.random() * length)
            alert(this.state.options[randNum])
        } else {
            alert("Sory no options to pick from")
        }
    }

    handleAddOption(option) {
        const shallowOptions = [...this.state.options, option]
        this.setState(() => ({ options: shallowOptions }))
    }

    render() {
        const title = "Indecision"
        const subtitle = "Put your life in the hands of a computer"
        const { options } = this.state
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    options={options}
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: ["one"]
}

ReactDOM.render(<IndecisionApp />, document.getElementById("root"))