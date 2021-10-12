let path = require("path");

let HTMLWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin");
let TerserWebpackPlugin = require("terser-webpack-plugin");
let { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

let isDev = process.env.NODE_ENV === "development";
let isProd = !isDev;

let optimization = () => {
  let config = {
    splitChunks: {
      chunks: "all"
    }
  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
};

let plugins = () => {
  let base = [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/img/favicon.ico"),
          to: path.resolve(__dirname, "dist/img")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename("css")
    }),
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

let filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;


module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["react-hot-loader/patch", "@babel/polyfill", "./index.js"]
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    // Alias
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@style": path.resolve(__dirname, "src/styles"),
      "@img": path.resolve(__dirname, "src/public/img"),
      "@comp": path.resolve(__dirname, "src/components"),
    }
  },
  optimization: optimization(),
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
  },
  devtool: isDev ? "source-map" : false,
  plugins: plugins(),
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|svg|gif|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "img",
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.xml/,
        use: ["xml-loader"]
      },
      {
        test: /\.csv/,
        use: ["csv-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript"
            ]
          }
        }
      },
      {
        test: /(\.jsx|index.js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
    ]
  }
};