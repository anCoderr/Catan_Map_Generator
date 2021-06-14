import React, {useRef, useEffect} from 'react';
import { connect } from 'react-redux';

import clayImage from '../assets/MapTileIcons/clay.png';
import hayImage from "../assets/MapTileIcons/hay.png";
import pastureImage from "../assets/MapTileIcons/pasture.png";
import stoneImage from "../assets/MapTileIcons/stone.png";
import forestImage from "../assets/MapTileIcons/forest.png";
import desertImage from "../assets/MapTileIcons/desert.png";
import oceanImage from "../assets/MapTileIcons/water.png";

import styles from './Canvas.module.css';

const Canvas = (props) => {    
    const canvasRef = useRef();
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        window.addEventListener('load', canvasDrawing(canvas, context, props.mapObject));
    }, [props.mapObject]);
    
    return (
        <div>
            <img className={styles.tileImage} id="clay" alt="clay" src={clayImage}></img>
            <img className={styles.tileImage} id="hay"  alt="hay" src={hayImage}></img>
            <img className={styles.tileImage} id="pasture" alt="pasture" src={pastureImage}></img>
            <img className={styles.tileImage} id="stone" alt="stone" src={stoneImage}></img>
            <img className={styles.tileImage} id="forest" alt="forest" src={forestImage}></img>
            <img className={styles.tileImage} id="desert" alt="desert" src={desertImage}></img>
            <img className={styles.tileImage} id="ocean" alt="ocean" src={oceanImage}></img>
            <canvas className={styles.canvas} ref={canvasRef}/>
        </div>

    );
}
const canvasDrawing = (canvas, context, mapObject) => {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
        context.imageSmoothingEnabled = true;
        context.strokeStyle = "black";
        context.clearRect(0, 0, canvas.width, canvas.height);

        let loadCount = 0, errorCount = 0;
        const targetCount = 6;
        
        const factor = 0.866;
        const padding = canvas.height/200;
        const size = canvas.height/12;
        const distY = (2*factor*size+padding)/2;
        const distX = (3*size + factor*2*padding)/2;

        const boardSize = canvas.height/2;
        const d = (canvas.width - 2*factor*boardSize)/2;
        const t = (canvas.height - boardSize)/2; 

        const absoluteCenterX = canvas.width/2;
        const absoluteCenterY = canvas.height/2;

        const tileCoordinates = [
            [absoluteCenterX - 2*distX, absoluteCenterY + 2*distY],
            [absoluteCenterX - 2*distX, absoluteCenterY],
            [absoluteCenterX - 2*distX, absoluteCenterY - 2*distY],
            [absoluteCenterX - distX, absoluteCenterY + 3*distY],
            [absoluteCenterX - distX, absoluteCenterY + distY],
            [absoluteCenterX - distX, absoluteCenterY - distY],
            [absoluteCenterX - distX, absoluteCenterY - 3*distY],
            [absoluteCenterX, absoluteCenterY + 4*distY],
            [absoluteCenterX, absoluteCenterY + 2*distY],
            [absoluteCenterX, absoluteCenterY],
            [absoluteCenterX, absoluteCenterY - 2*distY],
            [absoluteCenterX, absoluteCenterY - 4*distY],
            [absoluteCenterX + distX, absoluteCenterY + 3*distY],
            [absoluteCenterX + distX, absoluteCenterY + distY],
            [absoluteCenterX + distX, absoluteCenterY - distY],
            [absoluteCenterX + distX, absoluteCenterY - 3*distY],
            [absoluteCenterX + 2*distX, absoluteCenterY + 2*distY],
            [absoluteCenterX + 2*distX, absoluteCenterY],
            [absoluteCenterX + 2*distX, absoluteCenterY - 2*distY],
        ]

        let imageName;
        let probabilityNumber = 0;

        let imageClay = document.getElementById("clay");
        let imageHay = document.getElementById("hay");
        let imagePasture = document.getElementById("pasture");
        let imageStone = document.getElementById("stone");
        let imageTree = document.getElementById("forest");
        let imageDesert = document.getElementById("desert");
        let imageOcean = document.getElementById("ocean");

        let imagesArray = {imageClay, imageHay, imagePasture, imageStone, imageTree, imageOcean};

        const  drawOnTile = (index, centerX, centerY) => {
            for(let i = 0; i<19; i++) {
                if(mapObject[i].index === index) {
                    imageName = mapObject[i].resource;
                    probabilityNumber = mapObject[i].number;
                }
            }
            if(imageName === 'F') {
                imageName = imageTree;
            } else if(imageName === 'S') {
                imageName = imageStone;
            } else if(imageName === 'H') {
                imageName = imageHay;
            } else if(imageName === 'D') {
                imageName = imageDesert;
            } else if(imageName === 'P') {
                imageName = imagePasture;
            } else if(imageName === 'C') {
                imageName = imageClay;
            }
            
            context.drawImage(imageName, 0, 0, imageName.width, imageName.height, centerX - size, centerY - factor*size, 2*size, 2*factor*size);

            if(probabilityNumber !== 7) {
                drawTokerCircle(centerX, centerY, 30, 40, probabilityNumber);
                context.font = "bold " + size/4  +"px Arial";
                context.textAlign = "center";
                context.fillStyle = probabilityTextColour(probabilityNumber);
                context.fillText(probabilityNumber, centerX, centerY+size/12);
            }
            
        }

        const probabilityTextColour = (probabilityNumber) => {
            if(probabilityNumber === 6 || probabilityNumber === 8) {
                return "red";
            } else {
                return "black";
            }
        }

        const drawTokerCircle = (centerX, centerY, radiusSmall, radiusBig) => {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(centerX, centerY, radiusBig, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        
            context.fillStyle = "white";
            context.beginPath();
            context.arc(centerX, centerY, radiusSmall, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }

        const hexagonalTileDraw = (tileCenterCord, size, index) => {
            context.beginPath();
            context.moveTo(-size/2 + tileCenterCord[0], factor*size + tileCenterCord[1]);
            context.lineTo(-size + tileCenterCord[0], tileCenterCord[1]);
            context.lineTo(-size/2 + tileCenterCord[0], -factor*size + tileCenterCord[1]);
            context.lineTo(size/2 + tileCenterCord[0], -factor*size + tileCenterCord[1]);
            context.lineTo(size + tileCenterCord[0], tileCenterCord[1]);
            context.lineTo(size/2 + tileCenterCord[0], factor*size + tileCenterCord[1]);
            context.closePath();
            context.stroke();
            drawOnTile(index, tileCenterCord[0], tileCenterCord[1]);
        }

        const hexDraw = (tileCenterCord, size) => {
            context.beginPath();
            context.moveTo(-size/2 + tileCenterCord[0], factor*size + tileCenterCord[1]);
            context.lineTo(-size + tileCenterCord[0], tileCenterCord[1]);
            context.lineTo(-size/2 + tileCenterCord[0], -factor*size + tileCenterCord[1]);
            context.lineTo(size/2 + tileCenterCord[0], -factor*size + tileCenterCord[1]);
            context.lineTo(size + tileCenterCord[0], tileCenterCord[1]);
            context.lineTo(size/2 + tileCenterCord[0], factor*size + tileCenterCord[1]);
            context.closePath();
            context.fillStyle = "SaddleBrown";
            context.fill();
        }
        const waterDraw = () => {
            context.beginPath();
            context.moveTo(canvas.width/2, 0);
            context.lineTo(d, t);
            context.lineTo(d, boardSize+t);
            context.lineTo(canvas.width/2, canvas.height);
            context.lineTo(canvas.width-d, canvas.height-t);
            context.lineTo(canvas.width-d, t);
            context.lineTo(canvas.width/2, 0);
            context.fillStyle = "Navy";
            context.fill();
            context.stroke();
        }
        const landDraw = () => {
            for(let i = 0; i<19; i++) 
                hexDraw(tileCoordinates[i], size+padding);
        }
        
        const tileDraw = () => {
            for(let i = 0; i<19; i++)
                hexagonalTileDraw(tileCoordinates[i], size, i);
        }
        
        const imageLoader = () => {
            const checkAllLoaded = () => {
                if (loadCount + errorCount === targetCount) {
                    waterDraw();
                    landDraw();
                    tileDraw();
                }
            };
            const onloadImage = () => {
                loadCount++;
                checkAllLoaded();
            };
            const onErrorImage = () => {
                errorCount++;
                checkAllLoaded();
            }; 
            const loadImages = () => {
                if(loadCount + errorCount >= targetCount) {
                    landDraw();
                    tileDraw();
                } else {
                    for (var i = 0; i < targetCount; i++) {
                        var img = new Image();
                        img.onload = onloadImage; 
                        img.onerror = onErrorImage;
                        img.src = imagesArray[i];
                    }
                }
            };
            loadImages();
        };

        if(mapObject) {
            imageLoader();
        }
            
}

const mapStateToProps = (state) => {
    return {
        mapObject: state.mapObject,
    }
}

export default connect(mapStateToProps)(Canvas);