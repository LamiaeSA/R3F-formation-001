import './App.css'
import {Canvas} from "@react-three/fiber";
import React from "react";
import MainArticle from "./components/MainArticle.jsx";
import DataParcer from "./helper/DataParcer.jsx";
import {DataProvider} from "./helper/ArticleProvider.jsx";
import anglPrim from "./data/anglPrim.json"
import anglZone from "./data/anglZone.json"
import anglElem from "./data/anglElem.json"
import {OrbitControls, OrthographicCamera} from "@react-three/drei";


function App() {
    console.log('============> App <============')
    const data = DataParcer(anglPrim, anglZone, anglElem)
    console.log(data)
    return (
        <DataProvider data={data}>
            <Canvas >
                <OrthographicCamera makeDefault zoom={5} near={-1000} far={1000} position={[0, 0, 2]}/>
                <MainArticle dimension={[20, 20, 10]} position={[0, 0, 0]}/>
                <OrbitControls/>
                <ambientLight intensity={1}/>
            </Canvas>
        </DataProvider>
    )
}

export default App
