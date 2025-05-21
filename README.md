# PdfStreamer

<img src="/public/demo.png" alt="Demo Image of PDF Streamer"/>

PDF Streamer is a lightweight Angular application that allows users to upload and interact with PDF documents directly in the browser. It supports smooth page navigation, zoom controls, and displays selectable text layers when available. 

<a href="https://github.com/users/Apozsgai97/projects/7"> Check out my planning board for the project!</a>

## Development server

### Install dependencies
```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Features
**Upload PDFs:** Users can upload PDF files directly from their computer.

**Page Navigation:** Easily switch between pages in the uploaded PDF.

**Zoom In/Out:** Control the zoom level for better readability and detail.

**Text Layer Support:** If the PDF contains a text layer, users can view and interact with the underlying text content.


## Upcoming Features
**Text Highlighting:** Users will be able to highlight selected text from the PDF and save their highlights for later reference.

## Tech Stack
- **Frontend:**
  - Next.js
  - React
  - Tailwind CSS
  - PostgreSQL
  - Drizzle
  - Docker (for database containerization)

## Technical Concepts
**Angular Framework:** Built using Angular for a reactive and modular frontend.

**Signals:** Utilized Angular signals for efficient state management.

**Lifecycle Hooks:** Used lifecycle hooks like ViewChild and ngAfterViewInit for precise DOM and component control.

**Component Communication:** Implemented a shared service to manage communication between components.

**PDF Rendering:** Integrated PDF.js (or similar) to render PDFs and access text layers.
