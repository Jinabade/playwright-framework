param(
    [string]$TestFile = "tests\web\end-to-end-shopping-flow.spec.ts"
)

cd C:\Playwright-framework
$env:WEB_APP_URL = "http://localhost/opencart/upload/"

& .\node_modules\.bin\playwright test $TestFile