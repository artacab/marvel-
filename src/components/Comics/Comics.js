import { API_URL, URL_COMICS, URL_CHARACTERS, IMG_STANDARD_XLARGE, IMG_NOT_AVAILABLE } from '../../constants/api';
import { getDataApi } from '../../utils/getDataApi';
import { ROOT_INDEX } from '../../constants/root';
import Error from '../../components/Error/Error'
import Characters from '../../components/Characters/Characters.js'
import classes from './Comics.css';

class Comics {
    renderComics(data) {
        let htmlContent = '';

        data.forEach(({ id, title, thumbnail: { path, extension } }) => {
            
            if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
                const uri = API_URL + URL_COMICS + '/' + id + '/' + URL_CHARACTERS;
                const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;

                htmlContent += `
                    <li class="comics__item ${classes.comics__item}" data-uri="${uri}">
                        <span class="${classes.comics__name}">${title}</span>
                        <img class="${classes.comics__img}" src="${imgSrc}" />
                    </li>
                `;
            }
        });

        const htmlWrapper = `
            <ul class="${classes.comics__container}">
                ${htmlContent}
            </ul>
        `;
    
        ROOT_INDEX.innerHTML = htmlWrapper;
    }

    async render() {
        
        const data = await getDataApi.getData(API_URL + URL_COMICS);
        data ? this.renderComics(data) : Error.render()
    }

    eventListener() {
        document.querySelectorAll('.comics__item').forEach(element => {
            const uri = element.getAttribute('data-uri');

            element.addEventListener('click', () => {
                console.log(uri)
                Characters.render(uri)
            })
        })
    }
}

export default new Comics();