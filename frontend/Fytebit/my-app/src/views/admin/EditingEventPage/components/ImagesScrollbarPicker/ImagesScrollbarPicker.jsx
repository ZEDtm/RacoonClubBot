// ImagesScrollbarPicker
import React, {useState, useEffect, useContext} from 'react';
import styles from "./ImagesScrollbarPicker.module.css";
import FileInput from "../FileInput/FileInput";
import Icons from "../../../../../components/ui/Icons/Icons";
import {uploadImageToEvent} from "../../../../../api/Client";
import BaseUrlContext from "../../../../../api/BaseUrlContext";

function ImagesScrollBarPicker({ mainImage, setMainImage, images, setImages, _id}) {
    const baseUrl = useContext(BaseUrlContext);

    const [animationClass, setAnimationClass] = useState('');
    const [clickTimer, setClickTimer] = useState(null);

    const handleFileChange = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = 'a123'
            const data = await uploadImageToEvent(baseUrl, token, _id, formData)
            const newImage = {
                src: data,
                file_id: null,
            };
            if (images){setImages([newImage, ...images]);}
            else {setImages([newImage]);}

        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
        }
    };

    const handleImageClick = (clickedImage) => {
        if (clickTimer) {
            // Если таймер уже установлен, это двойной клик
            clearTimeout(clickTimer);
            setClickTimer(null);
            handleDoubleClick(clickedImage);
        } else {
            // Устанавливаем таймер для ожидания второго клика
            setClickTimer(setTimeout(() => {
                handleSingleClick(clickedImage);
                setClickTimer(null);
            }, 200)); // Время ожидания для двойного клика
        }
    };


    const handleSingleClick = (clickedImage) => {
        setAnimationClass(styles.fadeOut);

        setTimeout(() => {
            if (mainImage) {
                setImages([mainImage, ...images.filter(img => img.src !== clickedImage.src)]);
            } else {
                setImages(images.filter(img => img.src !== clickedImage.src));
            }
            setMainImage(clickedImage);
            setAnimationClass(styles.fadeIn);
        }, 300); // Ждем завершения анимации (0.5 секунды)
    };

    const handleDoubleClick = (clickedImage) => {
        if (images) {
            const updatedImages = images.filter(img => img.src !== clickedImage.src);
            setImages(updatedImages);
        }
    };


    useEffect(() => {
        if (animationClass === styles.fadeIn) {
            setTimeout(() => setAnimationClass(''), 500); // Убираем класс после завершения анимации
        }
    }, [animationClass]);

    if (!mainImage) {
        return <div>Loading main image...</div>;
    }

    return (
        <div>
            <div className={styles.imageContainer}>
                <img
                    className={`${styles.eventImage} ${animationClass}`}
                    src={`${baseUrl}${mainImage.src}`}
                    alt="Main Event Image"
                    key={mainImage.src}
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
                {images? images.map((image, index) => (
                    <img
                        className={styles.imageItem}
                        src={`${baseUrl}${image.src}`}
                        alt="Event Images"
                        key={index}
                        onClick={() => handleImageClick(image)}
                        onDoubleClick={() => handleImageClick(image)}
                    />
                )): null}
            </div>
        </div>
    );
}

export default ImagesScrollBarPicker;