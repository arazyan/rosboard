import React, { useEffect, useId } from "react"
import usePythonScript from "../hooks/usePythonScript"

interface PythonProviderProps {
    path: string
    args?: unknown[]
}

const PythonProvider: React.FC<PythonProviderProps> = ({
    path,
    args,
}) => {
    const id = useId()

    console.log('script loading ');


    const mainPythonFileName = 'main.py'
    const mainPythonScriptPath = `/python/${mainPythonFileName}`
    pyodide.runPythonAsync(`
        from pyodide.http import pyfetch
        response = await pyfetch("${mainPythonScriptPath}")

        with open("${mainPythonFileName}", "wb") as f:
            f.write(await response.bytes())
    `).then(() => {
        const pkg = pyodide.pyimport(`${mainPythonFileName.replace('.py', '')}`)
        pkg.main()
    })

    // usePythonScript({ path: '/python/main.py' }).then(pkg => {
    //     // pkg.main()
    // })

    return <div>
        { id }
    </div>
}

export default PythonProvider
export type { PythonProviderProps }
