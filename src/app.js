class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            options: props.options
        }
    }

    handleDeleteOptions() {
        return this.setState( () => {
            return { 
                options: []
            }
        })
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
        this.setState(() => {
            return {
                options: shallowOptions
            }
        })
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
            />
            <AddOption
                handleAddOption={this.handleAddOption}
             />
        </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}


 
const Header = (props) => {
        return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>)
}


const Action = (props) =>  {
        return ( 
            <div>
                <button 
                    disabled={!props.hasOptions} 
                    onClick={() => props.handlePick()}> 
                    What Should I Do
                </button>
            </div>
         )

}

const Options = (props) => {
        return ( 
        <div>
            {props.options.map(option => <Option key={option} option={option}/>)}
            <button 
                onClick={() => props.handleDeleteOptions()}
                >
                    Remove All
            </button>
        </div> 
        )
}

const Option = (props) => {
        return (
            <ul>
                <li>{props.option}</li>
            </ul>
        )
}


class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            option: "",
            error: undefined
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault()
        this.setState({ error: undefined })
        this.state.option !== "" ? this.props.handleAddOption(this.state.option) : this.setState({ error: "Please enter some text" })
        this.setState(() => {
            return {
                option: ""
            }
        })

    }

    render() { 
        return ( 
        <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" onChange={(event) => this.handleChange(event)} name="option" value={this.state.option} />
                <input type="submit" value="submit"/>
            </form>
        </div> )
    }
}





ReactDOM.render(<IndecisionApp />, document.getElementById("root"))