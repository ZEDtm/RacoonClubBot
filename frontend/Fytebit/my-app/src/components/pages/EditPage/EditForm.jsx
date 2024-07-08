import React from "react"
import classes from "./EditForm.module.css"
import DateInput from "../../ui/inputs/DateInput/DateInput"
import TimeInput from "../../ui/inputs/TimeInput/TimeInput"
import FileInput from "../../ui/inputs/FileInput/FileInput"
import ServiceInput from "../../ui/inputs/ServiceInput/ServiceInput"


function EditForm(props) {
    const [file, setFile] = React.useState(null)
    const [name, setName] = React.useState(null)
    const [description, setDescription] = React.useState(null)
    const [link, setLink] = React.useState(null)
    const [price, setPrice] = React.useState(null)
    const [author, setAuthor] = React.useState(null)

    function addService(event) {

    }

    return(
        <div className={classes.editForm}>
            <form>
                <div className={classes.photo}>
                    <div className={classes.img}></div>
                    <FileInput file={file} setFile={setFile}/>
                </div>
                <div className={classes.eventDatetime}>
                    <div className={classes.eventStart}>
                        <p>Начало мероприятия</p>
                        <div className={classes.datetimeInputs}>
                            <DateInput /><TimeInput/>
                        </div>
                    </div>
                    <div className={classes.eventEnd}>
                        <p>Конец мероприятия</p>
                        <div className={classes.datetimeInputs}>
                            <DateInput /><TimeInput/>
                        </div>
                    </div>
                </div>
                    <div className={classes.eventName}>
                        <p>Название мероприятия</p>
                        <input type="text" value={name} onInput={event => setName(event.target.value)}/>
                    </div>
                    <div className={classes.eventDescription}>
                        <p>Описание мероприятия</p>
                        <textarea className={classes.eventDescriptionArea} onInput={event => setDescription(event.target.value)}></textarea>
                    </div>
                    <div className={classes.eventLink}>
                        <p>Ссылка</p>
                        <input type="text" value={link} onInput={event => setLink(event.target.value)}/>
                    </div>
                    <div className={classes.services}>
                        <div className={classes.serviceItem}>
                            <p>Добавить услугу</p>
                            <ServiceInput/>
                        </div>
                        <button className={classes.addServiceButton} onClick={addService}>Добавить</button>
                    </div>
                    <div className={classes.bottom}>
                        <div className={classes.price}>
                            <p>Цена</p>
                            <input type="text" value={price} onInput={event => setName(event.target.value)}/>
                        </div>
                        <div className={classes.author}>
                            <p>Автор</p>
                            <input type="text" value={author} onInput={event => setAuthor(event.target.value)}/>
                        </div>
                    </div>
                        <div className={classes.buttons}>
                            <button className={classes.buttonSubmit} type="button">Применить</button>
                            <button className={classes.buttonReset} type="reset">Отмена</button>
                        </div>
            </form>
        </div>
    )
}

export default EditForm