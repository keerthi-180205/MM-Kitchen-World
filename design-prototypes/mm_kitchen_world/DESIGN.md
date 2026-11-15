---
name: MM Kitchen World
colors:
  surface: '#f9f9ff'
  surface-dim: '#d1daee'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dfe8fd'
  surface-container-highest: '#dae3f7'
  on-surface: '#131c2a'
  on-surface-variant: '#414753'
  inverse-surface: '#283140'
  inverse-on-surface: '#ecf1ff'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005db7'
  primary: '#005bb3'
  on-primary: '#ffffff'
  primary-container: '#0073e0'
  on-primary-container: '#fefcff'
  inverse-primary: '#a9c7ff'
  secondary: '#295fa4'
  on-secondary: '#ffffff'
  secondary-container: '#86b5ff'
  on-secondary-container: '#004587'
  tertiary: '#006b2e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00873c'
  on-tertiary-container: '#f7fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468c'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a8c8ff'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#004689'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#f9f9ff'
  on-background: '#131c2a'
  surface-variant: '#dae3f7'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the polished clarity of a high-end architectural kitchen appliance showroom balanced with an efficient, high-utility operational console. The brand projects precision craftsmanship, hospitality warmth, and technical mastery. 

The aesthetic is Modern Architectural Commercial:
- Warm, grounded limestone canvases layered with clinical porcelain-white cards.
- Technical, luminous cobalt and navy accents evoking stainless steel precision and domestic luxury.
- Restrained editorial serif headlines balanced by precise, engineered geometric sans-serif interfaces.
- Clear structural division between public catalog presentation (inspirational, pristine, spacious) and showroom owner workflows (compact, actionable, data-dense).

## Colors

The palette establishes an immediate identity rooted in premium kitchen architecture:

- **Primary Blue (`#0878E8`)**: Core brand accent, interactive elements, primary action triggers, and active navigation indicators.
- **Deep Blue (`#064A8E`)**: Anchoring tone used for architectural headers, elevated chrome details, high-contrast badges, and primary hover states.
- **Cream Warm Canvas (`#FAF7F0`)**: Base viewport background. Replaces stark gray backgrounds with an architectural, natural stone texture that highlights white product displays.
- **Pure White (`#FFFFFF`)**: Product surfaces, active data containers, modals, and elevation cards.
- **Light Blue (`#EAF4FF`)**: Tinted ambient surface fills, selected states, contextual notification banners, and subtle appliance spec containers.
- **Charcoal Text (`#202938`)**: Primary typography baseline delivering crisp contrast without artificial pitch-black harshness.
- **Slate Text (`#64748B`)**: Secondary typography, technical spec subtitles, appliance model identifiers, and placeholder text.
- **Subtle Border (`#E2E8F0`)**: Hairline dividers defining module limits and table row bounds.
- **WhatsApp Green (`#25D366`)**: Reserved exclusively for customer sales communication actions and floating direct-enquiry touchpoints.

## Typography

The type system blends editorial prestige with commercial legibility:

- **Editorial Serif (`Playfair Display`)**: Applied strictly to marquee brand statements, collection title cards, category landing headers, and showroom highlight heroes. Never applied to body copy or utilitarian data grids.
- **Architectural Sans-serif (`Plus Jakarta Sans`)**: Serves as the primary operational workhorse across body text, specs tables, SKU metadata, filter systems, and dashboard management tools. Geometric curves maintain readability even at dense 11px and 12px scales.
- **Numerics & Specs**: Ensure tab-aligned numbers for pricing, SKU numbers, dimensions, and wattage values within appliance specification charts.

## Layout & Spacing

The layout is built around a fixed maximum container width of 1440px with a structural 12-column responsive fluid grid.

- **Desktop (1024px and up)**: 12-column grid, `margin` of `3rem`, and `gutter` of `1.5rem`. Public appliance showcases use generous row gaps (`space-xl`), while inventory management panels tighten gaps to `space-md`.
- **Tablet (768px – 1023px)**: 8-column grid, `margin` of `2rem`, and `gutter` of `1.25rem`. Two-up product cards convert into structured lists with right-aligned specs.
- **Mobile (Below 768px)**: 4-column grid, `margin-mobile` of `1.25rem`, and `gutter-mobile` of `1rem`. Appliance filters shift to bottom sheets; hero headlines shift to mobile typography tokens.

## Elevation & Depth

Visual hierarchy uses architectural layering over the warm `#FAF7F0` canvas:

- **Flat / Ground Level**: The base screen tone (`#FAF7F0`) provides warmth. Inset cards or subtle container wells use `#EAF4FF` with hairline `#E2E8F0` borders and no drop shadow.
- **Level 1 (Card & Module Surface)**: Pure White (`#FFFFFF`) containers with a fine structural border (`1px solid #E2E8F0`) and an ambient shadow: `0 2px 8px -2px rgba(6, 74, 142, 0.04)`.
- **Level 2 (Hover & Active Interactive)**: Lifted white surfaces use: `0 12px 24px -6px rgba(6, 74, 142, 0.08)`, shifting border colors to `#0878E8` at 30% opacity.
- **Level 3 (Showroom Modals, Drawers & Popovers)**: `#FFFFFF` floating panels with: `0 24px 48px -12px rgba(6, 74, 142, 0.16)`.
- **Level 4 (Direct Inquiries & WhatsApp Anchor)**: Sticky floating elements use: `0 8px 24px -4px rgba(37, 211, 102, 0.3)`.

## Shapes

The design uses balanced, tailored rounding:
- **Base Geometry (`roundedness: 2`)**: Interactive buttons, input fields, spec pills, and standard appliance data modules use an 8px (`0.5rem`) radius.
- **Containers (`rounded-lg`)**: Appliance image containers, product cards, filter drawers, and metric stat boards use 16px (`1rem`).
- **Showroom Modules (`rounded-xl`)**: Hero banner containers, lead capture modal frames, and high-impact showroom showcases scale to 24px (`1.5rem`).
- **Pills**: Category status chips, stock counters, WhatsApp contact triggers, and promotion badges remain fully circular (`9999px`).

## Components

### Buttons
- **Primary Action**: Solid `#0878E8` fill, `#FFFFFF` text, 8px radius, bold label. Hover shifts to `#064A8E` with a 2px elevation lift. Active state compresses scale to 0.98.
- **Secondary Action**: Border of `1.5px solid #064A8E`, text `#064A8E`, transparent background. On hover, background fills with `#EAF4FF`.
- **Showroom WhatsApp Button**: Solid `#25D366` fill, `#FFFFFF` typography with WhatsApp glyph. Elevated with an emerald ambient glow for immediate discovery.
- **Ghost/Tertiary**: No border, `#64748B` typography, shifts to `#0878E8` on hover with an underlying underline or pill-fill.

### Cards & Appliance Displays
- **Showroom Showcase Card**: Pure White (`#FFFFFF`) card on the `#FAF7F0` canvas. Features an aspect-ratio-locked image zone with an `#EAF4FF` neutral wash, crisp brand watermark, hairline `#E2E8F0` border, technical badge row, price in `#064A8E`, and instant inquiry trigger.
- **Dashboard Metric Card**: Compact 16px padding, white fill, hairline top accent line tinted in `#0878E8`, containing label-md metadata and high-contrast charcoal values.

### Chips & Badges
- **Status Pills**: 
  - *In Stock / Showroom Displayed*: 4px vertical padding, 10px horizontal padding, `#EAF4FF` background with `#064A8E` text.
  - *New Arrival / Premium Tier*: `#064A8E` solid background with `#FFFFFF` text.
  - *WhatsApp Instant Enquiry*: `#25D366` at 15% opacity with `#128C7E` text.

### Form Inputs & Filters
- **Text & Select Fields**: `#FFFFFF` background, 1px border of `#E2E8F0`, 8px radius, 12px vertical padding, 16px horizontal padding. Active focus ring: `2px solid #0878E8` with a 2px offset in `#FAF7F0`.
- **Search Engine**: Integrated search bar with `#EAF4FF` focus state and category select toggle on desktop.

### Lists & Specification Grids
- **Technical Spec Matrix**: Alternating rows transitioning from `#FFFFFF` to `#FAF7F0` at 50% opacity, bordered with hairline `#E2E8F0`. Left column holds `#64748B` label names; right column displays `#202938` bold values with numeric tabular alignment.

### Checkboxes & Radios
- **Selection Controls**: 20px rounded squares (checkbox) and 20px circles (radio), `#E2E8F0` default border. Checked state transitions instantly to `#0878E8` with `#FFFFFF` check mark icon.