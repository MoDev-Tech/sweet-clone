# Vanilla HTML/CSS/JS + Node.js Implementation Guide

This guide covers rebuilding the IceDelights ice cream shop website without frameworks.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [HTML/CSS: Navigation & Hero Section](#htmlcss-navigation--hero-section)
3. [JavaScript: Cart Management System](#javascript-cart-management-system)
4. [Node.js: Express Server with WhatsApp API](#nodejs-express-server-with-whatsapp-api)

---

## Project Structure

```
ice-cream-shop/
├── public/
│   ├── css/
│   │   ├── variables.css      # Design tokens
│   │   ├── base.css           # Reset & typography
│   │   ├── components.css     # Reusable components
│   │   ├── layout.css         # Header, footer, grid
│   │   └── pages/
│   │       ├── home.css
│   │       ├── shop.css
│   │       ├── cart.css
│   │       └── checkout.css
│   ├── js/
│   │   ├── utils.js           # Helper functions
│   │   ├── cart.js            # Cart management
│   │   ├── api.js             # Backend communication
│   │   ├── components/
│   │   │   ├── header.js      # Dynamic header
│   │   │   ├── product-card.js
│   │   │   └── cart-drawer.js
│   │   └── pages/
│   │       ├── home.js
│   │       ├── shop.js
│   │       └── checkout.js
│   ├── images/
│   │   ├── hero-ice-cream.png
│   │   └── products/
│   ├── index.html
│   ├── shop.html
│   ├── cart.html
│   ├── checkout.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
├── server/
│   ├── index.js               # Express server
│   ├── routes/
│   │   ├── orders.js
│   │   └── contact.js
│   ├── middleware/
│   │   └── validation.js
│   └── services/
│       └── whatsapp.js
├── package.json
└── .env
```

---

## HTML/CSS: Navigation & Hero Section

### 1. Design System (variables.css)

```css
/* ===========================================
   DESIGN TOKENS - variables.css
   =========================================== */

:root {
  /* ===== COLOR PALETTE ===== */
  
  /* Primary - Pink/Magenta */
  --primary-h: 340;
  --primary-s: 82%;
  --primary-l: 52%;
  --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
  --primary-light: hsl(var(--primary-h), var(--primary-s), 65%);
  --primary-dark: hsl(var(--primary-h), var(--primary-s), 40%);
  --primary-foreground: hsl(0, 0%, 100%);
  
  /* Secondary - Cream/Warm */
  --secondary: hsl(30, 67%, 94%);
  --secondary-foreground: hsl(340, 82%, 35%);
  
  /* Accent - Yellow/Gold */
  --accent: hsl(45, 93%, 58%);
  --accent-foreground: hsl(30, 50%, 20%);
  
  /* Background & Foreground */
  --background: hsl(30, 50%, 98%);
  --foreground: hsl(240, 10%, 10%);
  
  /* Muted */
  --muted: hsl(30, 30%, 92%);
  --muted-foreground: hsl(240, 5%, 45%);
  
  /* Border & Ring */
  --border: hsl(30, 30%, 85%);
  --ring: hsl(340, 82%, 52%);
  
  /* Status Colors */
  --destructive: hsl(0, 84%, 60%);
  --success: hsl(142, 76%, 36%);
  
  /* ===== GRADIENTS ===== */
  --gradient-primary: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  --gradient-hero: linear-gradient(180deg, var(--secondary) 0%, var(--background) 100%);
  --gradient-card: linear-gradient(145deg, hsl(0, 0%, 100%) 0%, var(--secondary) 100%);
  
  /* ===== SHADOWS ===== */
  --shadow-sm: 0 1px 2px hsla(0, 0%, 0%, 0.05);
  --shadow-md: 0 4px 6px hsla(0, 0%, 0%, 0.07), 0 2px 4px hsla(0, 0%, 0%, 0.05);
  --shadow-lg: 0 10px 15px hsla(0, 0%, 0%, 0.1), 0 4px 6px hsla(0, 0%, 0%, 0.05);
  --shadow-xl: 0 20px 25px hsla(0, 0%, 0%, 0.1), 0 10px 10px hsla(0, 0%, 0%, 0.04);
  --shadow-glow: 0 0 40px hsla(340, 82%, 52%, 0.3);
  
  /* ===== TYPOGRAPHY ===== */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* ===== SPACING ===== */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  
  /* ===== BORDERS ===== */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  
  /* ===== TRANSITIONS ===== */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* ===== Z-INDEX ===== */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-tooltip: 600;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: hsl(240, 10%, 10%);
    --foreground: hsl(30, 50%, 98%);
    --muted: hsl(240, 10%, 20%);
    --muted-foreground: hsl(240, 5%, 65%);
    --border: hsl(240, 10%, 25%);
    --secondary: hsl(240, 10%, 15%);
    --secondary-foreground: hsl(30, 67%, 94%);
  }
}
```

### 2. Base Styles (base.css)

```css
/* ===========================================
   BASE STYLES - base.css
   =========================================== */

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--foreground);
  background-color: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: var(--leading-tight);
  color: var(--foreground);
}

h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-3xl); }
h4 { font-size: var(--text-2xl); }
h5 { font-size: var(--text-xl); }
h6 { font-size: var(--text-lg); }

p {
  margin-bottom: var(--space-4);
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--primary-dark);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Text Gradient */
.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 3. Navigation Component (layout.css)

```css
/* ===========================================
   NAVIGATION - layout.css
   =========================================== */

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: hsla(30, 50%, 98%, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  transition: box-shadow var(--transition-base);
}

.header.scrolled {
  box-shadow: var(--shadow-md);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .header__container {
    height: 80px;
    padding: 0 var(--space-6);
  }
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--foreground);
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.header__logo:hover {
  transform: scale(1.02);
  color: var(--foreground);
}

.header__logo-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  color: white;
  font-size: var(--text-xl);
}

.header__logo-text .highlight {
  color: var(--primary);
}

/* Desktop Navigation */
.nav {
  display: none;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
}

.nav__link {
  position: relative;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--muted-foreground);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav__link:hover {
  color: var(--foreground);
  background-color: var(--muted);
}

.nav__link--active {
  color: var(--primary);
  background-color: hsla(340, 82%, 52%, 0.1);
}

.nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: var(--primary);
  border-radius: var(--radius-full);
}

/* Header Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Cart Button */
.cart-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--secondary);
  border-radius: var(--radius-full);
  color: var(--foreground);
  transition: all var(--transition-fast);
}

.cart-button:hover {
  background-color: var(--primary);
  color: white;
  transform: scale(1.05);
}

.cart-button__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 var(--space-1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  font-size: var(--text-xs);
  font-weight: 700;
  border-radius: var(--radius-full);
  border: 2px solid var(--background);
}

/* Mobile Menu Button */
.menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--foreground);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.menu-button:hover {
  background-color: var(--muted);
}

@media (min-width: 768px) {
  .menu-button {
    display: none;
  }
}

/* Hamburger Icon */
.menu-button__icon {
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.menu-button__line {
  width: 100%;
  height: 2px;
  background-color: currentColor;
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.menu-button.open .menu-button__line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-button.open .menu-button__line:nth-child(2) {
  opacity: 0;
}

.menu-button.open .menu-button__line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  padding: var(--space-6);
  transform: translateX(100%);
  transition: transform var(--transition-smooth);
  z-index: var(--z-fixed);
  overflow-y: auto;
}

.mobile-nav.open {
  transform: translateX(0);
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}

.mobile-nav__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mobile-nav__link {
  display: block;
  padding: var(--space-4);
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--foreground);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.mobile-nav__link:hover,
.mobile-nav__link--active {
  background-color: hsla(340, 82%, 52%, 0.1);
  color: var(--primary);
}
```

### 4. Hero Section (pages/home.css)

```css
/* ===========================================
   HERO SECTION - pages/home.css
   =========================================== */

.hero {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  background: var(--gradient-hero);
  overflow: hidden;
}

/* Decorative Background Elements */
.hero__bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

.hero__blob--1 {
  top: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: hsla(340, 82%, 52%, 0.2);
  animation-delay: 0s;
}

.hero__blob--2 {
  bottom: 20%;
  left: 5%;
  width: 250px;
  height: 250px;
  background: hsla(45, 93%, 58%, 0.2);
  animation-delay: 2s;
}

.hero__blob--3 {
  top: 50%;
  left: 30%;
  width: 200px;
  height: 200px;
  background: hsla(180, 70%, 50%, 0.15);
  animation-delay: 4s;
}

/* Hero Content */
.hero__container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
  padding: var(--space-12) var(--space-4);
}

@media (min-width: 1024px) {
  .hero__container {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    padding: var(--space-16) var(--space-6);
  }
}

.hero__content {
  text-align: center;
}

@media (min-width: 1024px) {
  .hero__content {
    text-align: left;
  }
}

/* Badge */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: hsla(340, 82%, 52%, 0.1);
  border: 1px solid hsla(340, 82%, 52%, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--primary);
  margin-bottom: var(--space-6);
  animation: slideUp 0.6s ease-out;
}

.hero__badge-icon {
  font-size: var(--text-lg);
  animation: bounce 2s infinite;
}

/* Title */
.hero__title {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  animation: slideUp 0.6s ease-out 0.1s both;
}

@media (min-width: 768px) {
  .hero__title {
    font-size: var(--text-5xl);
  }
}

@media (min-width: 1024px) {
  .hero__title {
    font-size: var(--text-6xl);
  }
}

.hero__title-highlight {
  display: block;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Description */
.hero__description {
  font-size: var(--text-lg);
  color: var(--muted-foreground);
  max-width: 500px;
  margin: 0 auto var(--space-8);
  animation: slideUp 0.6s ease-out 0.2s both;
}

@media (min-width: 1024px) {
  .hero__description {
    font-size: var(--text-xl);
    margin: 0 0 var(--space-8);
  }
}

/* CTA Buttons */
.hero__cta {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  animation: slideUp 0.6s ease-out 0.3s both;
}

@media (min-width: 640px) {
  .hero__cta {
    flex-direction: row;
    justify-content: center;
  }
}

@media (min-width: 1024px) {
  .hero__cta {
    justify-content: flex-start;
  }
}

/* Hero Image */
.hero__image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__image-glow {
  position: absolute;
  width: 80%;
  height: 80%;
  background: var(--gradient-primary);
  filter: blur(80px);
  opacity: 0.3;
  border-radius: 50%;
  animation: pulse-soft 4s ease-in-out infinite;
}

.hero__image {
  position: relative;
  width: 100%;
  max-width: 500px;
  animation: float 4s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px hsla(0, 0%, 0%, 0.15));
}

@media (min-width: 1024px) {
  .hero__image {
    max-width: 600px;
  }
}

/* Stats */
.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border);
  animation: slideUp 0.6s ease-out 0.4s both;
}

.hero__stat {
  text-align: center;
}

@media (min-width: 1024px) {
  .hero__stat {
    text-align: left;
  }
}

.hero__stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary);
}

@media (min-width: 768px) {
  .hero__stat-value {
    font-size: var(--text-3xl);
  }
}

.hero__stat-label {
  font-size: var(--text-sm);
  color: var(--muted-foreground);
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse-soft {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}
```

### 5. Button Components (components.css)

```css
/* ===========================================
   BUTTONS - components.css
   =========================================== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

.btn--xl {
  padding: var(--space-5) var(--space-10);
  font-size: var(--text-lg);
}

/* Variants */
.btn--primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md), 0 0 0 0 hsla(340, 82%, 52%, 0.4);
}

.btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), 0 0 30px hsla(340, 82%, 52%, 0.4);
}

.btn--primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn--secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  border: 1px solid var(--border);
}

.btn--secondary:hover:not(:disabled) {
  background-color: var(--muted);
  border-color: var(--primary);
}

.btn--outline {
  background-color: transparent;
  color: var(--foreground);
  border: 2px solid var(--border);
}

.btn--outline:hover:not(:disabled) {
  background-color: var(--muted);
  border-color: var(--primary);
  color: var(--primary);
}

.btn--ghost {
  background-color: transparent;
  color: var(--foreground);
}

.btn--ghost:hover:not(:disabled) {
  background-color: var(--muted);
}

/* Icon Button */
.btn--icon {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: var(--radius-full);
}

.btn--icon.btn--sm {
  width: 36px;
  height: 36px;
}

.btn--icon.btn--lg {
  width: 52px;
  height: 52px;
}
```

### 6. HTML Structure (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="IceDelights - Premium artisanal ice cream made with love. Discover our delicious flavors and order online for delivery.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/pages/home.css">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  
  <title>IceDelights - Premium Artisanal Ice Cream</title>
</head>
<body>
  <!-- Header -->
  <header class="header" id="header">
    <div class="header__container">
      <!-- Logo -->
      <a href="/" class="header__logo">
        <span class="header__logo-icon">🍦</span>
        <span class="header__logo-text">
          Ice<span class="highlight">Delights</span>
        </span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="nav" aria-label="Main navigation">
        <a href="/" class="nav__link nav__link--active">Home</a>
        <a href="/shop.html" class="nav__link">Shop</a>
        <a href="/about.html" class="nav__link">About</a>
        <a href="/contact.html" class="nav__link">Contact</a>
        <a href="/faq.html" class="nav__link">FAQ</a>
      </nav>

      <!-- Header Actions -->
      <div class="header__actions">
        <!-- Cart Button -->
        <a href="/cart.html" class="cart-button" aria-label="View cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="cart-button__badge" id="cart-count">0</span>
        </a>

        <!-- Mobile Menu Button -->
        <button class="menu-button" id="menu-button" aria-label="Toggle menu" aria-expanded="false">
          <span class="menu-button__icon">
            <span class="menu-button__line"></span>
            <span class="menu-button__line"></span>
            <span class="menu-button__line"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
      <div class="mobile-nav__links">
        <a href="/" class="mobile-nav__link mobile-nav__link--active">Home</a>
        <a href="/shop.html" class="mobile-nav__link">Shop</a>
        <a href="/about.html" class="mobile-nav__link">About</a>
        <a href="/contact.html" class="mobile-nav__link">Contact</a>
        <a href="/faq.html" class="mobile-nav__link">FAQ</a>
      </div>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero" aria-labelledby="hero-title">
    <!-- Background Decorations -->
    <div class="hero__bg-decoration" aria-hidden="true">
      <div class="hero__blob hero__blob--1"></div>
      <div class="hero__blob hero__blob--2"></div>
      <div class="hero__blob hero__blob--3"></div>
    </div>

    <div class="hero__container container">
      <!-- Content -->
      <div class="hero__content">
        <!-- Badge -->
        <div class="hero__badge">
          <span class="hero__badge-icon">✨</span>
          <span>Premium Artisanal Ice Cream</span>
        </div>

        <!-- Title -->
        <h1 class="hero__title" id="hero-title">
          Handcrafted with
          <span class="hero__title-highlight">Love & Joy</span>
        </h1>

        <!-- Description -->
        <p class="hero__description">
          Discover the finest artisanal ice cream made with premium ingredients. 
          Every scoop is a moment of pure happiness.
        </p>

        <!-- CTA Buttons -->
        <div class="hero__cta">
          <a href="/shop.html" class="btn btn--primary btn--lg">
            <span>Shop Now</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/about.html" class="btn btn--outline btn--lg">
            Our Story
          </a>
        </div>

        <!-- Stats -->
        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-value">20+</span>
            <span class="hero__stat-label">Unique Flavors</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-value">10K+</span>
            <span class="hero__stat-label">Happy Customers</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-value">100%</span>
            <span class="hero__stat-label">Natural Ingredients</span>
          </div>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="hero__image-wrapper">
        <div class="hero__image-glow" aria-hidden="true"></div>
        <img 
          src="images/hero-ice-cream.png" 
          alt="Delicious artisanal ice cream cone with multiple scoops" 
          class="hero__image"
          width="600"
          height="600"
        >
      </div>
    </div>
  </section>

  <!-- More sections would follow... -->

  <!-- Scripts -->
  <script src="js/utils.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/components/header.js"></script>
  <script src="js/pages/home.js"></script>
</body>
</html>
```

### 7. Header JavaScript (js/components/header.js)

```javascript
/**
 * Header Component JavaScript
 * Handles mobile menu, scroll behavior, and active states
 */

class Header {
  constructor() {
    this.header = document.getElementById('header');
    this.menuButton = document.getElementById('menu-button');
    this.mobileNav = document.getElementById('mobile-nav');
    this.cartCount = document.getElementById('cart-count');
    
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateCartCount();
    this.setActiveNavLink();
    this.handleScroll();
  }
  
  bindEvents() {
    // Mobile menu toggle
    this.menuButton?.addEventListener('click', () => this.toggleMenu());
    
    // Close menu on link click
    this.mobileNav?.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.mobileNav?.contains(e.target) && 
          !this.menuButton?.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
    
    // Scroll behavior
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    
    // Cart updates
    window.addEventListener('cart-updated', () => this.updateCartCount());
  }
  
  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }
  
  openMenu() {
    this.isMenuOpen = true;
    this.menuButton?.classList.add('open');
    this.menuButton?.setAttribute('aria-expanded', 'true');
    this.mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  closeMenu() {
    this.isMenuOpen = false;
    this.menuButton?.classList.remove('open');
    this.menuButton?.setAttribute('aria-expanded', 'false');
    this.mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (scrollY > 10) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
    
    this.lastScrollY = scrollY;
  }
  
  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (this.cartCount) {
      this.cartCount.textContent = count.toString();
      this.cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  
  setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = currentPath === href || 
                       (currentPath === '/' && href === '/') ||
                       (currentPath.includes(href) && href !== '/');
      
      if (isActive) {
        link.classList.add(link.classList.contains('nav__link') 
          ? 'nav__link--active' 
          : 'mobile-nav__link--active'
        );
      } else {
        link.classList.remove('nav__link--active', 'mobile-nav__link--active');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Header();
});
```

---

## JavaScript: Cart Management System

### 1. Cart State Management (js/cart.js)

```javascript
/**
 * Cart Management System
 * Handles all cart operations with localStorage persistence
 */

class CartManager {
  constructor() {
    this.STORAGE_KEY = 'icedelights_cart';
    this.cart = this.loadCart();
    this.listeners = [];
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  loadCart() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
      this.notifyListeners();
      this.dispatchEvent();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // ==========================================
  // CART OPERATIONS
  // ==========================================

  /**
   * Add item to cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add (default: 1)
   */
  addItem(product, quantity = 1) {
    const existingIndex = this.cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    this.saveCart();
    return this.cart;
  }

  /**
   * Remove item from cart
   * @param {string} productId - Product ID to remove
   */
  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    return this.cart;
  }

  /**
   * Update item quantity
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(productId);
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
    return this.cart;
  }

  /**
   * Increment item quantity
   * @param {string} productId - Product ID
   */
  incrementQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
      this.saveCart();
    }
    return this.cart;
  }

  /**
   * Decrement item quantity
   * @param {string} productId - Product ID
   */
  decrementQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (item.quantity <= 1) {
        return this.removeItem(productId);
      }
      item.quantity -= 1;
      this.saveCart();
    }
    return this.cart;
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
    return this.cart;
  }

  // ==========================================
  // GETTERS
  // ==========================================

  /**
   * Get all cart items
   */
  getItems() {
    return [...this.cart];
  }

  /**
   * Get cart item by ID
   * @param {string} productId - Product ID
   */
  getItem(productId) {
    return this.cart.find(item => item.id === productId);
  }

  /**
   * Get total item count
   */
  getItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get subtotal
   */
  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Get shipping cost (free over $50)
   * @param {number} threshold - Free shipping threshold
   * @param {number} shippingCost - Default shipping cost
   */
  getShipping(threshold = 50, shippingCost = 5.99) {
    const subtotal = this.getSubtotal();
    return subtotal >= threshold ? 0 : shippingCost;
  }

  /**
   * Get grand total
   */
  getTotal() {
    return this.getSubtotal() + this.getShipping();
  }

  /**
   * Check if cart is empty
   */
  isEmpty() {
    return this.cart.length === 0;
  }

  /**
   * Get items grouped by category
   */
  getItemsByCategory() {
    const grouped = {};
    
    this.cart.forEach(item => {
      const category = item.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
      subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }));
  }

  /**
   * Get order summary for checkout
   */
  getOrderSummary() {
    return {
      items: this.getItems(),
      itemsByCategory: this.getItemsByCategory(),
      itemCount: this.getItemCount(),
      subtotal: this.getSubtotal(),
      shipping: this.getShipping(),
      grandTotal: this.getTotal()
    };
  }

  // ==========================================
  // EVENT SYSTEM
  // ==========================================

  /**
   * Subscribe to cart changes
   * @param {Function} callback - Callback function
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.cart));
  }

  dispatchEvent() {
    window.dispatchEvent(new CustomEvent('cart-updated', {
      detail: { cart: this.cart }
    }));
  }
}

// ==========================================
// SINGLETON INSTANCE
// ==========================================

const cart = new CartManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cart;
}

// Make available globally
window.cart = cart;
```

### 2. Cart UI Component (js/components/cart-drawer.js)

```javascript
/**
 * Cart Drawer Component
 * Slide-out cart panel with full functionality
 */

class CartDrawer {
  constructor() {
    this.isOpen = false;
    this.drawer = null;
    this.overlay = null;
    
    this.init();
  }

  init() {
    this.createDrawerHTML();
    this.bindEvents();
    this.render();
  }

  createDrawerHTML() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'cart-overlay';
    this.overlay.id = 'cart-overlay';
    
    // Create drawer
    this.drawer = document.createElement('aside');
    this.drawer.className = 'cart-drawer';
    this.drawer.id = 'cart-drawer';
    this.drawer.setAttribute('aria-label', 'Shopping cart');
    this.drawer.innerHTML = `
      <div class="cart-drawer__header">
        <h2 class="cart-drawer__title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Your Cart
          <span class="cart-drawer__count" id="drawer-cart-count">(0)</span>
        </h2>
        <button class="cart-drawer__close" id="close-cart" aria-label="Close cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="cart-drawer__content" id="cart-content">
        <!-- Cart items will be rendered here -->
      </div>
      
      <div class="cart-drawer__footer" id="cart-footer">
        <!-- Footer with totals and checkout button -->
      </div>
    `;
    
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.drawer);
  }

  bindEvents() {
    // Close button
    document.getElementById('close-cart')?.addEventListener('click', () => this.close());
    
    // Overlay click
    this.overlay?.addEventListener('click', () => this.close());
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
    
    // Cart update events
    window.addEventListener('cart-updated', () => this.render());
    
    // Open cart buttons
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  open() {
    this.isOpen = true;
    this.drawer?.classList.add('open');
    this.overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.render();
  }

  close() {
    this.isOpen = false;
    this.drawer?.classList.remove('open');
    this.overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  render() {
    const content = document.getElementById('cart-content');
    const footer = document.getElementById('cart-footer');
    const countEl = document.getElementById('drawer-cart-count');
    
    const items = cart.getItems();
    const itemCount = cart.getItemCount();
    
    // Update count
    if (countEl) countEl.textContent = `(${itemCount})`;
    
    if (items.length === 0) {
      this.renderEmptyState(content, footer);
    } else {
      this.renderItems(content, items);
      this.renderFooter(footer);
    }
  }

  renderEmptyState(content, footer) {
    if (content) {
      content.innerHTML = `
        <div class="cart-drawer__empty">
          <div class="cart-drawer__empty-icon">🍦</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious ice cream to get started!</p>
          <a href="/shop.html" class="btn btn--primary" onclick="cartDrawer.close()">
            Browse Flavors
          </a>
        </div>
      `;
    }
    
    if (footer) footer.innerHTML = '';
  }

  renderItems(content, items) {
    if (!content) return;
    
    content.innerHTML = `
      <ul class="cart-drawer__items">
        ${items.map(item => this.renderItem(item)).join('')}
      </ul>
    `;
    
    // Bind item events
    content.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleItemAction(e));
    });
  }

  renderItem(item) {
    return `
      <li class="cart-item" data-id="${item.id}">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item__details">
          <h4 class="cart-item__name">${item.name}</h4>
          <p class="cart-item__price">$${item.price.toFixed(2)}</p>
          <div class="cart-item__quantity">
            <button 
              class="cart-item__qty-btn" 
              data-action="decrement" 
              data-id="${item.id}"
              aria-label="Decrease quantity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <span class="cart-item__qty-value">${item.quantity}</span>
            <button 
              class="cart-item__qty-btn" 
              data-action="increment" 
              data-id="${item.id}"
              aria-label="Increase quantity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="cart-item__total">
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button 
            class="cart-item__remove" 
            data-action="remove" 
            data-id="${item.id}"
            aria-label="Remove ${item.name} from cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
        </div>
      </li>
    `;
  }

  renderFooter(footer) {
    if (!footer) return;
    
    const subtotal = cart.getSubtotal();
    const shipping = cart.getShipping();
    const total = cart.getTotal();
    const freeShippingThreshold = 50;
    const remaining = freeShippingThreshold - subtotal;
    
    footer.innerHTML = `
      ${remaining > 0 ? `
        <div class="cart-drawer__shipping-progress">
          <div class="shipping-progress__bar">
            <div class="shipping-progress__fill" style="width: ${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%"></div>
          </div>
          <p class="shipping-progress__text">
            Add <strong>$${remaining.toFixed(2)}</strong> more for free shipping!
          </p>
        </div>
      ` : `
        <div class="cart-drawer__free-shipping">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>You've unlocked free shipping!</span>
        </div>
      `}
      
      <div class="cart-drawer__summary">
        <div class="cart-drawer__row">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-drawer__row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div class="cart-drawer__row cart-drawer__row--total">
          <span>Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="cart-drawer__actions">
        <a href="/checkout.html" class="btn btn--primary btn--lg btn--full">
          Proceed to Checkout
        </a>
        <a href="/cart.html" class="btn btn--outline btn--full" onclick="cartDrawer.close()">
          View Full Cart
        </a>
      </div>
    `;
  }

  handleItemAction(e) {
    const btn = e.currentTarget;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    
    switch (action) {
      case 'increment':
        cart.incrementQuantity(id);
        break;
      case 'decrement':
        cart.decrementQuantity(id);
        break;
      case 'remove':
        cart.removeItem(id);
        break;
    }
  }
}

// Initialize
const cartDrawer = new CartDrawer();
window.cartDrawer = cartDrawer;
```

### 3. Cart Drawer CSS

```css
/* ===========================================
   CART DRAWER - components.css (add to file)
   =========================================== */

/* Overlay */
.cart-overlay {
  position: fixed;
  inset: 0;
  background-color: hsla(0, 0%, 0%, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-base);
  z-index: var(--z-modal-backdrop);
}

.cart-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Drawer */
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background-color: var(--background);
  box-shadow: var(--shadow-xl);
  transform: translateX(100%);
  transition: transform var(--transition-smooth);
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
}

.cart-drawer.open {
  transform: translateX(0);
}

/* Header */
.cart-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border);
}

.cart-drawer__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
}

.cart-drawer__count {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--muted-foreground);
}

.cart-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--muted-foreground);
  transition: all var(--transition-fast);
}

.cart-drawer__close:hover {
  background-color: var(--muted);
  color: var(--foreground);
}

/* Content */
.cart-drawer__content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
}

/* Empty State */
.cart-drawer__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-12) var(--space-4);
}

.cart-drawer__empty-icon {
  font-size: 4rem;
  margin-bottom: var(--space-4);
}

.cart-drawer__empty h3 {
  font-size: var(--text-xl);
  margin-bottom: var(--space-2);
}

.cart-drawer__empty p {
  color: var(--muted-foreground);
  margin-bottom: var(--space-6);
}

/* Items List */
.cart-drawer__items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Cart Item */
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--secondary);
  border-radius: var(--radius-lg);
}

.cart-item__image {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--background);
}

.cart-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item__details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.cart-item__name {
  font-size: var(--text-sm);
  font-weight: 600;
}

.cart-item__price {
  font-size: var(--text-sm);
  color: var(--primary);
  font-weight: 500;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
}

.cart-item__qty-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  background-color: var(--background);
  color: var(--foreground);
  transition: all var(--transition-fast);
}

.cart-item__qty-btn:hover {
  background-color: var(--primary);
  color: white;
}

.cart-item__qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.cart-item__total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
}

.cart-item__total span {
  font-weight: 700;
}

.cart-item__remove {
  color: var(--muted-foreground);
  padding: var(--space-1);
  transition: color var(--transition-fast);
}

.cart-item__remove:hover {
  color: var(--destructive);
}

/* Footer */
.cart-drawer__footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--border);
  background-color: var(--background);
}

.cart-drawer__shipping-progress {
  margin-bottom: var(--space-4);
}

.shipping-progress__bar {
  height: 6px;
  background-color: var(--muted);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-2);
}

.shipping-progress__fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-smooth);
}

.shipping-progress__text {
  font-size: var(--text-sm);
  color: var(--muted-foreground);
  text-align: center;
}

.cart-drawer__free-shipping {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: hsla(142, 76%, 36%, 0.1);
  color: var(--success);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: var(--space-4);
}

.cart-drawer__summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.cart-drawer__row {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--muted-foreground);
}

.cart-drawer__row--total {
  padding-top: var(--space-2);
  border-top: 1px solid var(--border);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--foreground);
}

.cart-drawer__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.btn--full {
  width: 100%;
}
```

---

## Node.js: Express Server with WhatsApp API

### 1. Server Setup (server/index.js)

```javascript
/**
 * IceDelights Express Server
 * WhatsApp Business API Integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3001;

// ===========================================
// SECURITY MIDDLEWARE
// ===========================================

// Helmet for security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: {
    success: false,
    error: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// ===========================================
// VALIDATION SCHEMAS
// ===========================================

const orderValidation = [
  body('formData.firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name too long')
    .escape(),
  body('formData.lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name too long')
    .escape(),
  body('formData.email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('formData.phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+]?[\d\s()-]+$/).withMessage('Invalid phone format'),
  body('formData.city')
    .trim()
    .notEmpty().withMessage('City is required')
    .escape(),
  body('formData.state')
    .trim()
    .notEmpty().withMessage('State is required')
    .escape(),
  body('formData.zipCode')
    .trim()
    .notEmpty().withMessage('ZIP code is required')
    .escape(),
  body('orderData.grandTotal')
    .isFloat({ min: 0 }).withMessage('Invalid total amount'),
  body('orderData.itemsByCategory')
    .isArray().withMessage('Items must be an array')
];

const contactValidation = [
  body('formData.firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name too long')
    .escape(),
  body('formData.lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name too long')
    .escape(),
  body('formData.email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('formData.phone')
    .trim()
    .optional()
    .matches(/^[+]?[\d\s()-]*$/).withMessage('Invalid phone format'),
  body('formData.message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message too long')
    .escape()
];

// ===========================================
// WHATSAPP SERVICE
// ===========================================

class WhatsAppService {
  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.recipientPhone = process.env.WHATSAPP_RECIPIENT_PHONE;
    this.apiUrl = `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`;
  }

  isConfigured() {
    return !!(this.accessToken && this.phoneNumberId && this.recipientPhone);
  }

  async sendMessage(text) {
    if (!this.isConfigured()) {
      console.warn('WhatsApp not configured. Message would be:', text);
      return { success: true, simulated: true };
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: this.recipientPhone,
          type: 'text',
          text: { body: text }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'WhatsApp API error');
      }

      return { success: true, messageId: data.messages?.[0]?.id };
    } catch (error) {
      console.error('WhatsApp send error:', error);
      throw error;
    }
  }

  formatOrderMessage(formData, orderData) {
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    });

    let message = `🍦 *NEW ORDER RECEIVED*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📅 *Date:* ${timestamp}\n\n`;

    // Customer Info
    message += `👤 *CUSTOMER DETAILS*\n`;
    message += `• Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `• Email: ${formData.email}\n`;
    message += `• Phone: ${formData.phone}\n`;
    message += `• Address: ${formData.city}, ${formData.state} ${formData.zipCode}\n`;
    
    if (formData.message) {
      message += `• Notes: ${formData.message}\n`;
    }
    message += `\n`;

    // Order Items
    message += `🛒 *ORDER ITEMS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;

    orderData.itemsByCategory?.forEach(category => {
      message += `\n*${category.category}*\n`;
      category.items?.forEach(item => {
        message += `  • ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
      });
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 Subtotal: $${orderData.subtotal?.toFixed(2) || '0.00'}\n`;
    message += `🚚 Shipping: $${orderData.shipping?.toFixed(2) || '0.00'}\n`;
    message += `💰 *TOTAL: $${orderData.grandTotal?.toFixed(2) || '0.00'}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━`;

    return message;
  }

  formatContactMessage(formData) {
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    });

    let message = `📬 *NEW CONTACT MESSAGE*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📅 *Date:* ${timestamp}\n\n`;
    message += `👤 *FROM:*\n`;
    message += `• Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `• Email: ${formData.email}\n`;
    
    if (formData.phone) {
      message += `• Phone: ${formData.phone}\n`;
    }
    
    message += `\n💬 *MESSAGE:*\n`;
    message += `${formData.message}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━`;

    return message;
  }
}

const whatsapp = new WhatsAppService();

// ===========================================
// API ROUTES
// ===========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    whatsappConfigured: whatsapp.isConfigured()
  });
});

// Send order notification
app.post('/api/send-order', orderValidation, async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { formData, orderData } = req.body;

    // Format and send message
    const message = whatsapp.formatOrderMessage(formData, orderData);
    const result = await whatsapp.sendMessage(message);

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    res.json({
      success: true,
      message: 'Order submitted successfully',
      orderId,
      whatsappSent: !result.simulated
    });

  } catch (error) {
    console.error('Order submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process order. Please try again.'
    });
  }
});

// Send contact message
app.post('/api/send-contact', contactValidation, async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { formData } = req.body;

    // Format and send message
    const message = whatsapp.formatContactMessage(formData);
    const result = await whatsapp.sendMessage(message);

    res.json({
      success: true,
      message: 'Message sent successfully',
      whatsappSent: !result.simulated
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again.'
    });
  }
});

// ===========================================
// ERROR HANDLING
// ===========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'Origin not allowed'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// ===========================================
// START SERVER
// ===========================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     IceDelights API Server             ║
╠════════════════════════════════════════╣
║  Status:    Running                    ║
║  Port:      ${PORT}                        ║
║  WhatsApp:  ${whatsapp.isConfigured() ? 'Configured ✓' : 'Not configured ✗'}           ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
```

### 2. Environment Configuration (server/.env.example)

```env
# ===========================================
# SERVER CONFIGURATION
# ===========================================

# Port to run the server on
PORT=3001

# Allowed origins for CORS (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# ===========================================
# WHATSAPP BUSINESS API
# ===========================================

# Your WhatsApp Business API access token
# Get this from Meta Business Suite > WhatsApp > API Setup
WHATSAPP_ACCESS_TOKEN=your_access_token_here

# Your WhatsApp Phone Number ID
# Found in Meta Business Suite > WhatsApp > Phone Numbers
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here

# The phone number to receive order notifications
# Format: country code + number (e.g., 1234567890)
WHATSAPP_RECIPIENT_PHONE=1234567890
```

### 3. Package Configuration (server/package.json)

```json
{
  "name": "icedelights-server",
  "version": "1.0.0",
  "description": "Express server for IceDelights with WhatsApp integration",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 4. Frontend API Client (public/js/api.js)

```javascript
/**
 * API Client
 * Handles all backend communication
 */

class ApiClient {
  constructor() {
    // Use environment-appropriate URL
    this.baseUrl = this.getApiUrl();
    this.timeout = 30000; // 30 seconds
  }

  getApiUrl() {
    // Check for production URL, otherwise use localhost
    if (window.location.hostname !== 'localhost') {
      return 'https://your-api-domain.com/api';
    }
    return 'http://localhost:3001/api';
  }

  /**
   * Make HTTP request with timeout
   */
  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      
      throw error;
    }
  }

  /**
   * Check API health
   */
  async healthCheck() {
    return this.request('/health');
  }

  /**
   * Submit order
   */
  async submitOrder(formData, orderData) {
    // Sanitize input
    const sanitizedFormData = this.sanitizeFormData(formData);
    
    return this.request('/send-order', {
      method: 'POST',
      body: JSON.stringify({
        formData: sanitizedFormData,
        orderData
      })
    });
  }

  /**
   * Submit contact form
   */
  async submitContact(formData) {
    const sanitizedFormData = this.sanitizeFormData(formData);
    
    return this.request('/send-contact', {
      method: 'POST',
      body: JSON.stringify({
        formData: sanitizedFormData
      })
    });
  }

  /**
   * Sanitize form data
   */
  sanitizeFormData(data) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Trim whitespace and remove potential XSS
        sanitized[key] = value
          .trim()
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .substring(0, 2000); // Limit length
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

// Export singleton
const api = new ApiClient();
window.api = api;
```

---

## Deployment

### Frontend (Static Hosting)

Deploy the `public/` folder to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop or `netlify deploy`
- **GitHub Pages**: Push to `gh-pages` branch

### Backend (Node.js Hosting)

Deploy the `server/` folder to:

**Render:**
1. Create new Web Service
2. Connect GitHub repo
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables

**Railway:**
```bash
cd server
railway login
railway init
railway up
```

**Heroku:**
```bash
cd server
heroku create icedelights-api
heroku config:set WHATSAPP_ACCESS_TOKEN=xxx
heroku config:set WHATSAPP_PHONE_NUMBER_ID=xxx
heroku config:set WHATSAPP_RECIPIENT_PHONE=xxx
git push heroku main
```

---

## Summary

This guide provides a complete implementation path for rebuilding the IceDelights website using vanilla technologies:

1. **CSS Variables** for a maintainable design system
2. **Semantic HTML** with accessibility in mind
3. **Vanilla JavaScript** with classes and modules
4. **localStorage** for cart persistence
5. **Express.js** for the API server
6. **WhatsApp Business API** for notifications

The code is modular, well-documented, and follows modern best practices without requiring any frontend frameworks.
