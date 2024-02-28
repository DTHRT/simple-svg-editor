# SIMPLE-SVG-EDITOR

This project is a simplified SVG editor, which is a refactored and more understandable version of the original source code by Gabi, focused on SVG manipulation including drag and rotate functionalities.

**Original Source Code:** [SVG: Drag & Rotate by Gabi](https://codepen.io/enxaneta/details/QdOprr)

## Overview

The purpose of this project is to provide a clearer, more accessible approach to manipulating SVG elements through dragging and rotating actions. It has been structured to cater to both beginners and intermediate developers interested in working with SVGs and JavaScript.

### Branches

The project is divided into two main branches, each serving a distinct version of the application:

#### `original`

- **Description:** This branch contains the original concept by Gabi, albeit with some refactoring to improve readability and maintainability.
- **Purpose:** To offer users the original functionality and design for comparison and educational purposes.

#### `main`

- **Description:** This branch hosts the modified version of the application.
- **Key Differences:**
  - Unlike the original version where SVG elements are dynamically generated via `main.js`, the modified version operates on static SVG elements pre-defined within the `index.html` file. This approach simplifies the understanding of SVG manipulation and the overall structure of the application.

### Technology Stack

- **Frontend:** Vanilla JavaScript
- **Development Server:** live-server (Node.js)

## Getting Started

To get started with the SIMPLE-SVG-EDITOR, you can clone the repository and switch between the `original` and `main` branches to explore both versions:

```bash
git clone <repository-url>
cd SIMPLE-SVG-EDITOR
# To switch to the original version
git checkout original
# To switch to the modified version
git checkout main
```

Run the server:

```bash
npm run dev
```

## Contributing

Contributions are welcome! If you have ideas for improvements or have found bugs, please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.
