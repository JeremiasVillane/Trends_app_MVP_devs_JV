import data from "@emoji-mart/data";
import i18n from "@emoji-mart/data/i18n/es.json";
import Picker from "@emoji-mart/react";
import styles from "./EmojiSelector.module.css";

export const EmojiSelector = ({ onSelect }) => {
  return (
    <div className={styles.emoji_picker}>
          <Picker
            i18n={i18n}
            data={data}
            emojiSize={20}
            emojiButtonSize={28}
            maxFrequentRows={1}
            onEmojiSelect={onSelect}
          />
        </div>
  );
};
