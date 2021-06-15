import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addActor, removeActor, setSnapToGrid } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";
import { setTheme } from "~/actions/app";
import { Button } from "../util/Button";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  addActor?: () => void,
  removeActor?: (id: string) => void,
  setSnapToGrid?: (snapToGrid: boolean) => void,
  setTheme?: (theme: string) => void,
  actors?: Actor[],
  snapToGrid?: boolean,
  theme?: string,
};

export const ControlPanel = ({
  addActor,
  removeActor,
  setSnapToGrid,
  setTheme,
  actors,
  snapToGrid,
  theme,
}: ControlPanelProps) =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <section>
      <Button onClick={addActor}>Add Actor</Button>
    </section>
    <section>
      <ul>
        {
          actors &&
          actors
          .sort(
            (a, b) => Math.sign(b.initiative - a.initiative)
          )
          .map(
            ({ id, name }) =>
            (
              <li
                key={id}
                onClick={() => removeActor(id)}
              >
                {name}
              </li>
            )
          )
        }
      </ul>
    </section>
    <section>
      <input
        type="checkbox"
        aria-labelledby="snap-to-grid-label"

        checked={snapToGrid}

        onChange={
          ({ target }) => setSnapToGrid(target.checked)
        }
      />
      <label id="snap-to-grid-label">Snap to Grid</label>
    </section>
    <section>
      <input
        type="radio"
        name="set-theme"
        id="set-theme-day"
        value="day"
        aria-labelledby="set-theme-day-label"

        checked={theme === "day"}
        onChange={({ target }) => target.checked && setTheme("day")}
      />
      <label id="set-theme-day-label">Day</label>

      <input
        type="radio"
        name="set-theme"
        id="set-theme-dark"
        value="dark"
        aria-labelledby="set-theme-dark-label"

        checked={theme === "dark"}
        onChange={({ target }) => target.checked && setTheme("dark")}
      />
      <label id="set-theme-dark-label">Dark</label>
    </section>
  </div>
);

const stateToProps = ({
  actors,
  snapToGrid,
  theme,
}: {
  actors: Actor[],
  snapToGrid: boolean,
  theme: string,
}) =>
({
  actors,
  snapToGrid,
  theme,
});

const dispatchToProps = (dispatch: Dispatch) =>
({
  addActor: () => dispatch(addActor(
    {
      id: uuid(),
      name: "",
      initiative: 0,
      x: 0,
      y: 0,
    } as Actor
  )),
  removeActor: (id: string) => dispatch(removeActor(id)),
  setSnapToGrid: (snapToGrid: boolean) => dispatch(setSnapToGrid(snapToGrid)),
  setTheme: (theme: string) => dispatch(setTheme(theme)),
});

export default connect(stateToProps, dispatchToProps)(ControlPanel);
