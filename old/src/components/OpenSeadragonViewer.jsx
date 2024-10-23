import React from 'react';
import { useEffect, useState } from "react";
import OpenSeaDragon from "openseadragon";
import '../styles/style.css'
import {Button} from "@mui/material";
import * as Annotorious from '@recogito/annotorious-openseadragon';
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';
import axios from "axios";
import SelectorPack from "@recogito/annotorious-selector-pack";
import BetterPolygon from '@recogito/annotorious-better-polygon';

const OpenSeadragonViewer = ({image, boxes, tool}) => {

    const [viewer, setViewer] = useState( null);
    const [anno, setAnno] = useState(null)
    const [info, setInfo] = useState({})
    const initOpenseadragon = () => {
        viewer && viewer.destroy()
        const viewwr_tmp = OpenSeaDragon({
            id: "openseadragon",
            prefixUrl: "http://localhost:3000/home/openseadragon-images/",
            //tileSources: `http://localhost:8000/${image}.dzi`,
            zoomPerScroll: 1.2,
            showNavigator: true,
            animationTime: 0.5,
            blendTime: 0.1,
            constrainDuringPan: true,
            maxZoomPixelRatio: 2,
            minZoomLevel: 1,
            visibilityRatio: 1,
        })
        setViewer(
            viewwr_tmp
        );
        return viewwr_tmp
    };
    const initializeAnnotations = (viewer) => {
        anno && anno.destroy()
        const annotateState = Annotorious(viewer, {
            locale: 'auto',
            //allowEmpty: true,
            //gigapixelMode: true,
            widgets: [
                'COMMENT',
                { widget: 'TAG', vocabulary: [ 'TI-RADS 1', 'TI-RADS 2', 'TI-RADS 3', 'TI-RADS 4', 'TI-RADS 5'] }
            ],
            formatter});
        annotateState.setDrawingTool('polygon')
        // annotateState.setDrawingTool('ellipse')
        setAnno(annotateState)
    }
    useEffect(() => {
        if (anno !== null) {
            anno.setDrawingTool(tool)
        }
    }, [tool])


    const formatter = (annotation) => {
        const isA = annotation.bodies.find(b => {
            return b.purpose === 'tagging' && b.value.toLowerCase() === 'f'
        });
        const isB = annotation.bodies.find(b => {
            return b.purpose === 'tagging' && b.value.toLowerCase() === 'f1'
        });
        const isC = annotation.bodies.find(b => {
            return b.purpose === 'tagging' && b.value.toLowerCase() === 'f2'
        });
        const isD = annotation.bodies.find(b => {
            return b.purpose === 'tagging' && b.value.toLowerCase() === 'f3'
        });
        const isE = annotation.bodies.find(b => {
            return b.purpose === 'tagging' && b.value.toLowerCase() === 'f4'
        });

        if (isA) {
            return 'A';
        }
        if (isB) {
            return 'B';
        }
        if (isC) {
            return 'C';
        }
        if (isD) {
            return 'D';
        }
        if (isE) {
            return 'E';
        }
    }

    useEffect(() => {
        console.log(image)
        if (image !== null){
            const viewer_tmp = initOpenseadragon()
            initializeAnnotations(viewer_tmp)
        }
    },[image]);
    var overlay = false;

    const handleOverlay = () => {
        setTimeout(() => {
            // handleNewOverlay()
            BetterPolygon(anno);
            anno.loadAnnotations('http://localhost:3000/home/example_1.json');
            SelectorPack(anno)

        }, 100)

    }


    const handleNewOverlay = () => {
        if(viewer){
            //console.log(anno.getAnnotations())
            //download(JSON.stringify(anno.getAnnotations()), 'example_1.json', 'json');
            if (boxes.category === 'A'){
                anno.loadAnnotations('http://localhost:3000/home/example_1.json');
            }
            if (boxes.category === 'B'){
                anno.loadAnnotations('http://localhost:3000/home/example_2.json');
            }
            if (boxes.category === 'C'){
                anno.loadAnnotations('http://localhost:3000/home/example_3.json');
            }
            if (boxes.category === 'D'){
                anno.loadAnnotations('http://localhost:3000/home/example_4.json');
            }
            if (boxes.category === 'E'){
                anno.loadAnnotations('http://localhost:3000/home/example_5.json');
            }
            // viewer.clearOverlays()
            // const boxCategory = boxes.category
            // boxes.boxes.forEach((box, index) => {
            //         const elt = document.createElement("div");
            //         elt.id = "category " + boxCategory + '_' + index;
            //         elt.className = "highlight";
            //         elt.style.border = 'solid'
            //         elt.style.borderColor = boxColor[boxCategory]
            //         elt.style.position = 'static'
            //         viewer.addOverlay({
            //             element: elt,
            //             location: new OpenSeaDragon.Rect(box.x, box.y, box.w*10/viewer.viewport._contentSize.x,box.h*10/viewer.viewport._contentSize.y),
            //         });
            //         const arrow = document.createElement("img");
            //         arrow.src = icons[boxCategory]
            //         arrow.alt = ''
            //         arrow.id = 'right-arrow'+ index
            //         viewer.addOverlay({
            //             // element: arrow,
            //             // location: new OpenSeaDragon.Point(box.x, box.y),
            //             // placement: OpenSeaDragon.Placement.RIGHT,
            //             // checkResize: true
            //     });

            //     }
            // )
        }

    }
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }


    useEffect(() => {
        if (viewer){
            handleOverlay()
        }
    }, [viewer])


    useEffect(() => {
        if (viewer){
            handleNewOverlay()
        }
    }, [boxes])

    return (
        <div>
            <div id="openseadragon">

            </div>
        </div>

    );
}

export default OpenSeadragonViewer;


