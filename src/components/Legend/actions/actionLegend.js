export const actionLegend = (key, bool) => {

    return {
        type: "HOVER_LEGEND",
        payload: {
            hoveredStateId: key,
            hoveredLegend: bool,
                    }
    }
}

export default actionLegend; 