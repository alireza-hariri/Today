
import create from 'zustand'

const useModalState = create((set) => ({
    showDayModal: false ,
    showAddModal: false,
    menuOpen: false ,
    setShowDayModal: (x) => set((state) => ({...state, showDayModal: x })),
    setShowAddModal: (x) => set((state) => ({...state, showAddModal: x })),
    setMenuOpen: (x) => set((state) => ({...state, menuOpen: x })),

}))

const withModalState = (Component) => {
    return (props) => {
      const modalState = useModalState();
  
      return <Component modalState={modalState} {...props} />;
    };
  };

export {useModalState,withModalState}

