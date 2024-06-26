showdown.subParser('makeMarkdown.listItem', function (node, options, globals) {
  'use strict';

  var listItemTxt = '';

  var children = node.childNodes,
      childrenLength = children.length;

  if (node.classList.contains('checklist--item') ||
      node.classList.contains('simple-checklist--item')) {
    listItemTxt += node.classList.contains('checked') ? '[x] ' : '[ ] ';
  }

  for (var i = 0; i < childrenLength; ++i) {
    listItemTxt += showdown.subParser('makeMarkdown.node')(children[i], options, globals);
  }
  // if it's only one liner, we need to add a newline at the end
  if (!/\n$/.test(listItemTxt)) {
    listItemTxt += '\n';
  } else {
    // it's multiparagraph, so we need to indent
    listItemTxt = listItemTxt
      .split('\n')
      .join('\n    ')
      .replace(/^ {4}$/gm, '')
      .replace(/\n\n+/g, '\n\n');
  }

  return listItemTxt;
});
