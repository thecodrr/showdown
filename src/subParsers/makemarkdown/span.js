showdown.subParser('makeMarkdown.span', function (node, options, globals) {
  'use strict';

  var children = node.childNodes,
      childrenLength = children.length,
      text = '';
  for (var i = 0; i < childrenLength; ++i) {
    text += showdown.subParser('makeMarkdown.node')(children[i], options, globals);
  }
  return text;
});
