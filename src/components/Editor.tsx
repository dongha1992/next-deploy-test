import Editor from "@monaco-editor/react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html
const languages = [
  "TypeScript",
  "JavaScript",
  "CSS",
  "LESS",
  "SCSS",
  "JSON",
  "HTML",
  "XML",
  "PHP",
  "C#",
  "C++",
  "Razor",
  "Markdown",
  "Diff",
  "Java",
  "VB",
  "CoffeeScript",
  "Handlebars",
  "Batch",
  "Pug",
  "F#",
  "Lua",
  "Powershell",
  "Python",
  "Ruby",
  "SASS",
  "R",
  "Objective-C",
];

export default function SimpleCodeEditor({
  language = "markdown",
  value,
  onChange,
  className,
}: any) {
  const height = useMemo(() => (value.length > 0 ? "h-96" : "h-20"), [value]);

  return (
    <div className={twMerge(`${height} overflow-hidden rounded-xl`, className)}>
      <Editor
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        // theme="hc-black"
        options={{
          autoDetectHighContrast: false,
          // readOnly: true,
          contextmenu: false,
          // cursorStyle: "line",
          // cursorWidth: 1,
          fontSize: 18,
          showUnused: true,
          // letterSpacing: 1,
          scrollbar: {
            vertical: "hidden",
            verticalHasArrows: false,
            verticalScrollbarSize: 0,
            verticalSliderSize: 0,
          },
          fontWeight: "thin",
          glyphMargin: false,
          guides: {
            highlightActiveIndentation: false,
            indentation: false,
          },
          lightbulb: {
            enabled: false,
          },
          // lineDecorationsWidth: 10,
          // lineHeight: 22,
          lineNumbers: "off",
          lineNumbersMinChars: 3,
          overviewRulerBorder: false,
          padding: {
            top: 10,
            bottom: 10,
          },
          // find: {
          //   seedSearchStringFromSelection: true,
          // },
          // ideCursorInOverviewRuler: true,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
        }}
        wrapperProps={
          {
            // className: "rounded-3xl",
          }
        }
      />
    </div>
  );
}
