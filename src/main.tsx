import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

async function main(){
    let pyodide = await loadPyodide()
    // Loading libs
    await pyodide.loadPackage("micropip")
    await pyodide.loadPackage("scikit-learn")
    await pyodide.loadPackage("pandas")
    await pyodide.loadPackage("xgboost")

    const micropip = pyodide.pyimport("micropip")
    await micropip.install('panel')

    window.pyodide = pyodide

    // const mainPythonFileName = 'main.py'
    // const mainPythonScriptPath = `/python/${mainPythonFileName}`

    // await pyodide.runPythonAsync(`
    //     from pyodide.http import pyfetch
    //     response = await pyfetch("${mainPythonScriptPath}")

    //     with open("${mainPythonFileName}", "wb") as f:
    //         f.write(await response.bytes())
    // `)

    // const pkg = pyodide.pyimport(`${mainPythonFileName.replace('.py', '')}`)
    // pkg.main()
}

main().then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
})
