import React from 'react'
import {Utils} from "../../helper/Utils.jsx";
import Panel from "../Panel.jsx";
import {DIR_DEPTH, DIR_HEIGHT, DIR_WIDTH, getParentId} from "../../helper/Constants.jsx";

export default function Divider({TREEID}) {
    const utils = Utils()
    const parentId =getParentId(TREEID)
    const zoneGeometry = utils.zoneGeometryMap.get(TREEID)
    const [zoneWidth, zoneHeight, zoneDepth] = zoneGeometry.dimensions
    const anglZone = utils.anglZoneMap.get(parentId)
    const {DIVDIR,DIVELEM1} = anglZone
    const dividerThk = utils.getMatThk(TREEID).dividerThk
    const linDivSetting = utils.linDivSetting(DIVDIR,DIVELEM1)

    const dividerDimX = linDivSetting.direction===DIR_WIDTH ? dividerThk : zoneWidth
    const dividerDimY = linDivSetting.direction===DIR_HEIGHT ? dividerThk : zoneHeight
    const dividerDimZ = linDivSetting.direction===DIR_DEPTH ?dividerThk : zoneDepth

    const dividerPosX = linDivSetting.direction===DIR_WIDTH ?   - zoneWidth/2 - dividerThk/2 : 0
    const dividerPosY =  linDivSetting.direction===DIR_HEIGHT ?  - zoneHeight/2 -  dividerThk/2 : 0
    const dividerPosZ = linDivSetting.direction===DIR_DEPTH ?  - zoneDepth/2 -  dividerThk/2 : 0

    return (
        <>
            {
                !TREEID.endsWith('0') &&
                <Panel position={[dividerPosX,dividerPosY,dividerPosZ]} dimension={[dividerDimX, dividerDimY, dividerDimZ]} color="#ee1414" edgesColor="#ee1414"/>
            }
        </>

    )
}
