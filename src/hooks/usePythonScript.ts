interface UsePythonScriptProps {
    path: string
}

const usePythonScript = async ({
    path,
}: UsePythonScriptProps) => {
    pyodide.runPythonAsync(`
        from pyodide.http import pyfetch
        response = await pyfetch("${path}")

        with open("${path}", "wb") as f:
            f.write(await response.bytes())
    `)

    // const pkg = pyodide.pyimport(`${path.replace('.py', '')}`)
    // return pkg
}

export default usePythonScript
export { usePythonScript }
