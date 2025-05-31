@parcel/transformer-postcss: O pacote inclui transpilação CSS e fornecedor
prefixo por padrão. A configuração do PostCSS postcss.config.js contém o seguinte
plugins redundantes : autoprefixer. Removê-los pode melhorar o desempenho da compilação .
  /opt/render/project/src/postcss.config.js:1:1
  > 1 | module.exports = {
  > | ^
    2 | plugins: {
    3 | tailwindcss: {},
💡 Remova os plugins acima de postcss.config.js
📝 Saiba mais: https://parceljs.org/languages/css/#default-plugins
