module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [require('daisyui'), require('ps-scrollbar-tailwind')],
  daisyui: {
    themes: [
      {
        siakun: {
          primary: '#F9A93A',
          'primary-focus': '#b87414',
          'primary-content': '#ffffff',
          secondary: '#862a1d',
          'secondary-focus': '#54251F',
          'secondary-content': '#ffffff',
          accent: '#F7E150',
          'accent-focus': '#e3b145',
          'accent-content': '#ffffff',
          neutral: '#362824',
          'neutral-focus': '#862a1d',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f5f5f5',
          'base-300': '#eaeaea',
          'base-content': '#1f2937',
          info: '#57a0db',
          success: '#7eae4a',
          warning: '#fb9e12',
          error: '#f44336',
        },
      },
    ],
  },
}
