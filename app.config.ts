//เอาไว้ config พวก ui ต่าง ๆ

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'gray',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
  },
});
