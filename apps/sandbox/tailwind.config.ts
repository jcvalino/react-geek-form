/** @type {import('tailwindcss').Config} */
import twContainerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-50': 'var(--brand-50)',
        'brand-100': 'var(--brand-100)',
        'brand-200': 'var(--brand-200)',
        'brand-300': 'var(--brand-300)',
        'brand-400': 'var(--brand-400)',
        'brand-500': 'var(--brand-500)',
        'brand-600': 'var(--brand-600)',
        'brand-700': 'var(--brand-700)',
        'brand-800': 'var(--brand-800)',
        'brand-900': 'var(--brand-900)',
        'brand-1000': 'var(--brand-1000)',
        'brand-1100': 'var(--brand-1100)',

        'blue-50': 'var(--blue-50)',
        'blue-100': 'var(--blue-100)',
        'blue-200': 'var(--blue-200)',
        'blue-300': 'var(--blue-300)',
        'blue-400': 'var(--blue-400)',
        'blue-500': 'var(--blue-500)',
        'blue-600': 'var(--blue-600)',
        'blue-700': 'var(--blue-700)',
        'blue-800': 'var(--blue-800)',
        'blue-900': 'var(--blue-900)',
        'blue-1000': 'var(--blue-1000)',
        'blue-1100': 'var(--blue-1100)',

        'green-50': 'var(--green-50)',
        'green-100': 'var(--green-100)',
        'green-200': 'var(--green-200)',
        'green-300': 'var(--green-300)',
        'green-400': 'var(--green-400)',
        'green-500': 'var(--green-500)',
        'green-600': 'var(--green-600)',
        'green-700': 'var(--green-700)',
        'green-800': 'var(--green-800)',
        'green-900': 'var(--green-900)',
        'green-1000': 'var(--green-1000)',
        'green-1100': 'var(--green-1100)',

        'yellow-50': 'var(--yellow-50)',
        'yellow-100': 'var(--yellow-100)',
        'yellow-200': 'var(--yellow-200)',
        'yellow-300': 'var(--yellow-300)',
        'yellow-400': 'var(--yellow-400)',
        'yellow-500': 'var(--yellow-500)',
        'yellow-600': 'var(--yellow-600)',
        'yellow-700': 'var(--yellow-700)',
        'yellow-800': 'var(--yellow-800)',
        'yellow-900': 'var(--yellow-900)',
        'yellow-1000': 'var(--yellow-1000)',
        'yellow-1100': 'var(--yellow-1100)',

        'red-50': 'var(--red-50)',
        'red-100': 'var(--red-100)',
        'red-200': 'var(--red-200)',
        'red-300': 'var(--red-300)',
        'red-400': 'var(--red-400)',
        'red-500': 'var(--red-500)',
        'red-600': 'var(--red-600)',
        'red-700': 'var(--red-700)',
        'red-800': 'var(--red-800)',
        'red-900': 'var(--red-900)',
        'red-1000': 'var(--red-1000)',
        'red-1100': 'var(--red-1100)',

        'black-50': 'var(--black-50)',
        'black-100': 'var(--black-100)',
        'black-200': 'var(--black-200)',
        'black-300': 'var(--black-300)',
        'black-400': 'var(--black-400)',
        'black-500': 'var(--black-500)',
        'black-600': 'var(--black-600)',
        'black-700': 'var(--black-700)',
        'black-800': 'var(--black-800)',
        'black-900': 'var(--black-900)',
        'black-1000': 'var(--black-1000)',
        'black-1100': 'var(--black-1100)',

        'white-50': 'var(--white-50)',
        'white-100': 'var(--white-100)',
        'white-200': 'var(--white-200)',
        'white-300': 'var(--white-300)',
        'white-400': 'var(--white-400)',
        'white-500': 'var(--white-500)',
        'white-600': 'var(--white-600)',
        'white-700': 'var(--white-700)',
        'white-800': 'var(--white-800)',
        'white-900': 'var(--white-900)',
        'white-1000': 'var(--white-1000)',
        'white-1100': 'var(--white-1100)',
      },

      opacity: {
        0: 'var(--alpha-0)',
        10: 'var(--alpha-10)',
        20: 'var(--alpha-20)',
        40: 'var(--alpha-40)',
        60: 'var(--alpha-60)',
        80: 'var(--alpha-80)',
      },

      backgroundColor: {
        interface: {
          DEFAULT: 'var(--white-100)',
          selected: {
            DEFAULT: 'var(--blue-400)',
            subtle: 'var(--blue-50)',
          },
          active: 'var(--white-100)',
          hovered: 'var(--white-200)',
          disabled: 'var(--white-300)',
          light: 'var(--white-100)',
          overlay: 'var(--alpha-40)',
        },
        status: {
          neutral: 'var(--white-400)',
          success: 'var(--green-400)',
          warning: 'var(--yellow-400)',
          danger: 'var(--red-600)',
        },
        inverse: {
          DEFAULT: 'var(--black-500)',
          hovered: 'var(--black-600)',
          pressed: 'var(--black-400)',
        },
        brand: {
          DEFAULT: 'var(--brand-700)',
          hovered: {
            DEFAULT: 'var(--brand-800)',
            subtle: 'var(--brand-100)',
          },
          pressed: {
            DEFAULT: 'var(--brand-900)',
            subtle: 'var(--brand-200)',
          },
          subtle: 'var(--brand-50)',
        },
        info: {
          DEFAULT: 'var(--blue-700)',
          hovered: {
            DEFAULT: 'var(--blue-800)',
            subtle: 'var(--blue-100)',
          },
          pressed: {
            DEFAULT: 'var(--blue-900)',
            subtle: 'var(--blue-200)',
          },
          subtle: 'var(--blue-50)',
        },
        success: {
          DEFAULT: 'var(--green-600)',
          hovered: {
            DEFAULT: 'var(--green-700)',
            subtle: 'var(--green-100)',
          },
          pressed: {
            DEFAULT: 'var(--green-800)',
            subtle: 'var(--green-200)',
          },
          subtle: 'var(--green-50)',
        },
        warning: {
          DEFAULT: 'var(--yellow-600)',
          hovered: {
            DEFAULT: 'var(--yellow-500)',
            subtle: 'var(--yellow-100)',
          },
          pressed: {
            DEFAULT: 'var(--yellow-700)',
            subtle: 'var(--yellow-200)',
          },
          subtle: 'var(--yellow-50)',
        },
        danger: {
          DEFAULT: 'var(--red-600)',
          hovered: {
            DEFAULT: 'var(--red-500)',
            subtle: 'var(--red-100)',
          },
          pressed: {
            DEFAULT: 'var(--red-700)',
            subtle: 'var(--red-200)',
          },
          subtle: 'var(--red-50)',
        },
      },

      textColor: {
        DEFAULT: 'var(--black-800)',
        inverse: 'var(--white-200)',
        subtle: 'var(--white-1100)',
        placeholder: 'var(--white-800)',
        disabled: 'var(--white-700)',
        brand: 'var(--brand-700)',
        info: 'var(--blue-700)',
        success: 'var(--green-600)',
        warning: 'var(--yellow-600)',
        danger: 'var(--red-700)',
        light: 'var(--white-100)',
        dark: 'var(--black-100)',

        onSelected: {
          DEFAULT: 'var(--white-50)',
          subtle: 'var(--blue-600)',
        },

        onInverse: {
          DEFAULT: 'var(--white-100)',
        },

        onBrand: {
          DEFAULT: 'var(--white-50)',
          subtle: 'var(--brand-700)',
        },

        onInfo: {
          DEFAULT: 'var(--white-50)',
          subtle: 'var(--blue-700)',
        },

        onSuccess: {
          DEFAULT: 'var(--white-50)',
          subtle: 'var(--green-700)',
        },

        onWarning: {
          DEFAULT: 'var(--white-50)',
          subtle: 'var(--yellow-700)',
        },

        onDanger: {
          DEFAULT: 'var(--white-50)',
          subtle: 'var(--red-700)',
        },
      },

      borderColor: {
        DEFAULT: 'var(--white-400)',
        subtle: 'var(--white-300)',
        selected: 'var(--brand-600)',
        inverse: 'var(--black-400)',
        light: 'var(--brand-100)',

        brand: {
          DEFAULT: 'var(--brand-600)',
          subtle: 'var(--brand-400)',
        },

        info: {
          DEFAULT: 'var(--blue-600)',
          subtle: 'var(--blue-400)',
        },

        success: {
          DEFAULT: 'var(--green-600)',
          subtle: 'var(--green-400)',
        },

        warning: {
          DEFAULT: 'var(--yellow-200)',
          subtle: 'var(--yellow-400)',
        },

        danger: {
          DEFAULT: 'var(--red-400)',
          subtle: 'var(--red-500)',
        },
      },

      outlineColor: {
        DEFAULT: 'var(--white-400)',
        subtle: 'var(--white-300)',
        selected: 'var(--brand-600)',
        inverse: 'var(--black-400)',
        light: 'var(--brand-100)',

        brand: {
          DEFAULT: 'var(--brand-600)',
          subtle: 'var(--brand-400)',
        },

        info: {
          DEFAULT: 'var(--blue-600)',
          subtle: 'var(--blue-400)',
        },

        success: {
          DEFAULT: 'var(--green-600)',
          subtle: 'var(--green-400)',
        },

        warning: {
          DEFAULT: 'var(--yellow-200)',
          subtle: 'var(--yellow-400)',
        },

        danger: {
          DEFAULT: 'var(--red-400)',
          subtle: 'var(--red-500)',
        },
      },

      ringColor: {
        DEFAULT: 'var(--white-400)',
        subtle: 'var(--white-300)',
        selected: 'var(--brand-600)',
        inverse: 'var(--black-400)',
        light: 'var(--brand-100)',

        brand: {
          DEFAULT: 'var(--brand-600)',
          subtle: 'var(--brand-400)',
        },

        info: {
          DEFAULT: 'var(--blue-600)',
          subtle: 'var(--blue-400)',
        },

        success: {
          DEFAULT: 'var(--green-600)',
          subtle: 'var(--green-400)',
        },

        warning: {
          DEFAULT: 'var(--yellow-200)',
          subtle: 'var(--yellow-400)',
        },

        danger: {
          DEFAULT: 'var(--red-400)',
          subtle: 'var(--red-500)',
        },
      },

      spacing: {
        none: 'var(--spacing-0)',
        '2px': 'var(--spacing-2)',
        '4px': 'var(--spacing-4)',
        '6px': 'var(--spacing-6)',
        '8px': 'var(--spacing-8)',
        '10px': 'var(--spacing-10)',
        '12px': 'var(--spacing-12)',
        '14px': 'var(--spacing-14)',
        '16px': 'var(--spacing-16)',
        '18px': 'var(--spacing-18)',
        '20px': 'var(--spacing-20)',
        '24px': 'var(--spacing-24)',
        '28px': 'var(--spacing-28)',
        '32px': 'var(--spacing-32)',
        '40px': 'var(--spacing-40)',
        '60px': 'var(--spacing-60)',
      },

      borderRadius: {
        none: 'var(--corner-none)',
        '2px': 'var(--corner-2px)',
        '4px': 'var(--corner-4px)',
        '6px': 'var(--corner-6px)',
        '8px': 'var(--corner-8px)',
        '10px': 'var(--corner-10px)',
        '12px': 'var(--corner-12px)',
        '16px': 'var(--corner-16px)',
        '24px': 'var(--corner-24px)',
        full: 'var(--corner-rounded)',
      },

      fontFamily: {
        default: 'var(--font-family)',
        monospace: 'var(--font-family-mono)',
      },

      fontSize: {
        display: [
          'var(--font-size-display)',
          {
            lineHeight: 'var(--leading-display)',
          },
        ],

        title: [
          'var(--font-size-title)',
          {
            lineHeight: 'var(--leading-title)',
          },
        ],

        heading: [
          'var(--font-size-heading)',
          {
            lineHeight: 'var(--leading-heading)',
          },
        ],

        subheading: [
          'var(--font-size-subheading)',
          {
            lineHeight: 'var(--leading-subheading)',
          },
        ],

        lead: [
          'var(--font-size-lead)',
          {
            lineHeight: 'var(--leading-lead)',
          },
        ],

        body: [
          'var(--font-size-body)',
          {
            lineHeight: 'var(--leading-body)',
          },
        ],

        'body-tight': [
          'var(--font-size-body)',
          {
            lineHeight: 'var(--leading-body-tight)',
          },
        ],

        'body-relaxed': [
          'var(--font-size-body)',
          {
            lineHeight: 'var(--leading-body-relaxed)',
          },
        ],

        'body-loose': [
          'var(--font-size-body)',
          {
            lineHeight: 'var(--leading-body-loose)',
          },
        ],

        'body-large': [
          'var(--font-size-body-large)',
          {
            lineHeight: 'var(--leading-body-large)',
          },
        ],

        'body-large-tight': [
          'var(--font-size-body-large)',
          {
            lineHeight: 'var(--leading-body-large-tight)',
          },
        ],

        'body-large-relaxed': [
          'var(--font-size-body-large)',
          {
            lineHeight: 'var(--leading-body-large-relaxed)',
          },
        ],

        'body-large-loose': [
          'var(--font-size-body-large)',
          {
            lineHeight: 'var(--leading-body-large-loose)',
          },
        ],

        caption: [
          'var(--font-size-caption)',
          {
            lineHeight: 'var(--leading-caption)',
          },
        ],

        'caption-tight': [
          'var(--font-size-caption)',
          {
            lineHeight: 'var(--leading-caption-tight)',
          },
        ],

        'caption-relaxed': [
          'var(--font-size-caption)',
          {
            lineHeight: 'var(--leading-caption-relaxed)',
          },
        ],

        'caption-loose': [
          'var(--font-size-caption)',
          {
            lineHeight: 'var(--leading-caption-loose)',
          },
        ],
      },
    },
  },
  plugins: [twContainerQueries],
};
