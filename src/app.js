console.log("Hello World")


const app = {
    title: "Indecision App",
    subTitle: "",
    options: ["One", "Two"]
}


let template = (
    <div>
        <p>{app.title}</p>
        {app.subTitle && <p>{app.subTitle}</p>}
        {app.options.length > 0 ? 
            <p>Here are your options</p> 
            :
        "No Options"
        }
        <ol>
            <li></li>
            <li></li>
        </ol>
    </div>
)



let count = 0;

const increment = () => {
    count += 1
    renderCounterApp()
    console.log("addOne", count)
}

const decrement = () => {
    count -= 1
    renderCounterApp()
    console.log("subtractOne", count)
}

const reset = () => {
    count = 0
    renderCounterApp()
    console.log("reset", count)
}



let appRoot = document.querySelector("#root")


const renderCounterApp = () => {
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => increment()}>+1</button>
            <button onClick={() => decrement()}>-1</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    )
    ReactDOM.render(templateTwo, appRoot)
}
renderCounterApp()