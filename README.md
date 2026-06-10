# Personal Portfolio Website

A modern, fully responsive personal portfolio website built with pure HTML, CSS, and Vanilla JavaScript. 

## 🚀 Features

*   **Modern UI/UX Design**: Clean, professional look with glassmorphism elements and gradient accents.
*   **Dark / Light Mode**: Built-in theme toggler that persists user preference via `localStorage`.
*   **Fully Responsive**: Adapts seamlessly to all screen sizes (mobile, tablet, desktop) using CSS Grid and Flexbox.
*   **Smooth Animations**:
    *   Dynamic typing effect in the hero section.
    *   Scroll reveal animations (`IntersectionObserver`) as you navigate the page.
    *   Smooth scrolling and hover transitions.
*   **Project Showcase**: Interactive project gallery powered by [Swiper.js](https://swiperjs.com/).
*   **Zero Dependencies**: Aside from Swiper.js for the carousel, the project uses 100% Vanilla JS and CSS (no jQuery, Bootstrap, or Tailwind). All icons are inline SVGs.
*   **Performance & SEO Optimized**: Semantic HTML5 structure, lazy-loaded images, and accessibility best practices (ARIA labels, skip links).

## 🛠️ Technologies Used

*   **HTML5**: Semantic tags, accessible structure.
*   **CSS3**: Custom properties (CSS variables), Grid, Flexbox, keyframe animations, media queries for responsive design.
*   **JavaScript (ES6+)**: DOM manipulation, Event Listeners, Intersection Observer API, Local Storage.
*   **Swiper.js**: For the responsive portfolio slider.

## 📂 Project Structure

```text
📦 project_profile
 ┣ 📂 css
 ┃ ┗ 📜 style.css       # Main stylesheet (Design system, responsive rules)
 ┣ 📂 js
 ┃ ┗ 📜 main.js         # Main JavaScript (Animations, theme toggle, logic)
 ┣ 📂 img               # Directory for all project and profile images
 ┣ 📜 index.html        # Main HTML file
 ┗ 📜 README.md         # Project documentation
```

## 💻 Getting Started

This is a static website, so no build tools or servers are required to run it locally.

1.  **Clone the repository** (if using Git) or download the source code.
    ```bash
    git clone https://github.com/saimonyaky/Portfolio.git
    ```
2.  **Open the project**: Simply open the `index.html` file in any modern web browser.
    *   Alternatively, use an extension like "Live Server" in VS Code for live reloading during development.

## 🎨 Customization

To make this portfolio your own, you can edit the following:

*   **Colors & Typography**: Open `css/style.css` and modify the CSS variables inside the `:root` block at the top of the file to change the primary colors, fonts, and spacing.
*   **Content**: Edit `index.html` to update the text, add your own projects, and change the social links.
*   **Images**: Replace the images in the `img/` folder with your own. Ensure you update the file paths in the `index.html` if the filenames change.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use it, modify it, and make it your own!
