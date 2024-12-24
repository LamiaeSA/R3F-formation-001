
import {useArticleData} from "../helper/ArticleProvider.jsx"
import {scaleFactor} from "../helper/Constants.jsx";
import Division from "./zone_props/Division.jsx";
import {Edges, Text} from "@react-three/drei";
import React from "react";


export default function MainArticle() {
    console.log("============> MainArticle <============")
    const {anglPrimMap, anglZoneMap} = useArticleData()
    const anglPrim = anglPrimMap.get("TEST_OAL_CAB_CONV_001")
    const articleWidth = anglPrim.SIZEX * scaleFactor
    const articleHeight = anglPrim.SIZEY * scaleFactor
    const articleDepth = anglPrim.SIZEZ * scaleFactor

    const filteredMap = new Map(
        Array.from(anglZoneMap).filter(([key, value]) => value.LINDIV1 !== '' || value.TREEID === '0')
    );

    return (
        <>
            {
                [...filteredMap.keys()].map((value, index) => {

                    return (
                        <>
                            <mesh position={[0,20,0]} renderOrder={20} >
                                <Edges color={"#ee1414"}/>
                                <boxGeometry args={[80,80,80]}/>
                                <meshStandardMaterial color={"#ff0000"} transparent opacity={0.1}/>
                            </mesh>
                            <Division key={value} TREEID={value}/>
                        </>

                    )
                })
            }
        </>
    )
}