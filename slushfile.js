var gulp = require('gulp')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var rename = require('gulp-rename')
var template = require('gulp-template')
var inquirer = require('inquirer')
var cookingConfig = require('cooking-config')
var isNextWebpack = require('cooking/util/check').isNextWebpack

var CssChoices = [
  {name: 'Only CSS', value: ''},
  {name: 'Salad', value: 'saladcss'},
  {name: 'Sass', value: 'sass'},
  {name: 'Less', value: 'less'}
]

if (!isNextWebpack) {
  CssChoices.push({name: 'PostCSS', value: 'postcss'})
}

gulp.task('default', function (done) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Give your app a name',
      default: getNameProposal()
    },
    {
      type: 'input',
      name: 'description',
      message: 'Give your app a description',
      default: 'A vue project.'
    },
    {
      type: 'confirm',
      name: 'private',
      message: 'Private?',
      default: true
    },
    {
      type: 'confirm',
      name: 'devServer',
      message: 'Need dev server?',
      default: true
    },
    {
      type: 'list',
      name: 'csstype',
      message: 'What CSS preprocessor do you want to use?',
      default: '',
      choices: CssChoices
    },
    {
      type: 'confirm',
      name: 'unit',
      message: 'Setup unit tests with Karma + Mocha?',
      default: true
    },
    {
      type: 'input',
      name: 'github',
      message: 'git repository',
      default: cookingConfig.github
    },
    {
      type: 'input',
      name: 'author',
      message: 'author',
      default: cookingConfig.author
    },
    {
      type: 'input',
      name: 'license',
      message: 'license',
      default: 'ISC'
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    }
  ],
  function (answers) {
    if (answers.github) {
      answers.github = answers.github.replace(/\/$/, '') + '/' + answers.name
    }

    if (!answers.moveon) {
      return done()
    }

    answers.isNextWebpack = isNextWebpack

    var filesPath = [__dirname + '/template/**']
    if (!answers.unit) {
      filesPath = filesPath.concat([
        '!' + __dirname + '/template/karma.conf.js',
        '!' + __dirname + '/template/test/**'
      ])
    }

    gulp.src(filesPath, { dot: true })
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1)
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function () {
        done()
      })
      .resume()
  })
})

function getNameProposal () {
  var path = require('path')
  try {
    return require(path.join(process.cwd(), 'package.json')).name
  } catch (e) {
    return path.basename(process.cwd())
  }
}
