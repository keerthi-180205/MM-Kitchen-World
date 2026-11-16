import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import("tailwindcss").Config} */
export default {
  // JSON is scanned too: product badge colours (tagColor) are stored as class strings in the data.
  content: ["./index.html", "./src/**/*.{js,jsx,json}"],
  darkMode: "class",
  theme: {
    "extend": {
      "colors": {
        "background": "#FAF7F0",
        "secondary": "#295fa4",
        "secondary-fixed": "#d5e3ff",
        "surface-dim": "#d1daee",
        "primary-container": "#0878E8",
        "on-tertiary-fixed": "#002109",
        "on-error-container": "#93000a",
        "error": "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed-dim": "#3de273",
        "primary": "#005bb3",
        "on-tertiary-container": "#f7fff3",
        "primary-fixed-dim": "#a9c7ff",
        "on-secondary-fixed-variant": "#004689",
        "on-surface-variant": "#414753",
        "tertiary-fixed": "#66ff8e",
        "surface-container-low": "#EAF4FF",
        "on-primary-fixed-variant": "#00468c",
        "surface-container-high": "#dfe8fd",
        "surface": "#FAF7F0",
        "surface-variant": "#dae3f7",
        "on-surface": "#202938",
        "on-background": "#202938",
        "inverse-on-surface": "#ecf1ff",
        "on-tertiary": "#ffffff",
        "primary-fixed": "#d6e3ff",
        "surface-container": "#e7eeff",
        "on-primary-container": "#fefcff",
        "secondary-container": "#86b5ff",
        "outline-variant": "#E2E8F0",
        "inverse-surface": "#064A8E",
        "secondary-fixed-dim": "#a8c8ff",
        "inverse-primary": "#a9c7ff",
        "outline": "#717785",
        "surface-bright": "#f9f9ff",
        "on-primary-fixed": "#001b3d",
        "surface-container-highest": "#dae3f7",
        "error-container": "#ffdad6",
        "on-secondary": "#ffffff",
        "surface-tint": "#0878E8",
        "on-secondary-fixed": "#001b3c",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "on-secondary-container": "#004587",
        "on-tertiary-fixed-variant": "#005322",
        "tertiary": "#25D366",
        "tertiary-container": "#128C7E"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "space-xl": "2.5rem",
        "space-xs": "0.25rem",
        "gutter": "1.5rem",
        "space-lg": "1.5rem",
        "space-md": "1rem",
        "space-sm": "0.5rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem",
        "gutter-mobile": "1rem"
      },
      "fontFamily": {
        "headline-lg": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "body-md": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "label-sm": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "label-md": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "body-sm": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "body-lg": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "headline-md": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "display-hero-mobile": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "label-lg": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "display-hero": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "headline-lg-mobile": [
          "Plus Jakarta Sans",
          "sans-serif"
        ],
        "headline-sm": [
          "Plus Jakarta Sans",
          "sans-serif"
        ]
      },
      "fontSize": {
        "headline-lg": [
          "36px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "body-md": [
          "15px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "label-sm": [
          "11px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.04em",
            "fontWeight": "700"
          }
        ],
        "label-md": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.02em",
            "fontWeight": "600"
          }
        ],
        "body-sm": [
          "13px",
          {
            "lineHeight": "20px",
            "fontWeight": "400"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "fontWeight": "400"
          }
        ],
        "headline-md": [
          "24px",
          {
            "lineHeight": "32px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "display-hero-mobile": [
          "36px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "label-lg": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.01em",
            "fontWeight": "600"
          }
        ],
        "display-hero": [
          "56px",
          {
            "lineHeight": "64px",
            "letterSpacing": "-0.02em",
            "fontWeight": "600"
          }
        ],
        "headline-lg-mobile": [
          "28px",
          {
            "lineHeight": "36px",
            "fontWeight": "600"
          }
        ],
        "headline-sm": [
          "20px",
          {
            "lineHeight": "28px",
            "fontWeight": "600"
          }
        ]
      }
    }
  },
  plugins: [forms, containerQueries],
};
