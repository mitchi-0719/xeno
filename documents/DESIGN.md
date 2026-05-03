# Design Specification: XENO Official Website

## Target: AI Implementation (Frontend/CSS/UI)

This document provides structured design tokens and component specifications for the card game "XENO" website, optimized for LLM-based code generation.

---

## 1. Global Design Tokens

### 1.1 Color Palette

Use these variables for theme consistency.

| Token Name            | Hex Code  | RGB                  | Usage                                 |
| :-------------------- | :-------- | :------------------- | :------------------------------------ |
| `--color-primary`     | `#BB2423` | `rgb(187, 36, 35)`   | Primary buttons, brand accents.       |
| `--color-accent-dark` | `#7D1817` | `rgb(125, 24, 23)`   | Darker red for headings/hover states. |
| `--color-bg-base`     | `#FFFFFF` | `rgb(255, 255, 255)` | Main page background.                 |
| `--color-bg-light`    | `#E8E6E6` | `rgb(232, 230, 230)` | Section backgrounds, card containers. |
| `--color-text-main`   | `#000000` | `rgb(0, 0, 0)`       | Primary headings and body text.       |
| `--color-text-sub`    | `#757575` | `rgb(117, 117, 117)` | Secondary labels and meta-data.       |

### 1.2 Typography

**Primary Font Stack:** `"Helvetica Neue", Helvetica, Arial, "Hiragino Sans", "Meiryo", sans-serif`

| Element              | Weight      | Font Size       | Line Height | Letter Spacing |
| :------------------- | :---------- | :-------------- | :---------- | :------------- |
| **H1 (Hero Title)**  | 700 (Bold)  | `55px`          | 1.2         | -0.02em        |
| **H2 (Section)**     | 700 (Bold)  | `36px`          | 1.3         | Normal         |
| **H3 (Sub-section)** | 700 (Bold)  | `28px`          | 1.4         | Normal         |
| **Body (Large)**     | 400 (Reg)   | `17px`          | 1.6         | Normal         |
| **Body (Standard)**  | 300 (Light) | `14px` - `16px` | 1.5         | 0.05em         |
| **Decorative**       | `Sarina`    | `32px`          | -           | -              |

---

## 2. Layout Structure & UI Components

### 2.1 Header (`#SITE_HEADER`)

- **Position:** Fixed or Sticky (Top).
- **Height:** `54px`.
- **Background:** Transparent or Solid White depending on scroll position.

### 2.2 Primary Button

- **Default Style:**
  - `background-color: var(--color-primary)`
  - `color: var(--color-bg-base)`
  - `padding: 12px 24px`
  - `border: none`
  - `cursor: pointer`
- **Hover State:**
  - `opacity: 0.8` or `background-color: var(--color-accent-dark)`
  - `transition: background-color 0.4s ease, opacity 0.4s ease`

### 2.3 SlideShow Container

- **Behavior:** Horizontal auto-play slider.
- **Nav UI:** - Floating arrow buttons (Prev/Next) on the sides.
  - Pagination dots at the bottom center. Active dot should have a higher opacity or distinct border.

### 2.4 Feature Repeater (Card Layout)

- **Container:** Grid or Flexbox.
- **Item Style:**
  - Centered text and media.
  - Image transition: Initial state `filter: blur(9px)` with a slow transition to `filter: none` on load/scroll.

---

## 3. Interaction & Animation Logic

### 3.1 Transitions

- All interactive elements (links, buttons) must implement `transition: all 0.4s ease`.

### 3.2 Scroll Reveal

- **Blur-to-Clear Effect:** Apply a Gaussian blur to images/containers. As the element enters the viewport, remove the blur with a duration of `1.2s`.

### 3.3 View Transitions

- Implement basic fade-in/out transitions for page content or section switching to mimic the Wix "OutIn" transition behavior.
