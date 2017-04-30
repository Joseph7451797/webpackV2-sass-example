# webpackV2-sass-example

This is an example of sass/scss and webpack integration.

**Note:** This example uses webpack v2 and webpack-dev-server v2. Some settings may differ from v1's. If you are loking for v1 setting, link is here - [webpack-sass-example](https://github.com/Joseph7451797/webpack-sass-example)

## Requirements
- npm >=3

## How to use

Download or clone this repository, and run:
```bash
$ npm install
```

Open dev mode:
```bash
$ npm run hot-dev
```

Open `http://localhost:8080/`, and you can see basic UI. Now return to your editor and change any sass setting in `scss/partials/index.scss`. After save the file, browser will automatically reload and style changed.

Host mode:
```bash
$ npm run host
```

Use host feature of webpack-dev-server. It alllows your colleague to see your web page from LAN. Just give them url address returned in terminal.

Generate bundle：
```bash
$ npm run build
```

## License

MIT
