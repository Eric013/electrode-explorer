#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "No module name specified. Exiting."
  exit 1
fi

if [ ! -d client/demo-modules/$1 ]; then
  mkdir -p client/demo-modules/$1
fi

function update_src() {
  if [ -f $1 ]; then
    sed "s/$2/$3/g" $1 > $1.new
    rm $1
    mv $1.new $1
  fi
}

function build_and_copy() {
  rm node_modules/**/*/.babelrc
  rm -rf client/demo-modules/$1
  mkdir -p client/demo-modules/$1/demo
  mkdir -p client/demo-modules/$1/src/styles
  babel node_modules/$1/demo/*.js* -d ./
  find node_modules/$1 -type f -name "*.jsx" -delete
  update_src node_modules/$1/demo/demo.js "..\/src\/index" "..\/lib\/index"
  update_src node_modules/$1/demo/demo.js "index.jsx" "index"
  update_src node_modules/$1/demo/index.js "..\/src\/index" "..\/lib\/index"
  update_src node_modules/$1/demo/index.js "index.jsx" "index"

  webpack --config ./component-webpack.config.js --colors --entry node_modules/$1/lib/index.js --output-path client/demo-modules/$1 --externals
  cp -r node_modules/$1/demo client/demo-modules/$1
  cp -r node_modules/$1/src/styles/* client/demo-modules/$1/src/styles
  find client/demo-modules/$1 -type f -name "*.flow" -delete

  update_src client/demo-modules/$1/demo/demo.js "..\/lib\/index" "..\/bundle.min"
  update_src client/demo-modules/$1/demo/index.js "..\/lib\/index" "..\/bundle.min"
}

str='@require "~@walmart/lithe-extras/lib/tenants/walmart/base"'
function import_stylus() {
  files=$(find client/demo-modules/$1 -name "*.styl")
  for file in $files
  do
    grep "$str" $file
    if [ $? -ne 0 ]; then
      mv $file $file.tmp
      echo "$str;" | cat - $file.tmp > $file
      rm $file.tmp
    fi
  done
}

build_and_copy $1
#import_stylus $1
