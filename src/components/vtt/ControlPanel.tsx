import * as React from "react"

import GridSnapCheckbox from "../../containers/GridSnapCheckbox"
import AddActorButton from "../../containers/AddActorButton"


export default () => (
    <div className="control-panel">
        <GridSnapCheckbox
            name="snap-to-grid"
            label="Toggle Snap to Grid"
        />

        <AddActorButton
            label="Add Actor"
        />
    </div>
)