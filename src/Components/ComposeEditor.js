import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function ComposeEditor({ onChange }) {
  return (
    <div>
      <Editor
        placehoder="Type your message..."
        onEditorStateChange={(state) =>
          onChange(draftToHtml(convertToRaw(state.getCurrentContent())))
        }
      />
    </div>
  );
}
