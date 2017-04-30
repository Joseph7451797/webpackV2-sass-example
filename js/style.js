require('../scss/main.scss') // include scss file

if ( !isProd ) { // it is tricky, add this for index.ejs reload
    require('file-loader!../template/index.ejs')
}