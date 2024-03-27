import * as React from "react";

import { Card } from "./components/card";
import { Dock } from "./components/dock";
import { DockCard } from "./components/dock-card";
import { DockDivider } from "./components/dock-divider";

import styles from "./styles.module.scss";

const GRADIENTS = ["🏠", "🦍", "📸", "📕", "👨🏻‍💻", null, "🛠️"];

export default function App() {
  return (
    <div className={styles.body}>
      <Dock>
        {GRADIENTS.map((src, index) =>
          src ? (
            <DockCard key={src}>
              <Card src={src} />
            </DockCard>
          ) : (
            <DockDivider key={index} />
          )
        )}
      </Dock>
    </div>
  );
}
