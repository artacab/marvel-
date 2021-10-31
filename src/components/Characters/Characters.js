import classes from './Characters.css'
import { getDataApi } from '../../utils/getDataApi';
import { IMG_STANDARD_XLARGE } from '../../constants/api';
import { ROOT_MODAL } from '../../constants/root';
import imgClose from './img/close.svg'

class Characters {
    
    renderContent(data) {
        console.log(imgClose)
        let htmlContent = ''
        data.forEach(({name, thumbnail: {path, extension}}) => {
            const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;
            htmlContent += `
                <li class="${classes.characters__item}">
                    <img class="img-cover ${classes.characters__img}" src="${imgSrc}"/>
                    <span class="${classes.characters__name}">${name}</span>
                </li>
            `
        });
        const htmlWrapper = `
        <div class="${classes.wrapper}">
            <ul class="${classes.characters__container}">
                ${htmlContent}
            </ul>
            <button class="btn bg-contain ${classes.characters__close}"
                onClick="modal.innerHTML = ''"
                style="background-image: url(${imgClose})"
            ></button>
        </div>    
        `
        
        ROOT_MODAL.innerHTML = htmlWrapper
    }
    renderNotification() {
        console.log('empty')
    }

    async render(uri) {
        const data = await getDataApi.getData(uri);
        data.length ? this.renderContent(data) : this.renderNotification()
    }
}

export default new Characters()