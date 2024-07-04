import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import FiskeAPI from "../../api.ts";
import { useError } from "../../context/ErrorContext.tsx";
import styles from './css/PostImageGallery.module.css'

function PostImageGallery({images}): ReactNode {

    const [imagesState, setImages] = useState(0)

    function moveImageRight(){
        if(imagesState+1 >= images.length){
            setImages(0)
        }else{
            setImages(imagesState+1)
        }
    }

    function moveImageLeft(){
        console.log(imagesState)
        if(imagesState === 0){
            setImages(images.length-1)
        }else{
            setImages(imagesState-1)
        }
    }





    return (
        <div className={styles.container}>
            <img className={styles.postImage}src={images[imagesState]} alt="" />
            <span onClick={moveImageRight}className={`${styles.rightArrow} bi bi-arrow-right`}></span>
            <span onClick={moveImageLeft}className={`${styles.leftArrow} bi bi-arrow-left`}></span>
        </div>
    );
}
export default PostImageGallery