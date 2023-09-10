import { useState, useCallback } from "react";

const useForceUpdate = () => {
  const [, setState] = useState(0);
  return useCallback(() => setState((state) => state + 1), []);
};

export default useForceUpdate;
