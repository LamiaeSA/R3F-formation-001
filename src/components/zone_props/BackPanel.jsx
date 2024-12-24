import React from 'react'
import {Edges} from "@react-three/drei";
import Panel from "../Panel.jsx";
import {Utils} from "../../helper/Utils.jsx";
import {backId} from "../../helper/Constants.jsx";

export default function BackPanel ({TREEID}) {
    const utils = Utils()
    const {isStartTrimShort,isEndTrimShort,isTopTrimShort,isBotTrimShort} = utils.isTrimShort(backId(TREEID))
    const {topShelfThk,bottomShelfThk,backThk,leftSideThk, rightSideThk} = utils.getMatThk(TREEID)
    const zoneGeometry = utils.zoneGeometryMap.get(TREEID)
    const zoneDimension = zoneGeometry.dimensions
    const [zoneWidth, zoneHeight, zoneDepth] = zoneDimension

    const panelLength = zoneHeight - (isTopTrimShort ? topShelfThk : 0) - (isBotTrimShort ? bottomShelfThk : 0)
    const panelWidth =  zoneWidth - (isStartTrimShort ? rightSideThk : 0) - (isEndTrimShort ? leftSideThk : 0)


    const x =(isStartTrimShort ? - rightSideThk/2 : 0 ) + (isEndTrimShort ? + leftSideThk / 2 : 0)
    const y = (isTopTrimShort ? - topShelfThk/2 : 0) + (isBotTrimShort ? + bottomShelfThk / 2 : 0)
    const z = - zoneDepth/2 + backThk/2

    const color="#f12626"
    const edgesColor="#ee1414"

    return (
        <Panel position={[x,y,z]} dimension={[panelWidth, panelLength, backThk]} color={color} edgesColor={edgesColor} />
    )
}
