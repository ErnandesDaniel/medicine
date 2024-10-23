import React, {useEffect, useRef, useState} from "react";
import UTIF from "utif";
import Canvas2image from "canvas-to-png";
import OpenSeadragonViewer from "./OpenSeadragonViewer";
import {MenuItem, Select} from "@mui/material";

const TiffImageComponent = (props) => {
    const ref = useRef(props.ref)
    const [imgArray, setArray] = useState([]);
    const [succ, setSucc] = useState(false)
    const [tool, setTool] = useState('polygon')
    const handleChangeTool = (event) => {
        setTool(event.target.value)
    }

    useEffect(() => {
        setSucc(false)
        if (props.img !== "" && props.img !== null) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://'+ props.url.split('/')[1] + props.img);
            xhr.responseType = 'arraybuffer';
            xhr.onload = e => {
                const ifds = UTIF.decode(e.target.response);
                const firstPageOfTif = ifds[0];
                const tmp_ar = [];
                var index = 0;
                for (let tmp of ifds) {
                    UTIF.decodeImage(e.target.response, ifds[index], ifds);
                    const rgba = UTIF.toRGBA8(tmp);
                    const imageWidth = firstPageOfTif.width;
                    const imageHeight = firstPageOfTif.height;
                    const cnv = document.createElement('canvas');
                    cnv.width = imageWidth;
                    cnv.height = imageHeight;
                    const ctx = cnv.getContext('2d');
                    const imageData = ctx.createImageData(imageWidth, imageHeight);
                    for (let i = 0; i < rgba.length; i++) {
                        imageData.data[i] = rgba[i];
                    }
                    ctx.putImageData(imageData, 0, 0);
                    const cur = Canvas2image.convertToPNG(cnv, 1000, 700)
                    tmp_ar.push({type: 'image', url: cur.src})
                    index += 1;
                }
                setArray(tmp_ar);
                setSucc(true)
            };
            xhr.send();
        }
    }, [props.url, props.img])


    const handleExport = () => {
        fetch('http://'+ props.url.split('/')[1] + props.img, {
            method: "GET", headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.tiff"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div id="main-page">
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tool}
                label="Инструмент"
                onChange={handleChangeTool}
            >
                {/*<MenuItem value={'ellipse'}>Эллипс</MenuItem>*/}
                <MenuItem value={'polygon'}>Полигон</MenuItem>
                <MenuItem value={'rect'}>Прямоугольник</MenuItem>
                {/*<MenuItem value={'freehand'}>Свободный</MenuItem>*/}
                {/*<MenuItem value={'point'}>Точка</MenuItem>*/}
            </Select>
        <OpenSeadragonViewer image={imgArray} boxes={props.boxes} tool={props.tool}/>
        </div>
    );
}