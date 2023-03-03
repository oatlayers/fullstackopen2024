```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: When the save button is clicked, browser made a POST request.
    server-->>browser: Server responds with the message "note created"
    deactivate server

```