import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import styles from './css/PostImageGallery.module.css';

/**PostImageGallery: renders image for a posts and handles rotation of images
 *
 *Props:
 * - images (array): array containing image urls like... ['image.com', 'image2.com']
 *
 *State:
 * - imagesState (number): holds index for image to display in PostImageGallery
 *
 * PostListItem -> PostImageGallery
 */
function PostImageGallery({images}:{images:string[]}): ReactNode {

    const [imagesState, setImages] = useState<number>(0)

    //increment index of images to show or reset to 0
    function moveImageRight(){
        if(imagesState+1 >= images.length){
            setImages(0)
        }else{
            setImages(imagesState+1)
        }
    }

    //decrement index of images to show or set to the end of images
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
            <img
            className={styles.postImage}
            src={images[imagesState]} alt="" />
            <span
            onClick={moveImageRight}
            className={`${styles.rightArrow} bi bi-arrow-right`}>
            </span>
            <span
            onClick={moveImageLeft}
            className={`${styles.leftArrow} bi bi-arrow-left`}>
            </span>
        </div>
    );
}
export default PostImageGallery