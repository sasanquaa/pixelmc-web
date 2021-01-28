const { override, addLessLoader, fixBabelImports } = require("customize-cra");
const { getThemeVariables } = require("antd/dist/theme");
const aliyunTheme = require("@ant-design/aliyun-theme");
/*
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: getThemeVariables({
          dark: true,
          compact: true
      })
    },
  }),
);
*/

module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true
	}),
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: {...getThemeVariables({
				compact: true
			}),...aliyunTheme}
		}
	})
);
