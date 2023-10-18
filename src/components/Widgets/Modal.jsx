import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";
import Image from 'next/image'
import closeIcon from '@/assets/icons/close.svg'
import style from '@/assets/styles/Modal.module.css'

export default function Modal() {
  const { modalActive, setModalActive, modalCloseable, setModalCloseable, modalContent, setModalContent } = useContext(DataContext);

  const closeModal = () => {
    if (modalCloseable) {
      setModalActive(false);
      setModalContent(null);
    }
  };

  if (!modalActive) {
    return null;
  }
  return (
    <>
        <div className={style.darken} onClick={closeModal}></div>
        <div className={style.modal}>
          <div className={style.modalContainer + ' container'}>
            <div className={style.content}>
              {modalCloseable && (
                <div className={style.closeBtn}>
                  <button onClick={closeModal}>
                    <Image
                      src={closeIcon}
                      alt="Close icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              )}
              {modalContent}
            </div>
          </div>
        </div>
    </>
  )
}
