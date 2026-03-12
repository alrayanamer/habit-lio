import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "../habit-creation.css"

function EmojiSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    open ?(
      <div>
        <EmojiPicker
        style={{ position: "absolute" }}
          onEmojiClick={(emojiData) => {
            onChange(emojiData.emoji);
            setOpen(false);
          }}
          searchDisabled={false}
          skinTonesDisabled={false}
          lazyLoadEmojis={true}
        />
      </div>
    ):(
      <div>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <button type="button" id="emoji-picker" onClick={() => setOpen(!open)}>
            {value || "📝"}
            </button>
            <br />
            <br />
        </div>
      </div>
    )
  );
}

export default EmojiSelect;