# SadatFront

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
```js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
```
```sh
#!/usr/bin/env bash
# Color codes
BLACK='\033[0;30m' RED='\033[0;31m' GREEN='\033[0;32m' BROWN='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' LIGHTGRAY='\033[0;37m' DARKGRAY='\033[1;30m' LIGHTRED='\033[1;31m' LIGHTGREEN='\033[1;32m' YELLOW='\033[1;33m' LIGHTBLUE='\033[1;34m' LIGHTPURPLE='\033[1;35m' LIGHTCYAN='\033[1;36m' WHITE='\033[1;37m' NC='\033[0m'

# touch ./logs/log.tmp
echo -e "${BROWN}Trying to remove log file from path => log/${NC}"
if [ -f ./logs/log.tmp ]; then
    echo -e "${BLUE}Log file found.Removing logs/log.tmp ${NC}"
    rm ./logs/log.tmp
else
    echo -e "${RED}No log files in found in logs/ Resuming ...${NC}"
fi

echo -e "${BROWN}Removing all files from path => input/${NC}"
if [ -z "$(ls -A input/)" ]; then
    echo -e "${PURPLE}No files in input/ Resuming ...${NC}"
else
    rm -rf ./input/*
    echo -e "${CYAN}Removed all files from input/${NC}"
fi

echo -e "${BROWN}Removing all files from path => output/${NC}"
if [ -z "$(ls -A output/)" ]; then
    echo -e "${PURPLE}No files in  output/ Resuming ...${NC}"
else
    rm -rf ./output/*
    echo -e "${CYAN}Removed all files from output/${NC}"
fi

echo -e "${GREEN}[ DONE WITH CLEANING ]${NC}"

# Running make-inputs
echo -e "${GREEN}Building input files${NC}"

node make-inputs.js
```

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
