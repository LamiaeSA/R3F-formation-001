import React from 'react'
import {Edges} from "@react-three/drei";
import Panel from "../Panel.jsx";
import {Utils} from "../../helper/Utils.jsx";
import {rightSideId} from "../../helper/Constants.jsx";

export default function RightSide ({TREEID}){
    const utils = Utils()
    const {isStartTrimShort,isEndTrimShort,isTopTrimShort,isBotTrimShort} = utils.isTrimShort(rightSideId(TREEID))
    const {topShelfThk,bottomShelfThk,backThk,rightSideThk} = utils.getMatThk(TREEID)
    const zoneGeometry = utils.zoneGeometryMap.get(TREEID)
    const zoneDimension = zoneGeometry.dimensions
    const [zoneWidth, zoneHeight, zoneDepth] = zoneDimension

    const panelLength = zoneHeight - (isTopTrimShort ? topShelfThk : 0) - (isBotTrimShort ? bottomShelfThk : 0)
    const panelWidth = zoneDepth - (isEndTrimShort ? backThk : 0 )
    const panelThk =rightSideThk

    const x =  zoneWidth / 2 - panelThk / 2
    const y = (isTopTrimShort ? - topShelfThk/2 : 0) + (isBotTrimShort ? + bottomShelfThk / 2 : 0)
    const z = isEndTrimShort ? backThk/2 : 0

    const color="#5be352"
    const edgesColor="#ee1414"

    return (
        <Panel position={[x,y,z]} dimension={[panelThk, panelLength, panelWidth]} color={color} edgesColor={edgesColor} />
    )
}