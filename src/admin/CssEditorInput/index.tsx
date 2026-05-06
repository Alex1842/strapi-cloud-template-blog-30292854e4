import React from "react";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

loader.config({ monaco });

interface Props {
  name: string;
  value?: string;
  onChange: (event: {
    target: {
      name: string;
      value: string;
      type?: string;
    };
  }) => void;
}

const CssEditorInput = ({ name, value, onChange }: Props) => {
  return (
    <div
      style={{
        height: "400px",
        border: "1px solid #dcdce4",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <Editor
        height="100%"
        language="css"
        defaultLanguage="css"
        value={value || ""}
        theme="vs-dark"
        loading="Loading CSS editor..."
        onChange={(val) => {
          onChange({
            target: {
              name,
              value: val || "",
              type: "text",
            },
          });
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          quickSuggestions: true,
        }}
      />
    </div>
  );
};

export default CssEditorInput;