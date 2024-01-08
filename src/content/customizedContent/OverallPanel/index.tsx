import { FC, useCallback, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

import { Button } from '../../../components/Button';
import { panelContainerStyle, actionContainerStyle, panelHeaderContainerStyle, buttonContainerStyle } from './styles';
import { TableRow } from './TableRow';

interface Position {
  x: number;
  y: number;
}

export const FIGHT_OVERALLPANEL_STORAGE_KEY = 'draggablePanelPosition';
export const FIGHT_OVERALLPANEL_DEFAULT_POSITION: Position = { x: 0, y: 250 };

export const OverallPanel: FC = () => {
  const [pressed, setPressed] = useState<boolean>(false);
  const storedPosition = localStorage.getItem(FIGHT_OVERALLPANEL_STORAGE_KEY);

  const onMouseMoveStop = useCallback((event: DraggableData) => {
    const newPosition = {
      x: event.lastX,
      y: event.lastY,
    };

    localStorage.setItem(FIGHT_OVERALLPANEL_STORAGE_KEY, JSON.stringify(newPosition));

    setPressed(false);
  }, []);

  return (
    <Draggable
      handle='strong'
      bounds='html'
      defaultPosition={storedPosition ? JSON.parse(storedPosition) : FIGHT_OVERALLPANEL_DEFAULT_POSITION}
      onStop={(_event, data) => onMouseMoveStop(data)}
      onDrag={() => setPressed(true)}
    >
      <div style={panelContainerStyle}>
        <strong>
          <div style={{ ...panelHeaderContainerStyle, cursor: pressed ? 'grabbing' : 'grab' }} />
        </strong>
        <div style={{ flex: 1, gap: 2, display: 'flex', flexDirection: 'column' }}>
          <TableRow selectable={false} />
          {/* <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: 5,
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>Food</div>
          <div style={{ flex: 1, textAlign: "center" }}>2323</div>
          <div style={{ flex: 1, textAlign: "center" }}>4424</div>
          <div style={{ flex: 1, textAlign: "center" }}>223</div>
          <div style={{ flex: 1, textAlign: "center" }}>2323</div>
          <div style={{ flex: 1, textAlign: "center" }}>1212</div>
        </div>
        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: 5,
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>Gift</div>
          <div style={{ flex: 1, textAlign: "center" }}>23</div>
          <div style={{ flex: 1, textAlign: "center" }}>11424</div>
          <div style={{ flex: 1, textAlign: "center" }}>999223</div>
          <div style={{ flex: 1, textAlign: "center" }}>23</div>
          <div style={{ flex: 1, textAlign: "center" }}>1988</div>
        </div> */}
        </div>

        <div style={actionContainerStyle}>
          <div style={buttonContainerStyle}>
            <Button colorScheme='default' size='small'>
              Attack 10x1
            </Button>
          </div>
          <div style={buttonContainerStyle}>
            <Button colorScheme='default' size='small'>
              Double attack
            </Button>
          </div>
          <div style={buttonContainerStyle}>
            <Button colorScheme='default' size='small'>
              Attack and Eat
            </Button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
