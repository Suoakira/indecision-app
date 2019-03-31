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
        return this.setState( () => ({ options: [] }))      
    }

    handleDeleteOption(opt) {
        const copyOptions = [...this.state.options]
        this.setState(() => ({ options: copyOptions.filter(option => option !== opt)}))
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
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {props.options.map(option => (
                <Option 
                    key={option} 
                    option={option}
                    handleDeleteOption={props.handleDeleteOption}
                    />
                )
            )}
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
            <div>
                {props.option}
                <button
                    onClick={((event) => props.handleDeleteOption(props.option))}
                >
                X
                </button>
            </div>
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
        this.setState(() => ({ option: "" }))
        this.setState({ error: undefined })
        if (this.state.option !== "" && this.props.options.indexOf(this.state.option) == -1) { 
            this.props.handleAddOption(this.state.option)
         } else if (this.props.options.indexOf(this.state.option) !== -1) {
            this.setState({ error: "This options already exists" })
         } else {
            this.setState({ error: "Please enter some text" })
         }
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