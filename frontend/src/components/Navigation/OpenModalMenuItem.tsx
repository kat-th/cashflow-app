import { spawn } from "child_process";
import { useModal } from "../../context/Modal";
import "./Navigation.css";

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  icon,
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}: any) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li onClick={onClick} className="modal-menu-item">
      {icon && <span className="icon">{icon}</span>}
      <span className="item-text">{itemText}</span>
    </li>
  );
}

export default OpenModalMenuItem;
