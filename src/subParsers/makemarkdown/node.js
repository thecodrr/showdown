

showdown.subParser('makeMarkdown.node', function (node, options, globals, spansOnly) {
  'use strict';

  spansOnly = spansOnly || false;

  var txt = '';

  // edge case of text without wrapper paragraph
  if (node.nodeType === 3) {
    return showdown.subParser('makeMarkdown.txt')(node, options, globals);
  }

  // HTML comment
  if (node.nodeType === 8) {
    return '<!--' + node.data + '-->\n\n';
  }

  // process only node elements
  if (node.nodeType !== 1) {
    return '';
  }

  var tagName = node.tagName.toLowerCase();

  switch (tagName) {

    //
    // BLOCKS
    //
    case 'h1':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, options, globals, 1) + '\n\n'; }
      break;
    case 'h2':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, options, globals, 2) + '\n\n'; }
      break;
    case 'h3':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, options, globals, 3) + '\n\n'; }
      break;
    case 'h4':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, options, globals, 4) + '\n\n'; }
      break;
    case 'h5':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, options, globals, 5) + '\n\n'; }
      break;
    case 'h6':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, options, globals, 6) + '\n\n'; }
      break;

    case 'p':
      if (!spansOnly) {
        const isSingleSpaced = node.getAttribute('data-spacing') === 'single';
        const isNextNodeSingleSpaced = node.nextSibling && node.nextSibling.getAttribute && node.nextSibling.getAttribute('data-spacing') === 'single';
        const isInsideListItem = !!node.closest('li');
        const isFirst = node.parentElement && node.parentElement.firstChild === node;
        txt = showdown.subParser('makeMarkdown.paragraph')(node, options, globals);
        if (isInsideListItem && isSingleSpaced && isFirst) {
          txt += '\n';
        } else if (isSingleSpaced && !isNextNodeSingleSpaced) {
          txt += '\n\n';
        } else if (isNextNodeSingleSpaced) {
          txt += '  \n';
        } else {
          txt += '\n\n';
        }
      }
      break;

    case 'blockquote':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.blockquote')(node, options, globals) + '\n\n'; }
      break;

    case 'hr':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.hr')(node, options, globals) + '\n\n'; }
      break;

    case 'ol':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, options, globals, 'ol') + '\n\n'; }
      break;

    case 'ul':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, options, globals, 'ul') + '\n\n'; }
      break;

    case 'precode':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.codeBlock')(node, options, globals) + '\n\n'; }
      break;

    case 'pre':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.pre')(node, options, globals) + '\n\n'; }
      break;

    case 'table':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.table')(node, options, globals) + '\n\n'; }
      break;

    //
    // SPANS
    //
    case 'code':
      txt = showdown.subParser('makeMarkdown.codeSpan')(node, options, globals);
      break;

    case 'em':
    case 'i':
      txt = showdown.subParser('makeMarkdown.emphasis')(node, options, globals);
      break;

    case 'strong':
    case 'b':
      txt = showdown.subParser('makeMarkdown.strong')(node, options, globals);
      break;

    case 'del':
      txt = showdown.subParser('makeMarkdown.strikethrough')(node, options, globals);
      break;

    case 'a':
      txt = showdown.subParser('makeMarkdown.links')(node, options, globals);
      break;

    case 'img':
      txt = showdown.subParser('makeMarkdown.image')(node, options, globals);
      if (node.nextSibling || node.prevSibling) {
        txt += '\n\n';
      }
      break;

    case 'br':
      txt = showdown.subParser('makeMarkdown.break')(node, options, globals);
      break;

    case 'input':
      txt = showdown.subParser('makeMarkdown.input')(node, options, globals);
      break;

    case 'span':
      txt = showdown.subParser('makeMarkdown.span')(node, options, globals);
      break;

    case 'u':
      txt = showdown.subParser('makeMarkdown.underline')(node, options, globals);
      break;

    default:
      txt = node.outerHTML + '\n\n';
  }

  // common normalization
  // TODO eventually

  return txt;
});
