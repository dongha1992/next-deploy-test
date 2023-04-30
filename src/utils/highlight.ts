// import hljs from 'highlight.js/lib/core';
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('js', javascript);
import markdown from "highlight.js/lib/languages/markdown";
hljs.registerLanguage("markdown", markdown);

export default function highlight(code: any, language: any) {
  const languageObject = language && { language };
  try {
    if (language === "markdown") {
      let highlighted = hljs.highlight(code, languageObject).value;

      const blocks: any = [];

      const replacer = (
        match: any,
        p1: any,
        p2: any,
        p3: any,
        offset: any,
        string: any
      ) => {
        blocks.push(
          "```" + p2 + "" + hljs.highlight(p3, { language: p2 }).value + "```"
        );
      };

      const regex = /(```(.+?)(?=[\n\r\s])([.\n\r\s\S]*?)(?=`)```)/g;
      code.replace(regex, replacer);
      highlighted = highlighted.replace(regex, () => blocks.shift());
      return highlighted;
    }
  } catch (error) {
    console.error(error);
  }

  return hljs.highlight(code, languageObject).value;
}
