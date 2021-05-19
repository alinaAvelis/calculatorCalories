
window.addEventListener('DOMContentLoaded', function() {
    function culc(resultSelector, genderItem, ratioClass, classActive) {
        //calc
    
        const result = document.querySelector(resultSelector);
    
        let sex, height, weight, age, ratio;
        
        if(localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        //функция определения данных локального хранилица
    
        function initLocalStorage(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
    
                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocalStorage(genderItem, classActive);
    
        initLocalStorage(ratioClass, classActive);
    
        //функция подсчетов
    
        function calcTotal() {
            //запускаем только в случае, если заполнены все данные
            if(!sex || !height || !weight || !age || !ratio) {
                result.textContent = '____';
                return; //прием, чтобы прервать функцию досрочно
            }
    
            if(sex === 'female'){
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        //функции получения значений с элементов
        //получение данных со статического контента
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(`${selector}`);
    
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if(e.target.getAttribute('data-ratio')){
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass); //удаляем класс активности у всех элементов
                    });
        
                    e.target.classList.add(activeClass); //назначаем класс активности тому элементу, по которому кликнули.
        
                    calcTotal();
                });
            });
        }
    
        getStaticInformation(genderItem, classActive);
    
        getStaticInformation(ratioClass, classActive);
    
        //получение данных из инпута
    
        function getDinamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
    
                if(input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
    
                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }   
                calcTotal();        
            });
 
        }
    
        getDinamicInformation('#height');
        getDinamicInformation('#weight');
        getDinamicInformation('#age');
    }

    culc('.calculating__result_number','.gender__item', '.ratio', 'calculating__choose-item_active');
});