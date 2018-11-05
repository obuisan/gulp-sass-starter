# gulp-sass-starter

[Gulp](http://gulpjs.com) + [Sass](https://sass-lang.com/) workflow starter.

## Installation

Install the dependencies (
[dotenv](https://github.com/motdotla/dotenv),
[gulp](https://github.com/gulpjs/gulp),
[gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer),
[gulp-if](https://github.com/robrich/gulp-if),
[gulp-rename](https://github.com/hparra/gulp-rename),
[gulp-sass](https://github.com/dlmanning/gulp-sass),
[gulp-sass-glob](https://github.com/mikevercoelen/gulp-sass-glob),
[gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps),
[gulp-stylelint](https://github.com/olegskl/gulp-stylelint),
[stylelint](https://github.com/stylelint/stylelint) and
[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
).

```
$ npm install
```

### Optional

Copy the ```.env.example``` file to a local ```.env``` and ensure all the settings are correct for your local environment.

## Usage

```
$ gulp
```

This will watch your sass files and compile them when detect changes.

```
$ gulp watch
```
