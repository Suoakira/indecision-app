console.log("Hello World")
let appRoot = document.querySelector("#root")

const app = {
    title: "Indecision App",
    subTitle: "",
    options: ["BAE", "WIN"]
}


const handleSubmit = (event) => {
    event.preventDefault()
    const option = event.target.elements.option.value
    if (option) {
        app.options.push(option)
        event.target.elements.option.value = ""
        renderApp()
    }
}

const mapOptions = () => app.options.map((option, key) => <li id={key} >{option}</li>)

const removeOptions = () => {
    app.options = []
    renderApp()
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length)
    console.log(randomNum)
    const option = app.options[randomNum]
    alert(option)
}

const renderApp = () => {
    let template = (
        <div>
            <p>{app.title}</p>
            {app.subTitle && <p>{app.subTitle}</p>}
            {app.options.length > 0 ?
                <p>Here are your options</p>
                :
                "No Options"
            }

            <button disabled={app.options.length === 0 } onClick={() => onMakeDecision()}>What Should I do?</button>
            <button onClick={() => removeOptions()}>Remove all Options</button>
            <ol>
                {app.options.length > 0 && mapOptions()}
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input type="text" name="option" />

                <button>Add Option</button>
                
            </form>
        </div>
    )
    ReactDOM.render(template, appRoot)
}

renderApp()



