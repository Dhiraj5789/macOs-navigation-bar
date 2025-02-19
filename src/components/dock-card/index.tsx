import * as React from "react";
import {
  animated,
  useIsomorphicLayoutEffect,
  useSpringValue,
} from "@react-spring/web";

import { useMousePosition } from "../../hooks/useMousePosition";
import { useWindowResize } from "../../hooks/useWindowResize";

import { useDock } from "../dock/dock-context";

import styles from "./styles.module.scss";

interface DockCardProps {
  children: React.ReactNode;
}

const INITIAL_WIDTH = 48;

export const DockCard = ({ children }: DockCardProps) => {
  const cardRef = React.useRef<HTMLButtonElement>(null!);
  /**
   * This doesn't need to be real time, think of it as a static
   * value of where the card should go to at the end.
   */
  const [elCenterX, setElCenterX] = React.useState<number>(0);

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320,
    },
  });

  const opacity = useSpringValue(0);
  const y = useSpringValue(0, {
    config: {
      friction: 29,
      tension: 238,
    },
  });

  const dock = useDock();

  /**
   * This is just an abstraction around a `useSpring` hook, if you wanted you could do this
   * in the hook above, but these abstractions are useful to demonstrate!
   */
  useMousePosition(
    {
      onChange: ({ value }) => {
        const mouseX = value.x;

        if (dock.width > 0) {
          const transformedValue =
            INITIAL_WIDTH +
            36 *
              Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) **
                12;

          if (dock.hovered) {
            size.start(transformedValue);
          }
        }
      },
    },
    [elCenterX, dock]
  );

  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) {
      size.start(INITIAL_WIDTH);
    }
  }, [dock.hovered]);

  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect();

    setElCenterX(x + INITIAL_WIDTH / 2);
  });

  const timeoutRef = React.useRef<any>();

  const handleClick = () => {
    window.location.replace("www.google.com");
  };

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className={styles["dock-card-container"]}>
      <animated.button
        ref={cardRef}
        className={styles["dock-card"]}
        onClick={handleClick}
        style={{
          width: size,
          height: size,
          y,
        }}
      >
        {children}
      </animated.button>
      <animated.div className={styles["dock-dot"]} style={{ opacity }} />
    </div>
  );
};
