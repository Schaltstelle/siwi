/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 140,
  trailingComma: 'es5',
  tailwindFunctions: ['clsx', 'tw'],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
}

export default config
