import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

async function main(){
    let pyodide = await loadPyodide()
    await pyodide.loadPackage("micropip")
    const micropip = pyodide.pyimport("micropip")
    await micropip.install('panel')

    const mainPythonFileName = 'main.py'
    const mainPythonScriptPath = `/python/${mainPythonFileName}`

    await pyodide.runPythonAsync(`
        from pyodide.http import pyfetch
        response = await pyfetch("${mainPythonScriptPath}")

        with open("${mainPythonFileName}", "wb") as f:
            f.write(await response.bytes())
    `)

    const pkg = pyodide.pyimport(`${mainPythonFileName.replace('.py', '')}`)
    pkg.main()
}

main()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
