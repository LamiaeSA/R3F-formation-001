 import {
    backId, DIR_DEPTH,
    DIR_HEIGHT, DIR_WIDTH,
    doorId,
    leftSideId,
    rightSideId,
    scaleFactor,
    shortTrim, SIGN_NEGATIVE,
    SIGN_POSITIVE
} from "./Constants.jsx";
 import {useArticleData} from "./ArticleProvider.jsx";

export const getArticleDimensions = (anglPrimMap) => {
    const articleWidth = anglPrimMap.get('TEST_OAL_CAB_CONV_001').SIZEX * scaleFactor
    const articleHeight = anglPrimMap.get('TEST_OAL_CAB_CONV_001').SIZEY * scaleFactor
    const articleDepth = anglPrimMap.get('TEST_OAL_CAB_CONV_001').SIZEZ * scaleFactor
    return [articleWidth, articleHeight, articleDepth]
}
export function Utils() {

   const {anglZoneMap, anglPrimMap, anglElemMap, zoneGeometryMap} = useArticleData()

    const isTrimShort = (elemTREEID) => {
       const isStartTrimShort = anglElemMap.get(elemTREEID).STARTTRIM === shortTrim
        const isEndTrimShort = anglElemMap.get(elemTREEID).ENDTRIM === shortTrim
        const isTopTrimShort = anglElemMap.get(elemTREEID).TOPTRIM === shortTrim
        const isBotTrimShort = anglElemMap.get(elemTREEID).BOTTRIM === shortTrim
        return {isStartTrimShort : isStartTrimShort,isEndTrimShort:isEndTrimShort,isTopTrimShort:isTopTrimShort,isBotTrimShort:isBotTrimShort}

    }

    const getMatThk =(TREEID) => {
        const doorThk =anglElemMap.get(doorId(TREEID))?.CPNAME ? 2 : 0
        const rightSideThk = anglElemMap.get(rightSideId(TREEID))?.CPNAME  ? 2 : 0
        const backThk = anglElemMap.get(backId(TREEID))?.CPNAME ? 2 : 0
        const leftSideThk = anglElemMap.get(leftSideId(TREEID))?.CPNAME ? 2 : 0
        const topShelfThk = anglZoneMap.get(TREEID).TOPSHELF ? 2 : 0
        const bottomShelfThk = anglZoneMap.get(TREEID).BOTSHELF ? 2 : 0
        const dividerThk = anglZoneMap.get(TREEID).DIVIDER ? 2 : 0

        return ({
            doorThk:doorThk,
            rightSideThk:rightSideThk,
            backThk:backThk,
            leftSideThk:leftSideThk,
            topShelfThk:topShelfThk,
            bottomShelfThk:bottomShelfThk,
            dividerThk:dividerThk
        })
    }

    const isCpDefined = (TREEID) => {
        const isDoorDefined =!!anglElemMap.get(doorId(TREEID))?.CPNAME
        const isRightSideDefined = !!anglElemMap.get(rightSideId(TREEID))?.CPNAME
        const isBackDefined = !!anglElemMap.get(backId(TREEID))?.CPNAME
        const isLeftSideDefined = !!anglElemMap.get(leftSideId(TREEID))?.CPNAME
        const isTopShelfDefined = !!anglZoneMap.get(TREEID).TOPSHELF
        const isBottomShelfDefined = !!anglZoneMap.get(TREEID).BOTSHELF
        const isDividerDefined = !!anglZoneMap.get(TREEID).DIVIDER
         return (
             {
                 isDoorDefined : isDoorDefined,
                 isRightSideDefined : isRightSideDefined,
                 isBackDefined : isBackDefined,
                 isLeftSideDefined : isLeftSideDefined,
                 isTopShelfDefined : isTopShelfDefined,
                 isBottomShelfDefined : isBottomShelfDefined,
                 isDividerDefined : isDividerDefined

             }
         )
    }

    const getRemainingDimensions =(TREEID, initDimension,initPosition )=> {
        const [initWidth,initHeight,initDepth] = initDimension
        const [initX,initY,initZ] = initPosition
        const {doorThk,rightSideThk,leftSideThk,topShelfThk,bottomShelfThk, backThk}  = getMatThk(TREEID)
        const remainingWidth = initWidth - leftSideThk - rightSideThk
        const remainingHeight = initHeight - topShelfThk - bottomShelfThk
        const remainingDepth = initDepth - backThk

        const remainingX = initX - initWidth/2 + remainingWidth/2 + leftSideThk
        const remainingY = initY - initHeight/2 + remainingHeight/2 + bottomShelfThk
        const remainingZ = initZ + backThk/2
        return (
            {
                dimension:[remainingWidth,remainingHeight,remainingDepth],
                position:[remainingX,remainingY,remainingZ]
            }
        )

    }


    function insetHandler (TREEID,initDimensions,initPositions){
        console.log('TREEIDFYILHYTR',TREEID)
       const  [initWidth,initHeight,initDepth]=initDimensions
        const [initX,initY,initZ] = initPositions
        const insetLeft = scaleFactor * ( anglElemMap.get(leftSideId(TREEID))?.INSET ?? 0)
        const insetRight= scaleFactor * ( anglElemMap.get(rightSideId(TREEID))?.INSET ?? 0)
        const insetBack = scaleFactor * ( anglElemMap.get(backId(TREEID))?.INSET?? 0)
        const width = initWidth - insetLeft - insetRight
        const depth = initDepth - insetBack
        const height = initHeight

        const x = initX + insetLeft/2 - insetRight/2
        const y = initY
        const z = initZ + insetBack/2

        console.log(insetLeft)
        console.log(insetRight)
        console.log(insetBack)
        return(
            {dimensions:[width,height,depth],
            positions : [x,y,z]}
        )
   }


    function linDivSetting (divDir,divElem){
        if (divDir==='V') {
            return {direction: DIR_HEIGHT, sign: SIGN_POSITIVE}
        } else {
            switch (divElem) {
                case 0 : return {direction:DIR_WIDTH,sign:SIGN_POSITIVE}
                case 2 : return {direction:DIR_WIDTH,sign:SIGN_NEGATIVE}
                case 1 : return {direction:DIR_DEPTH,sign:SIGN_POSITIVE}
                case 3 : return {direction:DIR_DEPTH,sign:SIGN_NEGATIVE}
            }
        }
    }







    return {
        anglPrimMap,
        anglZoneMap,
        anglElemMap,
        zoneGeometryMap,
        getMatThk,
        getRemainingDimensions,
        isCpDefined,
        isTrimShort,
        insetHandler,
        linDivSetting
    }
}
