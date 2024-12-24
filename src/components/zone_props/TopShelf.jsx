import React from 'react'
import {Edges} from "@react-three/drei";
import Panel from "../Panel.jsx";
import {Utils} from "../../helper/Utils.jsx";
import {backId, rightSideId, leftSideId} from "../../helper/Constants.jsx";

export default function TopShelf ({TREEID}) {
    const utils = Utils()
    const {isStartTrimShort:isLeftStarTrimShort,isEndTrimShort :isLeftEndTrimShort,isTopTrimShort :isLeftTopTrimShort,isBotTrimShort : isLeftBotTrimShort} = utils.isTrimShort(leftSideId(TREEID))
    const {isStartTrimShort:isRightStarTrimShort,isEndTrimShort :isRightEndTrimShort,isTopTrimShort :isRightTopTrimShort,isBotTrimShort : isRightBotTrimShort} = utils.isTrimShort(rightSideId(TREEID))
    const {isStartTrimShort :isBackStarTrimShort,isEndTrimShort :isBackEndTrimShort,isTopTrimShort :isBackTopTrimShort,isBotTrimShort : isBackBotTrimShort} = utils.isTrimShort(backId(TREEID))

    const {topShelfThk,bottomShelfThk,backThk,rightSideThk, leftSideThk} = utils.getMatThk(TREEID)
    const zoneGeometry = utils.zoneGeometryMap.get(TREEID)
    const zoneDimension = zoneGeometry.dimensions
    const [zoneWidth, zoneHeight, zoneDepth] = zoneDimension

    const panelLength = zoneWidth - (isRightTopTrimShort ? 0 : rightSideThk) - ( isLeftTopTrimShort ? 0 : leftSideThk)
    const panelWidth = zoneDepth - ( isBackTopTrimShort ? 0 : backThk )


    const x = 0
    const y = zoneHeight / 2 - topShelfThk / 2
    const z = isBackTopTrimShort ? 0 : backThk/2

    const color="#5a61e1"
    const edgesColor="#ee1414"

    return (
        <Panel position={[x,y,z]} dimension={[panelLength, topShelfThk, panelWidth]} color={color} edgesColor={edgesColor} />
    )
}