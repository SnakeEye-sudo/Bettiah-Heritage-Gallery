# Bettiah Heritage Gallery

A Local Heritage Photo Gallery application for preserving and showcasing the cultural heritage of Bettiah, Bihar. This web-based gallery allows users to upload, display, and tag heritage photos with a clean and intuitive interface.

## Overview

Bettiah Heritage Gallery is a client-side JavaScript application designed to celebrate and document the rich cultural heritage of Bettiah. The application enables users to:
- Upload heritage photos locally
- Display images in an organized gallery format
- Add descriptive tags to categorize heritage items
- Browse and filter images by tags
- Preserve local history through visual documentation

This is a basic version that runs entirely in the browser without requiring any backend API or database.

## Features

- **Image Upload**: Simple drag-and-drop or file selection interface for uploading heritage photos
- **Gallery Display**: Clean grid layout showcasing all uploaded heritage images
- **Tagging System**: Add multiple tags to each image for better organization (e.g., "temple", "colonial-era", "monument")
- **Tag Filtering**: Filter images by specific tags to find related heritage items
- **Local Storage**: Images are stored locally in the browser using localStorage/IndexedDB
- **Demo Images**: Includes placeholder images to demonstrate gallery functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Dependencies**: Pure JavaScript implementation, no external libraries required

## Setup

1. Clone the repository:
```bash
git clone https://github.com/SnakeEye-sudo/Bettiah-Heritage-Gallery.git
```

2. Navigate to the project directory:
```bash
cd Bettiah-Heritage-Gallery
```

3. Open `index.html` in your web browser:
```bash
# On most systems, you can simply double-click index.html
# Or use a local web server:
python -m http.server 8000
# Then visit http://localhost:8000
```

4. Start uploading and tagging your Bettiah heritage photos!

## File Structure

```
Bettiah-Heritage-Gallery/
├── index.html          # Main HTML file with gallery structure
├── script.js           # JavaScript logic for gallery functionality
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Usage

1. **Upload Photos**: Click the upload button or drag-and-drop images into the upload area
2. **Add Tags**: When uploading, add relevant tags describing the heritage item (e.g., "Bettiah Palace", "historical", "architecture")
3. **View Gallery**: All uploaded images appear in the gallery grid
4. **Filter**: Click on tags to filter and view related heritage photos
5. **Manage**: Remove images or edit tags as needed

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- LocalStorage API / IndexedDB
- FileReader API

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

Contributions are welcome! If you'd like to improve the Bettiah Heritage Gallery:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - you are free to use, modify, and distribute this software.

## Acknowledgments

- Dedicated to preserving the rich cultural heritage of Bettiah, Bihar
- Inspired by the need to document and celebrate local history
- Thanks to all contributors helping preserve Bettiah's heritage

## Future Enhancements

- Export gallery as PDF/slideshow
- Share individual images or collections
- Advanced search functionality
- Image editing tools
- Cloud storage integration
- Community sharing features

---

**Note**: This is a client-side only application. All data is stored locally in your browser. For persistent storage across devices, consider implementing a backend API in future versions.
