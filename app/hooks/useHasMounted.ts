// lib/hooks/useHasMounted.ts
import { useSyncExternalStore } from "react";

const subscribe = () => () => {}; // no-op, value never changes after mount
const getSnapshot = () => true; // client: always true
const getServerSnapshot = () => false; // server: always false

export function useHasMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
