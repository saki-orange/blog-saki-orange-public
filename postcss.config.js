module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
// module.exports = {
//   plugins: [
//     "autoprefixer",
//     [
//       "@fullhuman/postcss-purgecss",
//       {
//         content: ["./pages/**/*.js", "./components/**/*.js"],
//         defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
//         safelist: {
//           standard: ["html", "body"],
//           deep: [],
//           greedy: [],
//         },
//       },
//     ],
//   ],
// };
