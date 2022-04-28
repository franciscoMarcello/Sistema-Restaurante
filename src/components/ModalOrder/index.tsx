import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { OrderItemProps } from "../../pages/dashboard";
interface ModalOrderProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItemProps[];
  handleFinishModal: (id: string) => void;
}

export function ModalOrder({
  isOpen,
  onClose,
  order,
  handleFinishModal,
}: ModalOrderProps) {
  let total = parseInt(order[0].product.price) * order[0].amount;
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button
        type="button"
        onClick={onClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#f34748" />
      </button>
      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>
        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.amount} - <strong>{item.product.name}</strong> - Preço
              <strong> R${item.product.price}</strong>
            </span>
            <span className={styles.description}>
              {item.product.description}
            </span>
          </section>
        ))}
        <span>Total = {total}</span>
        <button
          onClick={() => handleFinishModal(order[0].order_id)}
          className={styles.buttonOrder}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
