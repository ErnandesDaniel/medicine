// import React, {useEffect, useRef, useState} from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import OpenSeadragonViewer from "../OpenSeadragonViewer";
// //import OpenSeadragonViewer from "./components/OpenSeadragonViewer";
// import UploadImage from "./UploadImage";
// import UTIF from "utif";
// import Canvas2image from "canvas-to-png";
// import {MenuItem, Select} from "@mui/material";
//
//
//
// const Tab1 = () => {
//     return (<div>
//         Tab1 Content
//     </div>)
// }
//
// const Tab2 = () => {
//     return (<div>
//         Tab2 Content
//     </div>)
// }
// const categories = [
//     {
//         category: 'A',
//         boxes: [
//             {
//                 x: 0.5,
//                 y: 0.02,
//                 w: 100,
//                 h: 100,
//             },
//             {
//                 x: 0.8,
//                 y: 0.1,
//                 w: 150,
//                 h: 70,
//             },
//             {
//                 x: 0.01,
//                 y: 0.01,
//                 w: 100,
//                 h: 50,
//             },
//         ]
//     },
//     {
//         category: 'B',
//         boxes: [
//             {
//                 x: 0.3,
//                 y: 0.2,
//                 w: 50,
//                 h: 50,
//             },
//             {
//                 x: 0.5,
//                 y: 0.3,
//                 w: 60,
//                 h: 100,
//             },
//             {
//                 x: 0.1,
//                 y: 0.1,
//                 w: 300,
//                 h: 150,
//             },
//         ]
//     },
//     {
//         category: 'C',
//         boxes: [
//             {
//                 x: 0.2,
//                 y: 0.02,
//                 w: 100,
//                 h: 100,
//             },
//             {
//                 x: 0.08,
//                 y: 0.001,
//                 w: 200,
//                 h: 200,
//             },
//             {
//                 x: 0.01,
//                 y: 0.01,
//                 w: 100,
//                 h: 50,
//             },
//         ]
//     },
//     {
//         category: 'D',
//         boxes: [
//             {
//                 x: 0.7,
//                 y: 0.2,
//                 w: 170,
//                 h: 150,
//             },
//             {
//                 x: 0.3,
//                 y: 0.3,
//                 w: 100,
//                 h: 100,
//             },
//             {
//                 x: 0.1,
//                 y: 0.1,
//                 w: 300,
//                 h: 250,
//             },
//         ]
//     },
//     {
//         category: 'E',
//         boxes: [
//             {
//                 x: 0.4,
//                 y: 0.4,
//                 w: 100,
//                 h: 100,
//             },
//             {
//                 x: 0.001,
//                 y: 0.001,
//                 w: 30,
//                 h: 80,
//             },
//             {
//                 x: 0.6,
//                 y: 0.1,
//                 w: 200,
//                 h: 200,
//             },
//         ]
//     }
//
// ]
//
// const TiffImageComponent = (props) => {
//     const ref = useRef(props.ref)
//     const [imgArray, setArray] = useState([]);
//     const [succ, setSucc] = useState(false)
//
//     useEffect(() => {
//         setSucc(false)
//         if (props.img !== "" && props.img !== null) {
//             const xhr = new XMLHttpRequest();
//             xhr.open('GET', `http://localhost:3000/home/10_TIRADS5_cross.tif`);
//             xhr.responseType = 'arraybuffer';
//             xhr.onload = e => {
//                 const ifds = UTIF.decode(e.target.response);
//                 const firstPageOfTif = ifds[0];
//                 const tmp_ar = [];
//                 var index = 0;
//                 for (let tmp of ifds) {
//                     UTIF.decodeImage(e.target.response, ifds[index], ifds);
//                     const rgba = UTIF.toRGBA8(tmp);
//                     const imageWidth = firstPageOfTif.width;
//                     const imageHeight = firstPageOfTif.height;
//                     const cnv = document.createElement('canvas');
//                     cnv.width = imageWidth;
//                     cnv.height = imageHeight;
//                     const ctx = cnv.getContext('2d');
//                     const imageData = ctx.createImageData(imageWidth, imageHeight);
//                     for (let i = 0; i < rgba.length; i++) {
//                         imageData.data[i] = rgba[i];
//                     }
//                     ctx.putImageData(imageData, 0, 0);
//                     const cur = Canvas2image.convertToPNG(cnv, 1000, 700)
//                     tmp_ar.push({type: 'image', url: cur.src})
//                     index += 1;
//                 }
//                 setArray(tmp_ar);
//                 setSucc(true)
//             };
//             xhr.send();
//         }
//     }, [props.url, props.img])
//
//
//     const handleExport = () => {
//         fetch(props.url + props.img, {
//             method: "GET", headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}
//         })
//             .then(response => {
//                 response.arrayBuffer().then(function (buffer) {
//                     const url = window.URL.createObjectURL(new Blob([buffer]));
//                     const link = document.createElement("a");
//                     link.href = url;
//                     link.setAttribute("download", "image.tiff"); //or any other extension
//                     document.body.appendChild(link);
//                     link.click();
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };
//     return (
//         <OpenSeadragonViewer image={imgArray} boxes={props.boxes} tool={props.tool}/>
//     );
// }
//
//
// const TabsComponent = (props) => {
//     const [value, setValue] = React.useState(0);
//     const [boxes, setBoxes] = React.useState(categories[0]);
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//         setBoxes(categories[newValue])
//     };
//     const [image, setImage] = useState(null)
//     const [tool, setTool] = useState('polygon')
//
//     const getImage = (image) => {
//         setImage(image)
//     }
//     const handleChangeTool = (event) => {
//         setTool(event.target.value)
//     }
//     const [tabIndex, setTabIndex] = useState(0);
//     return(
//         <div id="main-page">
//             <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={tool}
//                 label="Инструмент"
//                 onChange={handleChangeTool}
//             >
//                 {/*<MenuItem value={'ellipse'}>Эллипс</MenuItem>*/}
//                 <MenuItem value={'polygon'}>Полигон</MenuItem>
//                 <MenuItem value={'rect'}>Прямоугольник</MenuItem>
//                 {/*<MenuItem value={'freehand'}>Свободный</MenuItem>*/}
//                 {/*<MenuItem value={'point'}>Точка</MenuItem>*/}
//             </Select>
//             <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons={false}
//             TabIndicatorProps={{sx: {backgroundColor: '#ffffff'}}}
//             aria-label="scrollable prevent tabs example" sx={{width: '1000px','& button:active': {color: '#4fb3ea'}, '& button':{textTransform: 'none'}, '& button:focus': {color: '#4fb3ea'}, '& button:hover': {color: '#4fb3ea'}, '& button.Mui-selected': {color: '#4fb3ea', boxShadow: '0 10px 10px rgba(50, 50, 93, 0.3)', borderTopRightRadius: 30, borderTopLeftRadius: value !== 0? 30:0}}}>
//             <Tab label="Адекватность материала" sx={{fontWeight: 'lighter'}}/>
//             <Tab label="Клеточность" sx={{fontWeight: 'lighter'}}/>
//             <Tab label="Лимфоцитарная инфильтрация скоплений тиреоцитов" sx={{fontWeight: 'lighter'}}/>
//             <Tab label="Онкоциты" sx={{fontWeight: 'lighter'}}/>
//             <Tab label="Тиреоциты" sx={{fontWeight: 'lighter'}}/>
//             </Tabs>
//             {/*<OpenSeadragonViewer image={image} boxes={boxes} tool={tool}></OpenSeadragonViewer>*/}
//             <TiffImageComponent image={image} boxes={boxes} tool={tool}/>
//             {/*<UploadImage sendImage={getImage}></UploadImage>*/}
//     </div>
// )
// }
//
// export default TabsComponent;