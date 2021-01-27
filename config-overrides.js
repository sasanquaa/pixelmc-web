const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@font-family': 'Roboto',
        '@back-top-color': ' #fff',
        '@table-font-size': '13px',
        '@btn-height-base': '35px',
        '@input-height-base': '35px',
        '@border-radius-base': '6px',
        '@form-vertical-label-padding': '0px',
      },
    },
  }),
);
