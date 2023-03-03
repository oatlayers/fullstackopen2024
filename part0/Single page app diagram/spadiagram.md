```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    Note right of browser: Browser make a GET request to the address above
    server-->>browser: Server responds with html
    deactivate server

```