import { useState } from "react";
import styles from "./GroupChatModal.module.css";

const GroupChatModalPage2 = ({ onPrev, setShowGroupChatModal }) => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  const handleAddMember = () => {
    if (newMember) {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className={styles.modal_page}>
      <div className={styles.modal_header}>
        <h2>Añadir integrantes al grupo</h2>
      </div>
      <div className={styles.modal_content}>
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Nombre del integrante"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button className={styles.page_button} onClick={handleAddMember}>Agregar integrante</button>
        <div className={styles.buttons_container}>
        <button className={styles.page_button} onClick={handlePrev}>Anterior</button>
        <button className={styles.cancel_button} onClick={() => setShowGroupChatModal(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModalPage2;
