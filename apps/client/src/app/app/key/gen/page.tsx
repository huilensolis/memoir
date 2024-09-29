"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GenKeyPage() {
  const [key, setKey] = useState<null>(() => {
    const key = localStorage.getItem("key");

    if (!key) return null;

    return key;
  });

  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center flex-col">
      {key && <p>{key}</p>}
      <Button>generate key</Button>{" "}
    </div>
  );
}
