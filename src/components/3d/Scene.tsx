"use client";

import type { ReactNode } from "react";
import { GridFloor } from "./GridFloor";
import { Lighting } from "./Lighting";
import { CameraController } from "./CameraController";
import { WallManager } from "@/components/editor/WallManager";

interface Props {
  children?: ReactNode;
}

export function Scene({ children }: Props) {
  return (
    <>
      <Lighting />
      <CameraController />
      <GridFloor />
      <WallManager />
      {children}
    </>
  );
}
