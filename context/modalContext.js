import { createContext, useState } from "react";

const OpenContext = createContext();

export function OpenContextProvider(props) {
  const [open, setOpen] = useState(false);
  const [filled, setFilled] = useState(false);
 
  function toggleOpen() {
    setOpen(!open);
  }

  function hideForm() {
    setFilled(true);
  }

  const context = {
    open: open,
    filled: filled,
    toggleOpen: toggleOpen,
    hideForm: hideForm
  };

  return (
    <OpenContext.Provider value={context}>
      {props.children}
    </OpenContext.Provider>
  );
}

export default OpenContext;