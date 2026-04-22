import { useEffect, useRef, useState, type ReactNode } from "react";

type HiveGridProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
};

function parsePx(value: string, fallback: number): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function HiveGrid<T>({ items, renderItem, getKey }: HiveGridProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [perRow, setPerRow] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const styles = getComputedStyle(el);
      const cellSize = parsePx(styles.getPropertyValue("--hive-cell"), 110);
      const gap = parsePx(styles.getPropertyValue("--hive-gap"), 16);
      const width = el.clientWidth;
      const offsetReserve = (cellSize + gap) / 2;
      const usable = Math.max(0, width - offsetReserve);
      const n = Math.max(1, Math.floor((usable + gap) / (cellSize + gap)));
      setPerRow(n);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) {
    rows.push(items.slice(i, i + perRow));
  }

  return (
    <div className="hive-grid" ref={ref}>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`hive-row${i % 2 === 1 ? " hive-row-offset" : ""}`}
        >
          {row.map((item) => (
            <div key={getKey(item)} className="hive-cell">
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HiveGrid;
