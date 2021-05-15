import React, {useRef, useEffect} from 'react';
import { connect } from 'react-redux';

import clayImage from '../assets/images/Main/clay.png';
import hayImage from "../assets/images/Main/hay.png";
import pastureImage from "../assets/images/Main/pasture.png";
import stoneImage from "../assets/images/Main/stone.png";
import forestImage from "../assets/images/Main/forest.png";
import desertImage from "../assets/images/Main/desert.png";
import oceanImage from "../assets/images/Main/water.png";

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
        
        const dp = (4*factor*padding)/2;

        const d0 = size/2 + dp;
        const d1 = size + dp;
        const d2 = distX + dp + size/2;
        const d3 = distX + dp + size;
        const d4 = 2*distX + dp + size/2;
        const d5 = 2*distX + dp + size;
        const d6 = 5*distY + padding/2;
        const d7 = 4*distY + padding/2;
        const d8 = 3*distY + padding/2;
        const d9 = 2*distY + padding/2;
        const d10 = distY + padding/2; 

        const boardSize = canvas.height/2;
        const d = (canvas.width - 2*factor*boardSize)/2;
        const t = (canvas.height - boardSize)/2; 

        const absoluteCenterX = canvas.width/2;
        const absoluteCenterY = canvas.height/2;

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

        const hexDraw = (centerX, centerY, size, index) => {
            context.beginPath();
            context.moveTo(-size/2 + centerX, factor*size + centerY);
            context.lineTo(-size + centerX, centerY);
            context.lineTo(-size/2 + centerX, -factor*size + centerY);
            context.lineTo(size/2 + centerX, -factor*size + centerY);
            context.lineTo(size + centerX, centerY);
            context.lineTo(size/2 + centerX, factor*size + centerY);
            context.closePath();
            context.stroke();
            drawOnTile(index, centerX, centerY);
        }

        const waterDraw = () => {
            console.log('Boom', canvas.width, canvas.height, d, t);
            context.beginPath();
            context.moveTo(canvas.width/2, 0);
            context.lineTo(d, t);
            context.lineTo(d, boardSize+t);
            context.lineTo(canvas.width/2, canvas.height);
            context.lineTo(canvas.width-d, canvas.height-t);
            context.lineTo(canvas.width-d, t);
            context.lineTo(canvas.width/2, 0);
            // context.drawImage(imageOcean, d, 0, canvas.width - d,canvas.height)
            context.fillStyle = "Navy";
            context.fill();
            context.stroke();
        }

        const landDraw = () => {
            context.beginPath();
            context.moveTo(absoluteCenterX - d0, absoluteCenterY - d6);
            context.lineTo(absoluteCenterX - d1, absoluteCenterY - d7);
            context.lineTo(absoluteCenterX - d2, absoluteCenterY - d7);
            context.lineTo(absoluteCenterX - d3, absoluteCenterY - d8);
            context.lineTo(absoluteCenterX - d4, absoluteCenterY - d8);
            context.lineTo(absoluteCenterX - d5, absoluteCenterY - d9);
            context.lineTo(absoluteCenterX - d4, absoluteCenterY - d10);
            context.lineTo(absoluteCenterX - d5, absoluteCenterY);
            context.lineTo(absoluteCenterX - d4, absoluteCenterY + d10);
            context.lineTo(absoluteCenterX - d5, absoluteCenterY + d9);
            context.lineTo(absoluteCenterX - d4, absoluteCenterY + d8);
            context.lineTo(absoluteCenterX - d3, absoluteCenterY + d8);
            context.lineTo(absoluteCenterX - d2, absoluteCenterY + d7);
            context.lineTo(absoluteCenterX - d1, absoluteCenterY + d7);
            context.lineTo(absoluteCenterX - d0, absoluteCenterY + d6);
            context.lineTo(absoluteCenterX + d0, absoluteCenterY + d6);
            context.lineTo(absoluteCenterX + d1, absoluteCenterY + d7);
            context.lineTo(absoluteCenterX + d2, absoluteCenterY + d7);
            context.lineTo(absoluteCenterX + d3, absoluteCenterY + d8);
            context.lineTo(absoluteCenterX + d4, absoluteCenterY + d8);
            context.lineTo(absoluteCenterX + d5, absoluteCenterY + d9);
            context.lineTo(absoluteCenterX + d4, absoluteCenterY + d10);
            context.lineTo(absoluteCenterX + d5, absoluteCenterY);
            context.lineTo(absoluteCenterX + d4, absoluteCenterY - d10);
            context.lineTo(absoluteCenterX + d5, absoluteCenterY - d9);
            context.lineTo(absoluteCenterX + d4, absoluteCenterY - d8);
            context.lineTo(absoluteCenterX + d3, absoluteCenterY - d8);
            context.lineTo(absoluteCenterX + d2, absoluteCenterY - d7);
            context.lineTo(absoluteCenterX + d1, absoluteCenterY - d7);
            context.lineTo(absoluteCenterX + d0, absoluteCenterY - d6);
            context.lineTo(absoluteCenterX - d0, absoluteCenterY - d6);
            context.fillStyle = "SaddleBrown";
            context.fill();
            context.stroke();
        }

        const col1Draw = () => {
            hexDraw(absoluteCenterX - 2*distX, absoluteCenterY + 2*distY, size, 0);
            hexDraw(absoluteCenterX - 2*distX, absoluteCenterY, size, 1);
            hexDraw(absoluteCenterX - 2*distX, absoluteCenterY - 2*distY, size, 2);
        };
        const col2Draw = () => {
            hexDraw(absoluteCenterX - distX, absoluteCenterY + 3*distY, size, 3);
            hexDraw(absoluteCenterX - distX, absoluteCenterY + distY, size, 4);
            hexDraw(absoluteCenterX - distX, absoluteCenterY - distY, size, 5);
            hexDraw(absoluteCenterX - distX, absoluteCenterY - 3*distY, size, 6);
        };
        const col3Draw = () => {
            hexDraw(absoluteCenterX, absoluteCenterY + 4*distY, size, 7);
            hexDraw(absoluteCenterX, absoluteCenterY + 2*distY, size, 8);
            hexDraw(absoluteCenterX, absoluteCenterY, size, 9);
            hexDraw(absoluteCenterX, absoluteCenterY - 2*distY, size, 10);
            hexDraw(absoluteCenterX, absoluteCenterY - 4*distY, size, 11);
        };
        const col4Draw = () => {
            hexDraw(absoluteCenterX + distX, absoluteCenterY + 3*distY, size, 12);
            hexDraw(absoluteCenterX + distX, absoluteCenterY + distY, size, 13);
            hexDraw(absoluteCenterX + distX, absoluteCenterY - distY, size, 14);
            hexDraw(absoluteCenterX + distX, absoluteCenterY - 3*distY, size, 15);
        };
        const col5Draw = () => {
            hexDraw(absoluteCenterX + 2*distX, absoluteCenterY + 2*distY, size, 16);
            hexDraw(absoluteCenterX + 2*distX, absoluteCenterY, size, 17);
            hexDraw(absoluteCenterX + 2*distX, absoluteCenterY - 2*distY, size, 18);
        };
        const mapDraw = () => {
            col1Draw();
            col2Draw();
            col3Draw();
            col4Draw();
            col5Draw();
        };
        const imageLoader = () => {
            const checkAllLoaded = function() {
                if (loadCount + errorCount === targetCount) {
                    waterDraw();
                    landDraw();
                    mapDraw();
                }
            };
            const onloadImage = function() {
                loadCount++;
                checkAllLoaded();
            };
            const onErrorImage = function() {
                errorCount++;
                checkAllLoaded();
            }; 
            const loadImages = () => {
                if(loadCount + errorCount >= targetCount) {
                    landDraw();
                    mapDraw();
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