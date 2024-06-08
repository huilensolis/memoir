import dynamic from "next/dynamic";

// eslint-diable-next-line
export const ServerStatus = dynamic(() => import("./server-status.component"), {
  ssr: false,
});
