module.exports = function(env) {
    return {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      },
    };
  };