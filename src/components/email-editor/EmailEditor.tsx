import { Underline, Eraser, Bold, Italic } from "lucide-react";
import styles from "./EmailEditor.module.scss";
// Винесено в хук useEditor
// import { useRef, useState } from "react";
// import { TStyle, applyStyle } from "./apply-style";
import parse from "html-react-parser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email.service";
import { useEditor } from "./useEditor";

export function EmailEditor() {
  const { applyFormat, text, updateSelection, setText, textRef } = useEditor();
  // Винесено в хук useEditor
  // const [text, setText] = useState(`Enter email...`);

  // const [selectionStart, setSelectionStart] = useState(0);
  // const [selectionEnd, setSelectionEnd] = useState(0);

  // const textRef = useRef<HTMLTextAreaElement | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create email"],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess() {
      setText("");
      queryClient.refetchQueries(["email list"]);
    },
  });
  // Винесено в хук useEditor
  // const updateSelection = () => {
  //   if (!textRef.current) return;
  //   setSelectionStart(textRef.current.selectionStart);
  //   setSelectionEnd(textRef.current.selectionEnd);
  // };

  // const applyFormat = (type: TStyle) => {
  //   const selectedText = text.substring(selectionStart, selectionEnd);
  //   if (!selectedText) return;
  //   const before = text.substring(0, selectionStart);
  //   const after = text.substring(selectionEnd);
  //   setText(before + applyStyle(type, selectedText) + after);
  // };

  return (
    <div>
      <h1>Email Editor</h1>
      {text && <div className={styles.preview}>{parse(text)}</div>}
      <div className={styles.card}>
        <textarea
          ref={textRef}
          onSelect={updateSelection}
          className={styles.editor}
          spellCheck="false"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className={styles.actions}>
          <div className={styles.tools}>
            <button onClick={() => setText("")}>
              <Eraser size={17} />
            </button>
            <button>
              <Bold size={17} onClick={() => applyFormat("bold")} />
            </button>
            <button>
              <Italic size={17} onClick={() => applyFormat("italic")} />
            </button>
            <button>
              <Underline size={17} onClick={() => applyFormat("underline")} />
            </button>
          </div>
          <button disabled={isPending} onClick={() => mutate()}>
            Send now
          </button>
        </div>
      </div>
    </div>
  );
}
