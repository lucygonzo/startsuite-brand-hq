# StartSuite Color System

> Last updated: March 26, 2026
> Source: `brandData.ts` — `visualIdentity.colorPalette`

---

## Primary Colors

### Deep Purple
| Property | Value |
|----------|-------|
| **Hex** | `#6607E1` |
| **OKLCH** | `oklch(0.40 0.26 293)` |
| **RGB** | `rgb(102, 7, 225)` |
| **Usage** | Primary gradient color (dark end), dark accents, gradient backgrounds |
| **Notes** | The anchor of the StartSuite gradient. Use as the starting point for all gradient applications. |

### Medium Violet
| Property | Value |
|----------|-------|
| **Hex** | `#BE5CFF` |
| **OKLCH** | `oklch(0.65 0.22 295)` |
| **RGB** | `rgb(190, 92, 255)` |
| **Usage** | Primary gradient color (mid), interactive elements, hover states |
| **Notes** | The mid-point of the gradient. Can be used standalone for interactive elements. |

### Light Purple
| Property | Value |
|----------|-------|
| **Hex** | `#BC98FF` |
| **OKLCH** | `oklch(0.73 0.16 295)` |
| **RGB** | `rgb(188, 152, 255)` |
| **Usage** | Gradient endpoint (light), accent highlights, secondary badges |
| **Notes** | The light end of the gradient. Use for subtle highlights and secondary accents. |

### Dark Navy
| Property | Value |
|----------|-------|
| **Hex** | `#070322` |
| **OKLCH** | `oklch(0.08 0.04 280)` |
| **RGB** | `rgb(7, 3, 34)` |
| **Usage** | Primary text on light backgrounds, dark mode base |
| **Notes** | The brand's near-black. Has a violet undertone that ties it to the purple palette. |

---

## Secondary Colors

### Off-White
| Property | Value |
|----------|-------|
| **Hex** | `#EDEBF4` |
| **OKLCH** | `oklch(0.94 0.02 290)` |
| **RGB** | `rgb(237, 235, 244)` |
| **Usage** | Primary text on dark backgrounds, reversed logo wordmark |
| **Notes** | Not pure white — has a slight violet tint that keeps it in the brand palette. |

### Surface Dark
| Property | Value |
|----------|-------|
| **Hex** | `#131318` |
| **OKLCH** | `oklch(0.12 0.01 280)` |
| **RGB** | `rgb(19, 19, 24)` |
| **Usage** | Card backgrounds in dark mode, elevated surfaces |
| **Notes** | The primary surface color for dark-mode UI elements. |

### UI Purple
| Property | Value |
|----------|-------|
| **Hex** | `#8B6DB5` |
| **OKLCH** | `oklch(0.52 0.12 295)` |
| **RGB** | `rgb(139, 109, 181)` |
| **Usage** | Interactive elements, links, icon fills in UI contexts |
| **Notes** | A more muted purple for UI elements where the full gradient would be too intense. |

### Accent Lavender
| Property | Value |
|----------|-------|
| **Hex** | `#D4BEE8` |
| **OKLCH** | `oklch(0.82 0.08 295)` |
| **RGB** | `rgb(212, 190, 232)` |
| **Usage** | Subtle highlights, hover backgrounds, secondary badges |
| **Notes** | The lightest purple in the palette. Use for very subtle accent applications. |

---

## Gradients

### StartSuite Primary Gradient
- **Value:** `linear-gradient(135deg, #6607E1 0%, #BC98FF 100%)`
- **Usage:** Logo icon, primary CTAs, hero sections, active state indicators
- **Notes:** The signature gradient. Use with intention — not as wallpaper.

### StartSuite Soft Gradient
- **Value:** `linear-gradient(135deg, #8B6DB5 0%, #D4BEE8 100%)`
- **Usage:** Subtle backgrounds, card accents, secondary gradient applications
- **Notes:** A more muted version for contexts where the primary gradient is too intense.

### Dark Background Gradient
- **Value:** `linear-gradient(135deg, #070322 0%, #131318 100%)`
- **Usage:** Dark mode hero sections, full-bleed dark backgrounds
- **Notes:** The dark gradient for full-bleed dark sections.

---

## Color Usage Rules

1. The primary gradient is reserved for the logo, primary CTAs, and hero sections — not for decorative use
2. Never use the gradient as a full-page background — it dilutes the brand energy
3. On white backgrounds, use the Deep Purple (`#6607E1`) as the primary interactive color
4. Maintain a minimum contrast ratio of 4.5:1 for all text — the off-white (`#EDEBF4`) on Deep Purple passes
5. The Dark Navy (`#070322`) is the only approved near-black for text — do not substitute with pure black (`#000000`)
