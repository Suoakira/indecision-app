const root = document.getElementById("root")

let showPane = false

const buttonToggle = () => {
    showPane = !showPane
    renderPage()
}

const renderPage = () => {

    const template = (
        <div>
        <h1>Visibility Toggle</h1>
        <button onClick={() => buttonToggle()}>Show Details</button>
            {showPane && <p>Hey, These are some details you can now see!</p>}
        </div>
    )
    ReactDOM.render(template, root)
}
renderPage()


