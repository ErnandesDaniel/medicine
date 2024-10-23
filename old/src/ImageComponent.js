import {Stage, Layer, Image} from 'react-konva';
import * as React from "react";
import {Box, CircularProgress, FormControl, IconButton, Slider} from "@mui/material";
import {Icon} from "@iconify/react";

import useImage from "use-image";


import GlobalStyles from "@mui/material/GlobalStyles";

import Konva from "konva";
import {useEffect, useState} from "react";
import {circularProgressClasses} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import OpenSeaDragon from "openseadragon";
import './styles/style.css'
import * as Annotorious from '@recogito/annotorious-openseadragon';
import SelectorPack from '@recogito/annotorious-selector-pack'
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';
import axios from "axios";
import BetterPolygon from '@recogito/annotorious-better-polygon';

const boxColor = {A: 'green', B: 'blue', C: 'pink', D: 'yellow', E: 'orange'}
const icons = {A: 'http://localhost:3000/home/right-arrow_green.png', B: 'http://localhost:3000/home/right-arrow_blue.png', C: 'http://localhost:3000/home/right-arrow_pink.png', D: 'http://localhost:3000/home/right-arrow_yellow.png', E: 'http://localhost:3000/home/right-arrow_orange.png'}
const pages = [ 'example_1.json', 'example_1-3.json', 'example_1-4.json', 'example_1-5.json']

const ImageComponent = ({image, tool, url}) => {
        const [viewer, setViewer] = useState( null);
        const [anno, setAnno] = useState(null)
        //const [info, setInfo] = useState({})
        const initOpenseadragon = () => {
            viewer && viewer.destroy()
            const viewwr_tmp = OpenSeaDragon({
                id: "openseadragon",
                prefixUrl: "http://localhost:3000/home/openseadragon-images/",
                //tileSources: image,
                tileSources: {type: "image", url: 'http://'+ url.split('/')[2] + image},
                sequenceMode: true,
                // zoomPerScroll: 1.2,
                showNavigator: true,
                // animationTime: 1,
                // //blendTime: 0.01,
                // constrainDuringPan: true,
                // maxZoomPixelRatio: 2,
                // minZoomLevel: 1,
                // visibilityRatio: 1,
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
                ], tools: [ 'rect', 'polygon'],
                formatter});
            //annotateState.setDrawingTool('polygon')
            SelectorPack(annotateState)
            setAnno(annotateState)
        }
        useEffect(() => {
            if (anno !== null) {
                anno.setDrawingTool(tool)
            }
        }, [tool])

        const formatter = (annotation) => {
            const isA = annotation.bodies.find(b => {
                return b.purpose === 'tagging' && b.value.toLowerCase() === 'ti-rads 1'
            });
            const isB = annotation.bodies.find(b => {
                return b.purpose === 'tagging' && b.value.toLowerCase() === 'ti-rads 2'
            });
            const isC = annotation.bodies.find(b => {
                return b.purpose === 'tagging' && b.value.toLowerCase() === 'ti-rads 3'
            });
            const isD = annotation.bodies.find(b => {
                return b.purpose === 'tagging' && b.value.toLowerCase() === 'ti-rads 4'
            });
            const isE = annotation.bodies.find(b => {
                return b.purpose === 'tagging' && b.value.toLowerCase() === 'ti-rads 5'
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
            //console.log(image)
            if (image !== null && image !== ""){
                const viewer_tmp = initOpenseadragon()
                initializeAnnotations(viewer_tmp)
            }
            //console.log(image)
        },[image]);


        const handleOverlay = () => {
                //BetterPolygon(anno);
                anno.loadAnnotations('http://localhost:3000/home/example_1.json');
                if(viewer) {
                    viewer.addHandler('page', handleAnnotations)
                }
                //console.log(anno.getAnnotations())
        }

        function handleAnnotations(){
            const num = viewer.currentPage() % 4
            anno.loadAnnotations('http://localhost:3000/home/'+pages[num]);
        }



        useEffect(() => {
            if (anno){
                handleOverlay()
                //console.log('work')
            }
        }, [anno])


        return (
            <div>
                <div id="openseadragon"/>
            </div>
        );



}
//     let token = localStorage.getItem('access')
//     const [succ, setSucc] = useState(false)
//     const [image] = useImage(props.url+props.img, 'anonymous', 'origin', {
//         headers: {
//             Authorization: "Bearer " + token,
//         }
//     } )
//     useEffect(() =>
//     {
//         if (props.img === "" || props.img === null) {
//             setSucc(false)
//         } else {
//             setSucc(true)
//         }
//     }, []
//     )
//     const layerRef = React.useRef(null);
//     const stageRef = React.useRef(null);
//     const [orBr, setOrBr] = React.useState(0)
//     const [orSat, setOrSat] = React.useState(0)
//
//     function downloadURI(uri, name) {
//         var link = document.createElement('a');
//         link.download = name;
//         link.href = uri;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
//
//     const handleExport = () => {
//         const tmpStage = new Konva.Stage({container: 'stage'});
//         const tmpLayer = new Konva.Layer();
//         tmpLayer.add(new Konva.Image({image: image}))
//         tmpStage.add(tmpLayer)
//         const cropped = tmpStage.size({
//             width: image.naturalWidth,
//             height: image.naturalHeight
//         })
//         const uri = cropped.toDataURL();
//         downloadURI(uri, "stage.png")
//         tmpStage.size({
//             width: 0,
//             height: 0
//         })
//     };
//     const handleChangeBr = (event) => {
//         setOrBr(event.target.value);
//         layerRef.current.cache();
//         layerRef.current.filters([Konva.Filters.Brighten, Konva.Filters.Contrast]);
//         layerRef.current.brightness(orBr / 100)
//         layerRef.current.contrast(orSat)
//     }
//     const handleChangeCont = (event) => {
//         setOrSat(event.target.value);
//         layerRef.current.cache();
//         layerRef.current.filters([Konva.Filters.Contrast, Konva.Filters.Brighten]);
//         layerRef.current.contrast(orSat)
//         layerRef.current.brightness(orBr / 100)
//     }
//     return (
//         <div>
//             {!succ && <Box display={'flex'} alignItems={'center'} justifyItems={'center'} justifyContent={'center'} alignContent={'center'} sx={{minHeight:300}}>
//                 <CircularProgress variant="indeterminate"
//                                   {...props}/> </Box>}
//             {succ && <Box container direction={'column'}>
//                 <GlobalStyles styles={{
//                     h2: {color: 'dimgray', fontSize: 25, fontFamily: "Roboto"},
//                     h5: {color: 'dimgray', fontSize: 10, fontFamily: "Roboto"}
//                 }}/>
//                 <IconButton style={{maxWidth: '60px', maxHeight: '60px'}} onClick={handleExport} sx={{
//                     '& svg': {
//                         fontSize: 30, color: '#4FB3EAFF'
//                     }
//                 }}>
//                     <Icon icon="fluent:save-20-filled"/>
//                 </IconButton>
//                 <Stage
//                     width={400}
//                     height={300}
//                     ref={stageRef}
//                 >
//                     <Layer>
//                         <Image ref={layerRef} width={400} height={300} mimeType={"image/png"} image={image}></Image>
//                     </Layer>
//                 </Stage>
//                 <Box sx={{width: 300, paddingTop: 1}} display={'flex'} alignContent={'center'}>
//                     <h2 style={{fontSize: 12, fontWeight: 'normal', paddingRight: 59, paddingLeft: 30}}>Яркость</h2>
//                     <FormControl variant={'outlined'}>
//                         <Slider aria-label="Яркость" defaultValue={0}
//                                 value={orBr}
//                                 size={'small'}
//                                 track={false}
//                                 min={-100}
//                                 max={100}
//                                 step={5}
//                                 onChange={handleChangeBr}
//                                 valueLabelDisplay="auto"
//                                 sx={{width: 150}}/>
//                     </FormControl>
//                 </Box>
//                 <Box display={'flex'}>
//                     <Box sx={{width: 300, paddingBottom: 1}} display={'flex'} alignContent={'center'}>
//                         <h2 style={{
//                             fontSize: 12,
//                             fontWeight: 'normal',
//                             paddingRight: 20,
//                             paddingLeft: 30
//                         }}>Контрастность</h2>
//                         <FormControl variant={'outlined'}>
//                             <Slider aria-label="Контрастность" defaultValue={0}
//                                     value={orSat}
//                                     step={10}
//                                     track={false}
//                                     size={'small'}
//                                     min={-100}
//                                     max={100}
//                                     sx={{width: 150}}
//                                     onChange={handleChangeCont}
//                                     valueLabelDisplay="auto"/>
//                         </FormControl>
//                     </Box>
//                 </Box>
//             </Box>
//             }
//             <div id={'stage'}></div>
//         </div>
//     )
// };
export default ImageComponent;