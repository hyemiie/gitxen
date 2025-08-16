"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function MyEditor(props = {}) {
  const {
    isLight = true,
    selectedLanguage = "javascript",
    code = "",
    setCode = () => {},
  } = props;

  useEffect(() => {
    import("monaco-editor").then((monaco) => {
      monaco.editor.defineTheme("green-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "", foreground: "FFFFFF", background: "313d37" },
          { token: "keyword", foreground: "22c55e", fontStyle: "bold" },
          { token: "string", foreground: "a7f3d0" },
          { token: "number", foreground: "bbf7d0" },
          { token: "comment", foreground: "9ca3af", fontStyle: "italic" },
          { token: "function", foreground: "4ade80" },
        ],
        colors: {
          "editor.background": "#313d37",
          "editor.foreground": "#ffffff",
          "editorCursor.foreground": "#22c55e",
          "editor.selectionBackground": "#22c55e33",
          "editor.lineHighlightBackground": "#22c55e1a",
          "editorLineNumber.foreground": "#9ca3af",
          "editorLineNumber.activeForeground": "#22c55e",
        },
      });

      monaco.editor.defineTheme("green-light", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "", foreground: "111111", background: "aeb8b3" },
          { token: "keyword", foreground: "22c55e", fontStyle: "bold" },
          { token: "string", foreground: "166534" },
          { token: "number", foreground: "065f46" },
          { token: "comment", foreground: "4b5563", fontStyle: "italic" },
          { token: "function", foreground: "15803d" },
        ],
        colors: {
          "editor.background": "#aeb8b3",
          "editor.foreground": "#111111",
          "editorCursor.foreground": "#22c55e",
          "editor.selectionBackground": "#22c55e33",
          "editor.lineHighlightBackground": "#22c55e1a",
          "editorLineNumber.foreground": "#6b7280",
          "editorLineNumber.activeForeground": "#22c55e",
        },
      });
    });
  }, []);

  return (
    <Editor
      height="400px"
      language={selectedLanguage}
      value={code}
      theme={isLight ? "green-light" : "green-dark"}
      onChange={(value) => setCode(value)}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
}
