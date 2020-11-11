(()=>{"use strict";(()=>{const e={PALACE:"palace",FLAT:"flat",HOUSE:"house",BUNGALOW:"bungalow"},t={[e.FLAT]:1e3,[e.BUNGALOW]:0,[e.HOUSE]:5e3,[e.PALACE]:1e4},o={[e.FLAT]:"Квартира",[e.BUNGALOW]:"Бунгало",[e.HOUSE]:"Дом",[e.PALACE]:"Дворец"},n={[e.FLAT]:"квартиры",[e.HOUSE]:"дома",[e.PALACE]:"дворца"};window.constants={INACTIVE_PIN_WIDTH_HALF:20,INACTIVE_PIN_HEIGHT_HALF:22,PIN_WIDTH_HALF:32,PIN_HEIGHT:40,MIN_TITLE_LENGTH:30,MAX_TITLE_LENGTH:100,MAX_PRICE:1e6,PIN_ITEMS:5,Accommodation:e,MIN_PRICES:t,OFFER_TYPES_TITLES:o,OFFER_TYPES_TITLES_GENITIVE:n,CUSTOM_MESSAGES_ROOMS:{manyPeople:"Число людей не может быть больше количества комнат",fewRooms:"Число комнат не может быть меньше количества людей",nonResidentialRooms:'Вариант "100 комнат" можно выбрать только не для гостей',nonResidentialGuests:'Не для гостей можно выбрать только вариант "100 комнат"'},types:["palace","flat","house","boungalo"],checkTimes:["12:00","13:00","14:00"],features:["wifi","dishwasher","parking","washer","elevator","conditioner"],photos:["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],FILTER_PRICES:{LOW:1e4,MIDDLE:5e4}}})(),(()=>{const e=(e,t)=>{const o=e-.5+Math.random()*(t-e+1);return Math.round(o)},t=t=>e(0,t.length-1);window.utils={getRandomNumber:e,getRandomIndex:t,getRandomItem:e=>e[t(e)],getRandomArray:o=>{const n=[],s=o.slice(),i=e(1,o.length);for(let e=0;e<i;e++){const e=s.splice(t(s),1)[0];n.push(e)}return n},generateIndices:e=>{const t=[];for(let o=0;o<e;o++)t[o]="0"+(o+1);return t},getUniqueEl:t=>t.splice(e(0,t.length-1),1)[0]}})(),window.load={download:(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send(),o.addEventListener("load",(()=>{200===o.status?e(o.response):t("Мы не смогли загрузить похожие объявления, попробуйте еще раз.")}))},upload:(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status?t():o()})),n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(e)}},window.error={errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},uploadErrorHandler:()=>{const e=(()=>{const e=document.querySelector("#error").content,t=document.createDocumentFragment(),o=e.cloneNode(!0);return t.appendChild(o),t})(),t=document.querySelector("main");t.insertBefore(e,window.map.map);const o=t.querySelector(".error"),n=o.querySelector(".error__message"),s=n.querySelector(".error__button"),i=e=>{"Escape"===e.key&&(e.preventDefault(),o.remove(),document.removeEventListener("keydown",i))};document.addEventListener("keydown",i),o.addEventListener("click",(e=>{e.target!==n&&o.remove()})),s.addEventListener("click",(()=>{o.remove()}))}},window.success={uploadSuccessHandler:()=>{const e=(()=>{const e=document.querySelector("#success").content,t=document.createDocumentFragment(),o=e.cloneNode(!0);return t.appendChild(o),t})();document.querySelector("main").insertBefore(e,window.map.map),window.map.deactivateMap(),window.form.clearForm(),window.form.deactivateForm();const t=document.querySelector(".success__message"),o=document.querySelector(".success"),n=e=>{"Escape"===e.key&&(e.preventDefault(),o.remove(),document.removeEventListener("keydown",n))};o.addEventListener("click",(e=>{e.target!==t&&o.remove()})),document.addEventListener("keydown",n)}},(()=>{const e=[],t=window.error.errorHandler;window.data={prepareSimilarObjects:o=>{window.load.download((t=>{t.map((t=>{t.offer&&(t.id=`${t.location.x}${t.location.y}`,e.push(t))})),o()}),t)},similarObjects:e}})(),window.debounce={debounce:e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}}},(()=>{const e=document.querySelector(".map");window.renderObjects={renderSimilarObjects:t=>{const o=e.querySelectorAll(".map__pin--object");o&&o.forEach((e=>e.remove()));const n=document.querySelector(".map__pins"),s=document.querySelector("#pin").content,i=document.createDocumentFragment(),a=Math.min(window.constants.PIN_ITEMS,t.length);for(let e=0;e<a;e++)if(e<=window.constants.PIN_ITEMS){const o=s.cloneNode(!0),n=o.querySelector("button"),a=n.querySelector("img"),r=t[e].location.x+window.constants.PIN_WIDTH_HALF,d=t[e].location.y+window.constants.PIN_HEIGHT;n.style="left: "+r+"px; top: "+d+"px;",n.id=t[e].id,n.classList.add("map__pin--object"),a.src=t[e].author.avatar,a.alt=t[e].offer.title,i.appendChild(o)}n.appendChild(i);const r=e.querySelectorAll(".map__pin--object");for(const e of r)e.addEventListener("click",(()=>{window.popup.popupRenderHandler(e),d(e)})),e.addEventListener("keydown",(t=>{"Enter"===t.key&&window.popup.popupRenderHandler(e)}));const d=t=>{const o=e.querySelector(".map__pin--active");null!==o&&o.classList.remove("map__pin--active"),t.classList.add("map__pin--active")}}}})(),(()=>{const e=document.querySelector(".map"),{FILTER_PRICES:t}=window.constants,{renderSimilarObjects:o}=window.renderObjects,n=e.querySelectorAll(".map__filter"),s=e.querySelector(".map__filters");window.filter={filters:n,filtersForm:s,getFilteredObjects:()=>{const e=window.map.map.querySelector(".map__card");window.map.map.contains(e)&&e.remove(),window.map.map.querySelectorAll(".map__pin--object").forEach((e=>e.remove()));const{similarObjects:i}=window.data;let a=i;for(let e of n){const{selectedIndex:o}=e,n=e.options[o].value;switch(e.id){case"housing-type":o&&(a=a.filter((e=>e.offer.type===n)));break;case"housing-price":if(o)switch(n){case"low":a=a.filter((e=>e.offer.price<t.LOW));break;case"middle":a=a.filter((e=>e.offer.price>t.LOW&&e.offer.price<t.MIDDLE));break;case"high":a=a.filter((e=>e.offer.price>t.MIDDLE))}break;case"housing-rooms":o&&(a=a.filter((e=>e.offer.rooms===Number(n))));break;case"housing-guests":o&&(a=a.filter((e=>e.offer.guests===Number(n))))}}const r=s.querySelectorAll(".map__checkbox"),d=[];for(let e of r)e.checked&&d.push(e.value);if(d.length>0)for(let e=0;e<d.length;e++)a=a.filter((t=>t.offer.features.includes(d[e])));window.debounce.debounce(o)(a)}}})(),(()=>{const e=document.querySelector(".map"),{renderSimilarObjects:t}=window.renderObjects,{filters:o,filtersForm:n,getFilteredObjects:s}=window.filter;o.forEach((e=>{e.setAttribute("disabled","")}));const i=()=>{const e=window.data.similarObjects;t(e),window.form.addressField.value=window.pin.getPinCoords()};window.map={map:e,activateMap:()=>{e.classList.remove("map--faded"),e.classList.add("map--active"),window.data.prepareSimilarObjects(i),o.forEach((e=>{e.removeAttribute("disabled","")})),n.addEventListener("change",s),n.querySelectorAll("input[type=checkbox]").forEach((e=>{e.addEventListener("keydown",(t=>{"Enter"===t.key&&(e.checked?e.removeAttribute("checked","checked"):e.setAttribute("checked","checked"),s())}))}))},deactivateMap:()=>{e.classList.remove("map--active"),e.classList.add("map--faded"),o.forEach((e=>{e.setAttribute("disabled","")})),e.querySelectorAll(".map__pin--object").forEach((e=>e.remove())),window.pin.restorePinCoords()}}})(),(()=>{const{map:e}=window.map,t=e.querySelector(".map__pin--main");window.pin={getPinCoords:()=>{const e=t.offsetLeft,o=t.offsetTop;return window.map.map.classList.contains("map--faded")?`${e+window.constants.INACTIVE_PIN_WIDTH_HALF}, ${o+window.constants.INACTIVE_PIN_HEIGHT_HALF}`:`${t.offsetLeft+window.constants.PIN_WIDTH_HALF}, ${t.offsetTop+window.constants.PIN_HEIGHT}`},restorePinCoords:()=>{t.style.left="570px",t.style.top="375px"},mainPin:t}})(),(()=>{const e=window.pin.mainPin;e.addEventListener("mousedown",(t=>{t.preventDefault();let o={x:t.clientX,y:t.clientY};const n=t=>{t.preventDefault();const n=window.map.map,s=o.x-t.clientX,i=o.y-t.clientY;o={x:t.clientX,y:t.clientY};const a=e.offsetTop+window.constants.PIN_HEIGHT-i;e.style.top=a<130?130-window.constants.PIN_HEIGHT+"px":a>630?630-window.constants.PIN_HEIGHT+"px":e.offsetTop-i+"px";const r=e.offsetLeft+window.constants.PIN_WIDTH_HALF-s;r<0?e.style.left=0-window.constants.PIN_WIDTH_HALF+"px":r>n.clientWidth?e.style.left=n.clientWidth-window.constants.PIN_WIDTH_HALF+"px":e.style.left=e.offsetLeft-s+"px",window.form.addressField.value=window.pin.getPinCoords()},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",s)}))})(),(()=>{const e=t=>{"Escape"===t.key&&t.preventDefault(),window.map.map.querySelector(".map__card").remove(),document.removeEventListener("keydown",e)};window.popup={popupRenderHandler:t=>{const o=window.map.map.querySelector(".map__card");window.map.map.contains(o)&&o.remove();const n=(e=>{const t=document.querySelector("#card").content,o=document.createDocumentFragment(),n=window.data.similarObjects,s=n.findIndex((t=>t.id===e.id)),i=t.cloneNode(!0),a=i.querySelector(".map__card"),r=a.querySelector(".popup__title"),d=a.querySelector(".popup__text--address"),c=a.querySelector(".popup__text--price"),l=a.querySelector(".popup__type"),p=a.querySelector(".popup__text--capacity"),u=a.querySelector(".popup__text--time"),m=a.querySelector(".popup__features"),w=a.querySelector(".popup__description"),_=a.querySelector(".popup__photos"),f=a.querySelector(".popup__avatar");r.textContent=n[s].offer.title,d.textContent=n[s].offer.address,c.innerHTML=n[s].offer.price+"&#x20bd;<span>/ночь</span>",l.textContent=window.constants.OFFER_TYPES_TITLES[n[s].offer.type],p.textContent=n[s].offer.rooms+" комнаты для "+n[s].offer.guests+" гостей",u.textContent="Заезд после "+n[s].offer.checkin+", выезд до "+n[s].offer.checkout;for(const e of window.constants.features)n[s].offer.features.includes(e)||m.querySelector(".popup__feature--"+e).classList.add("visually-hidden");w.textContent=n[s].offer.description;const y=n[s].offer.photos.length;if(y){const e=_.querySelector(".popup__photo");if(e.src=n[s].offer.photos[0],y>1)for(let t=1;t<y;t++){const o=e.cloneNode(!0);o.src=n[s].offer.photos[t],_.appendChild(o)}}else _.classList.add("visually-hidden");return f.src=n[s].author.avatar,o.appendChild(i),o})(t),s=document.querySelector(".map__filters-container");s.parentNode.insertBefore(n,s),window.map.map.querySelector(".popup__close").addEventListener("click",e),document.addEventListener("keydown",e)},popupCloseHandler:e}})(),window.imageUpload={imageUpload:(e,t)=>{const o=e.files[0],n=o.type;if(["png","jpg","jpeg"].some((e=>n.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{t.src=e.result})),e.readAsDataURL(o)}}},(()=>{const e=document.querySelector(".ad-form"),t=Array.from(e.children),o=()=>{t.forEach((e=>{e.setAttribute("disabled","")})),e.classList.contains("ad-form--disabled")||e.classList.add("ad-form--disabled")};o();const n=e.querySelector("#address");n.setAttribute("readonly",""),n.value=window.pin.getPinCoords();const{imageUpload:s}=window.imageUpload,i=e.querySelector(".ad-form-header__input"),a=e.querySelector(".ad-form-header__preview img");i.addEventListener("change",(()=>{s(i,a)}));const r=e.querySelector(".ad-form__upload input[type=file]"),d=e.querySelector(".ad-form__photo"),c=document.createElement("img");r.addEventListener("change",(()=>{c.setAttribute("style","width: 70px; height: 70px;"),d.appendChild(c),s(r,c)}));const l=e.querySelector("#title");l.addEventListener("invalid",(()=>{l.validity.valueMissing&&l.setCustomValidity("Обязательное поле")})),l.addEventListener("input",(()=>{let e=l.value.length;e<window.constants.MIN_TITLE_LENGTH?l.setCustomValidity(`Еще ${window.constants.MIN_TITLE_LENGTH-e} символов`):e===window.constants.MAX_TITLE_LENGTH?l.setCustomValidity("Заголовок должен быть не более 100 символов"):l.setCustomValidity(""),l.reportValidity()}));const p=e.querySelector("#room_number"),u=e.querySelector("#capacity");p.addEventListener("change",(()=>{(()=>{const e=p.selectedIndex,t=u.selectedIndex,o=Number(p.options[e].value),n=Number(u.options[t].value);switch(o){case 1:0===n?p.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests):n>1?p.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.fewRooms):p.setCustomValidity("");break;case 2:0===n?p.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests):n>2?p.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.fewRooms):p.setCustomValidity("");break;case 3:0===n?p.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests):p.setCustomValidity("");break;case 100:n>0?p.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms):p.setCustomValidity("")}p.reportValidity()})()})),u.addEventListener("change",(()=>{(()=>{const e=p.selectedIndex,t=u.selectedIndex,o=Number(p.options[e].value);switch(Number(u.options[t].value)){case 1:100===o?u.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms):u.setCustomValidity("");break;case 2:100===o?u.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms):o<2?u.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.manyPeople):u.setCustomValidity("");break;case 3:100===o?u.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms):o<3?u.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.manyPeople):u.setCustomValidity("");break;case 0:100!==o?u.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests):u.setCustomValidity("")}u.reportValidity()})()}));const m=e.querySelector("#price"),w=e.querySelector("#type");w.addEventListener("change",(()=>{const e=w.value,t=m.value;m.placeholder=window.constants.MIN_PRICES[e],t<window.constants.MIN_PRICES[e]?m.setCustomValidity(`Минимальная стоимость для ${window.constants.OFFER_TYPES_TITLES_GENITIVE[e]} - ${window.constants.MIN_PRICES[e]} руб.`):m.setCustomValidity(""),m.reportValidity()})),m.addEventListener("invalid",(()=>{m.validity.valueMissing&&m.setCustomValidity("Обязательное поле")})),m.addEventListener("input",(()=>{const e=m.value,t=w.value;e>window.constants.MAX_PRICE?m.setCustomValidity(`Максимально допустимая стоимость - ${window.constants.MAX_PRICE} руб.`):e<window.constants.MIN_PRICES[t]?m.setCustomValidity(`Минимальная стоимость для ${window.constants.OFFER_TYPES_TITLES_GENITIVE[t]} - ${window.constants.MIN_PRICES[t]} руб.`):m.setCustomValidity(""),m.reportValidity()}));const _=e.querySelector("#timein"),f=e.querySelector("#timeout");_.addEventListener("change",(()=>{y(_)})),f.addEventListener("change",(()=>{y(f)}));const y=e=>{const t=_.selectedIndex,o=f.selectedIndex;_.options[t].value!==f.options[o].value&&(e!==f?f.selectedIndex=_.selectedIndex:_.selectedIndex=f.selectedIndex)},S=e=>{e.files[0].type.match("image/png")||e.files[0].type.match("image/jpeg")?e.setCustomValidity(""):e.setCustomValidity("Допустимы только изображения с расширениями png, jpeg"),e.reportValidity()},E=e.querySelector("#avatar");E.addEventListener("input",(()=>{S(E)}));const v=e.querySelector("#images");v.addEventListener("input",(()=>{S(v)})),e.addEventListener("submit",(t=>{t.preventDefault(),window.load.upload(new FormData(e),window.success.uploadSuccessHandler,window.error.uploadErrorHandler)}));const I=()=>{e.reset(),d.removeChild(c),a.src="img/muffin-grey.svg",n.setAttribute("value",window.pin.getPinCoords());const t=w.value;m.placeholder=window.constants.MIN_PRICES[t]};e.querySelector(".ad-form__reset").addEventListener("click",(()=>{I()})),window.form={activateForm:()=>{e.classList.remove("ad-form--disabled"),t.forEach((e=>{e.removeAttribute("disabled","")}));const o=w.value;m.placeholder=window.constants.MIN_PRICES[o]},deactivateForm:o,clearForm:I,addressField:n}})(),(()=>{const e=()=>{window.form.activateForm(),window.map.activateMap()};window.pin.mainPin.addEventListener("mousedown",(t=>{0===t.button&&e()})),window.pin.mainPin.addEventListener("keydown",(t=>{"Enter"===t.key&&e()}))})()})();