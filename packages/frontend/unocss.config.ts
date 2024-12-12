import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-left': 'flex justify-start items-center',
      'flex-right': 'flex justify-end items-center',
      'nav-tab-icon': 'w-30px h-30px flex-center cursor-pointer',
      'position-center': 'absolute top-1/2 left-1/2 translate-x--1/2 translate-y--1/2',
    },
  ],
});
