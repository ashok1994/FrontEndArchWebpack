const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');

exports.extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
      // `allChunks` is needed with CommonsChunkPlugin to extract
      // from extracted chunks as well.
      allChunks: true,
      filename: "[name].css",
    });
  
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            include,
            exclude,
  
            use: plugin.extract({
              use,
              fallback: "style-loader",
            }),
          },
        ],
      },
      plugins: [plugin],
    };
  };

module.exports = {
    entry : path.resolve(__dirname, 'home.js'),
    output : {
        filename : 'home-bundle.js',
        path : path.resolve(__dirname, '../../../', 'dist/')
    },
    module : {
        rules : [ { 
            test : /\.scss$/ , 
            use : ExtractTextPlugin.extract({
                use : "css-loader!sass-loader",
                fallback : "style-loader"
            })
        }]
    },
    plugins : [
        new ExtractTextPlugin("home.css"),
        new UglifyJsPlugin(),        
        new HtmlWebpackPlugin({ 
            template : path.resolve(__dirname, './home.html') , filename : 'home.html' 
        })
    ]
   
}