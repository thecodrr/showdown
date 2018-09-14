showdown.subParser('makehtml.underline', function (text, options, globals) {
  'use strict';

  if (!options.underline) {
    return text;
  }

  text = globals.converter._dispatch('makehtml.underline.before', text, options, globals).getText();

  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b_?__(\S[\s\S]*)___?\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
  } else {
    text = text.replace(/_?__(\S[\s\S]*?)___?/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
  }

  // escape remaining underscores to prevent them being parsed by italic and bold
  text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('makehtml.underline.after', text, options, globals).getText();

  return text;
});