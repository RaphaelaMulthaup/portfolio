# 🌐 Frontend Developer Portfolio

This is my personal **portfolio website**, built with **Angular**, to showcase my work as a **Frontend Developer**.  
It presents my **skills, projects, and experience**, and also serves as a live example of my coding style and frontend craftsmanship.

---

## 🚀 Features

- **Responsive Design** – optimized for desktop, tablet, and mobile 
- **Smooth Section Scrolling** – on desktop, scrolling moves directly to the next section for an immersive experience  
- **Multi-language Support** – powered by [`@ngx-translate`](https://github.com/ngx-translate/core)  
- **Contact Form** – allows visitors to easily reach out directly from the website  
- **Modular Architecture** – clean and scalable component-based structure  
- **Easily Extensible** – organized modules and shared components  

---

## 🛠️ Tech Stack

- [Angular 19](https://angular.dev/)
- TypeScript
- SCSS
- RxJS
- Angular CDK
- @ngx-translate (internationalization)

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── imprint/                # Legal information page
│   ├── main-content/           # Main sections of the website
│   │   ├── about-me/           # About me section
│   │   ├── contact/            # Contact page with form
│   │   ├── landing-page/       # Landing page
│   │   ├── projects/           # Projects showcase
│   │   ├── references/         # References & testimonials
│   │   ├── shared/             # Reusable shared components
│   │   └── skills/             # Skills and technologies
│   ├── privacy-policy/         # Privacy policy page
│   ├── app.component.*         # Root component
│   ├── app.routes.ts           # Routing configuration
│   ├── portfolio.service.ts    # Service for portfolio/project data
│   └── ...
├── assets/                     # Images, fonts, and static assets
├── index.html                  # Main entry point
├── styles.scss                 # Global styles
└── main.ts                     # Angular bootstrap file
```

---

## 💻 Installation & Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/RaphaelaMulthaup/portfolio.git
cd portfolio
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm start
```

The application will be available at http://localhost:4200

---

## 🧱 Build for Production

```bash
npm run build
```

The compiled files will be generated in the dist/portfolio/ directory.
You can deploy them to any static web server.

---

## 📬 Contact

If you have any questions or feedback, feel free to reach out:
📧 kontakt@raphaela-multhaup.de

---

## 📝 License

This project is licensed under the **MIT License** – feel free to use, modify, and share it.