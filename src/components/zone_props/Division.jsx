import React from 'react'
import {useArticleData} from "../../helper/ArticleProvider.jsx";
import {getArticleDimensions, Utils} from "../../helper/Utils.jsx";
import CalcSubZoneWidth from "../../helper/CalcSubZoneWidth.jsx";
import {Edges, Text} from "@react-three/drei";
import log from "eslint-plugin-react/lib/util/log.js";
import Zone from "../zone.jsx";
import Panel from "../Panel.jsx";
import Divider from "./Divider.jsx";
import {DIR_DEPTH, DIR_HEIGHT, DIR_WIDTH, SIGN_POSITIVE} from "../../helper/Constants.jsx";
import {processLindiv} from "imos-linear-division";

export default function Division({TREEID}) {
    console.log('============> Division <============')
    const utils = Utils()
    const {anglZoneMap, anglPrimMap, zoneGeometryMap} = useArticleData()
    const currentZone = anglZoneMap.get(TREEID)
    const {LINDIV1,DIVELEM1,DIVDIR}= currentZone
    const dividerThk = currentZone.DIVIDER !=='' ? 2 : 0
    const linDivSetting = utils.linDivSetting(DIVDIR,DIVELEM1)

    if (TREEID === '0') {
        const subZoneDimensions = getArticleDimensions(anglPrimMap)
        const position = [0, 0, 0]
        const zoneGeometry = utils.insetHandler(TREEID,subZoneDimensions,position)
        zoneGeometryMap.set(TREEID, {position: zoneGeometry.positions, dimensions: zoneGeometry.dimensions})
    }
    const subZoneGeometry = zoneGeometryMap.get(TREEID)
    const remainingGeometry = utils.getRemainingDimensions(TREEID, subZoneGeometry.dimensions, subZoneGeometry.position)
    const [remainingWidth,remainingHeight,remainingDepth] = remainingGeometry.dimension
    const [remainingX, remainingY, remainingZ] = remainingGeometry.position
    const zoneLength = linDivSetting.direction===DIR_WIDTH ? remainingWidth : linDivSetting.direction===DIR_DEPTH ? remainingDepth : remainingHeight

    const initResultLinDiv = processLindiv(LINDIV1,zoneLength,dividerThk) //CalcSubZoneWidth(LINDIV1, zoneLength, dividerThk)
    const resultLinDiv = linDivSetting.sign===SIGN_POSITIVE ? initResultLinDiv : initResultLinDiv.reverse()
    return (
        <group>
            {
                TREEID === '0' &&
                <Zone TREEID={TREEID} key={TREEID}/>
            }
            {
            resultLinDiv.map((subZoneLength, index) => {
                const subZoneWidth =  linDivSetting.direction===DIR_WIDTH ? subZoneLength : remainingWidth
                const subZoneHeight = linDivSetting.direction===DIR_HEIGHT ? subZoneLength : remainingHeight
                const subZoneDepth = linDivSetting.direction===DIR_DEPTH ? subZoneLength : remainingDepth

                const thkStep = resultLinDiv.slice(0,index).reduce((acc,_)=>  acc+ dividerThk,0)
                const subZoneRelativePosition = -zoneLength / 2 + subZoneLength / 2 + resultLinDiv.slice(0, index).reduce((acc, current) => acc + current, 0) + thkStep

                const createdId = TREEID + "." + index
                const subZonePositionX = remainingX + (linDivSetting.direction===DIR_WIDTH ?  subZoneRelativePosition : 0 )
                const subZonePositionY = remainingY + (linDivSetting.direction===DIR_HEIGHT ?  subZoneRelativePosition : 0 )
                const subZonePositionZ = remainingZ + (linDivSetting.direction===DIR_DEPTH ?  subZoneRelativePosition : 0 )
                const dimensions = [subZoneWidth, subZoneHeight, subZoneDepth]
                const position = [subZonePositionX, subZonePositionY, subZonePositionZ]
                const subZoneGeometry = utils.insetHandler(createdId,dimensions,position)
                zoneGeometryMap.set(createdId, {position: subZoneGeometry.positions, dimensions: subZoneGeometry.dimensions})

                return (
                        <Zone TREEID={createdId} key={createdId}/>

                )
            })
        }
        </group>
    )
}