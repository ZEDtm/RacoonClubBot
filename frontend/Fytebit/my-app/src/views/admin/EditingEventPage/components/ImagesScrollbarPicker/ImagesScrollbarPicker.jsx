import React, { useState, useEffect } from 'react';
import styles from "./ImagesScrollbarPicker.module.css";
import FileInput from "../FileInput/FileInput";
import Icons from "../../../../../components/ui/Icons/Icons";

function ImagesScrollBarPicker({ mainImage, setMainImage, images, setImages }) {
    const [animationClass, setAnimationClass] = useState('');

    const handleFileChange = (file) => {
        const newImage = {
            src: URL.createObjectURL(file),
            id: images.length + 1
        };
        setImages([newImage, ...images]);
    };

    const handleImageClick = (clickedImage) => {
        setAnimationClass(styles.fadeOut);

        setTimeout(() => {
            if (mainImage) {
                setImages([mainImage, ...images.filter(img => img.id !== clickedImage.id)]);
            } else {
                setImages(images.filter(img => img.id !== clickedImage.id));
            }
            setMainImage(clickedImage);
            setAnimationClass(styles.fadeIn);
        }, 300); // Ждем завершения анимации (0.5 секунды)
    };

    useEffect(() => {
        if (animationClass === styles.fadeIn) {
            setTimeout(() => setAnimationClass(''), 500); // Убираем класс после завершения анимации
        }
    }, [animationClass]);

    return (
        <div>
            <div className={styles.imageContainer}>
                <img
                    className={`${styles.eventImage} ${animationClass}`}
                    src={mainImage ? mainImage.src : "/image_3.jpg"}
                    alt="Main Event Image"
                />
            </div>

            <div className={styles.scrollableImages}>
                <div className={styles.imgInputContainer}>
                    <div className={styles.imgInputContainerDiv}>
                        <FileInput onFileChange={handleFileChange}/>
                        <div className={styles.imgInputContainerDivIcon}>
                            <Icons type="imageInput" width="2rem" height="2rem" color="var(--color-heading)"
                                   className={styles.imgInputIcon}/>
                        </div>
                    </div>
                </div>
                {images.map(image => (
                    <img
                        className={styles.imageItem}
                        src={image.src}
                        alt="Event Images"
                        key={image.id}
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImagesScrollBarPicker;