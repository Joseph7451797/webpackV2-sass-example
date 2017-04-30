var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var WDS_PORT = '8080';
var isProd = process.env.NODE_ENV === 'build';
var isHost = process.env.NODE_ENV === 'host';
var publicPath = isProd ? '/build/' : isHost ? `http://${process.argv[6]}:${WDS_PORT}/` : `http://localhost:${WDS_PORT}/`;

var devSassloader = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProd,
            importLoaders: 2
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [ // all plugin info can be found on postcss-loader github page
                    require('postcss-css-reset'),
                    require('autoprefixer')({
                        browsers: [ '> 5%' ]
                    })
                ];
            }
        }
    },
    {
        // Because I still want to write scss, use sass-loader for scss file.
        loader: 'sass-loader',
        options: {
            sourceMap: !isProd
        }
    }
]

var ExtractCSS = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
            loader: 'css-loader',
            options: {
                sourceMap: !isProd,
                importLoaders: 2
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    // All plugin info can be found on postcss-loader github page
                    return [
                        require('postcss-css-reset'),
                        require('autoprefixer')({
                            browsers: [ '> 5%' ]
                        })
                    ];
                }
            }
        },
        {
            // Because I still want to write scss, use sass-loader for scss file.
            loader: 'sass-loader',
            options: {
                sourceMap: !isProd
            }
        }
    ]
})

var plugins = [
    new webpack.DefinePlugin({
        isProd: isProd // pass variable to all entry source
    }),
    new HtmlWebpackPlugin({
        template: 'template/index.ejs',
        filename: 'index.html', // change to '../index.html' for different output path
        chunks: ['style'], // add chunk style.js(scss file included)
        minify: { // minify rule
            collapseWhitespace: isProd,
            minifyCSS: {
                level: {
                    1: {
                        specialComments: isProd ? 0 : 'all' // remove special comments like /*! comments...
                    }
                }
            },
            removeAttributeQuotes: isProd
        }
    })
];

if( isProd ){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            comments: false
        }),
        new ExtractTextPlugin({
            // use extract-text-webpack-plugin 'contenthash' instead of webpack '[hash]'
            filename: '[name]-[contenthash].css'
        })
    )
}

module.exports = {
    entry: {
        style: [
            "./js/style"
        ]
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build/',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test : /\.(woff|ttf|svg|eot|jpeg|jpg|png|gif|git)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name]-[hash:3].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                // only in production mode will use extract-text-webpack-plugin
                use: isProd ? ExtractCSS : devSassloader
            }
        ],
    },
    devtool: isProd ? 'cheap-source-map' : 'source-map',
    devServer: {
        port: WDS_PORT,
        contentBase: __dirname,
        stats: "minimal"
    },
    plugins: plugins
}
