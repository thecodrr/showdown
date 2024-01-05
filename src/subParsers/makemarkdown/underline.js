showdown.subParser('makeMarkdown.underline', function (node, options) {
  'use strict';
  if (!options.underline) {
    return node.innerHTML;
  }

  return '<u>' + node.innerHTML + '</u>';
});
