export const actionHover = (hoveredId, cursor, mouse_latLng) => {

    return {
        type: "HOVER_FEATURE",
        payload: { currentMouse: mouse_latLng,
            hoveredStateId: hoveredId,
                    cursorStyle: cursor,
                    }
    }
}

export default actionHover; 