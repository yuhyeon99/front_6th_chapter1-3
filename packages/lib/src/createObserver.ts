type Listener = () => void;

export const createObserver = () => {
  const listeners = new Set<Listener>();

  // useSyncExternalStore 에서 활용할 수 있도록 subscribe 함수를 수정합니다.
  const subscribe = (fn: Listener) => {
    listeners.add(fn);
    return () => unsubscribe(fn); // 클린업 함수 반환
  };

  const unsubscribe = (fn: Listener) => {
    listeners.delete(fn);
  };

  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
