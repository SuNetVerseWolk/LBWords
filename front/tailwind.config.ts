import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      colors: {
				dark: {
					brown: '#170c02',
					richBrown: '#4e2a0b',
				},
				cats: {
					lightBeige: '#f5e6d4',
					warmTan: '#c59d71',
					mediumBrown: '#b38e65',
					darkTaupe: '#8d755c',
					lightCoral: '#ff7777',
				},
        foreground: {
					main: '#000',
					bitT: 'blue',
					aBitT: '#f7ceac',
				},
				primary: {
					main: '#ffddbb',
					bitDarken: '#ffd9b8',
					darken: '#ffd5b0',
				},
				secondary: {
					main: '#ffd5b0',
					dark: '#4e2a0b',
					darken: '#efbd90',
				},
      },
			spacing: {
				'0.5': 'clamp(.125rem, .5vw + .25rem, .5rem)',
				'1': 'clamp(.25rem, 1vw + .25rem, 1rem)',
				'1.5': 'clamp(.375rem, 1.5vw + .25rem, 1.5rem)',
				'2': 'clamp(.5rem, 2vw + .25rem, 2rem)',
				'2.5': 'clamp(.625rem, 2.5vw + .25rem, 2.5rem)',
				'3': 'clamp(.75rem, 3vw + .25rem, 3rem)',
				'3.5': 'clamp(.875rem, 3.5vw + .25rem, 3.5rem)',
				'4': 'clamp(1rem, 4vw + .25rem, 4rem)',
				'5': 'clamp(1.25rem, 5vw + .25rem, 5rem)',
				'6': 'clamp(1.5rem, 6vw + .25rem, 6rem)',
				'7': 'clamp(1.75rem, 7vw + .25rem, 7rem)',
				'8': 'clamp(2rem, 8vw + .25rem, 8rem)',
				'9': 'clamp(2.25rem, 9vw + .25rem, 9rem)',
				'10': 'clamp(2.5rem, 10vw + .25rem, 10rem)',
				'11': 'clamp(2.75rem, 11vw + .25rem, 11rem)',
				'12': 'clamp(3rem, 12vw + .25rem, 12rem)',
			},
			borderRadius: {
				'0.5': 'clamp(.125rem, .5vw + .25rem, .5rem)',
				'1': 'clamp(.25rem, 1vw + .25rem, 1rem)',
				'1.5': 'clamp(.375rem, 1.5vw + .25rem, 1.5rem)',
				'2': 'clamp(.5rem, 2vw + .25rem, 2rem)',
				'2.5': 'clamp(.625rem, 2.5vw + .25rem, 2.5rem)',
				'3': 'clamp(.75rem, 3vw + .25rem, 3rem)',
				'3.5': 'clamp(.875rem, 3.5vw + .25rem, 3.5rem)',
				'4': 'clamp(1rem, 4vw + .25rem, 4rem)',
				'5': 'clamp(1.25rem, 5vw + .25rem, 5rem)',
				'6': 'clamp(1.5rem, 6vw + .25rem, 6rem)',
				'7': 'clamp(1.75rem, 7vw + .25rem, 7rem)',
				'8': 'clamp(2rem, 8vw + .25rem, 8rem)',
				'9': 'clamp(2.25rem, 9vw + .25rem, 9rem)',
				'10': 'clamp(2.5rem, 10vw + .25rem, 10rem)',
				'11': 'clamp(2.75rem, 11vw + .25rem, 11rem)',
				'12': 'clamp(3rem, 12vw + .25rem, 12rem)',
			},
			fontSize: {
				'parent': 'inherit',
				'xb': 'clamp(.55rem, .7vw + .5rem, .75rem)',
				'bt': 'clamp(.625rem, 1vw + .5rem, .875rem)',
				'xs': 'clamp(0.75rem, 1.5vw + 0.5rem, 1rem)',
        'sm': 'clamp(0.875rem, 2vw + 0.5rem, 1.125rem)',
        'base': 'clamp(1rem, 2.5vw + 0.5rem, 1.25rem)',
        'lg': 'clamp(1.125rem, 3vw + 0.5rem, 1.5rem)',
        'xl': 'clamp(1.25rem, 4vw + 0.5rem, 1.75rem)',
        '2xl': 'clamp(1.5rem, 5vw + 0.5rem, 2rem)',
        '3xl': 'clamp(1.875rem, 6vw + 0.5rem, 2.25rem)',
        '4xl': 'clamp(2.25rem, 7vw + 0.5rem, 2.75rem)',
        '5xl': 'clamp(3rem, 8vw + 0.5rem, 3.75rem)',
        '6xl': 'clamp(3.75rem, 9vw + 0.5rem, 4.5rem)',
			},
			fontFamily: {
				pangolin: 'Pangolin',
				shantell_Sans: 'Shantell_Sans',
				hachiMaruPop: 'HachiMaruPop',
			}
    },
  },
	plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.grid-center': {
          display: 'grid',
          'place-items': 'center',
        },
				'.flex-center': {
					display: 'flex',
					'justify-content': 'center',
					'align-items': 'center',
				},
				'.hw-full': {
					width: '100%',
					height: '100%',
				},
      });
    }),
  ],
} satisfies Config;
