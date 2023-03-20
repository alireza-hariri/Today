
import create from 'zustand'

const useModalState = create((set) => ({
    showDayModal: true,
    setShowDayModal: (x) => set((state) => ({ showDayModal: x })),

}))

const withModalState = (Component) => {
    return (props) => {
      const modalState = useModalState();
  
      return <Component modalState={modalState} {...props} />;
    };
  };

export {useModalState,withModalState}

