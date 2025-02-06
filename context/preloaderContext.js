import { createContext, useState } from "react";

const PreloaderCtx = createContext();

export function PreloaderCtxProvider(props) {
  const [end, setEnd] = useState(false);
 
  function SetOpenFc() {
    setEnd(true);
  }

  const context = {
    end: end,
    SetOpenFc: SetOpenFc,
  };

  return (
    <PreloaderCtx.Provider value={context}>
      {props.children}
    </PreloaderCtx.Provider>
  );
}

export default PreloaderCtx;