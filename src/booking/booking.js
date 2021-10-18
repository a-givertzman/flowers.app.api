import { renderModalAfterAuth } from "../auth";
import { closeModalWindow, createModalWindow, declOfHours } from "../ui-util";

//
export const bookingStatus = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтвежден',
    declined: 'Declined',
    inOperation: 'В работе',
    canceledByUser: 'Отменен пользователем',
    canceledByAdmin: 'Отменен исполнителем',
    finished: 'Выполнен',
}

//
export class Booking {
    static firabaseRealTimeDataBase = 'https://anna-booking-page-default-rtdb.firebaseio.com/bookings.json';
    
    //
    static create(booking, token, user) {
        return fetch(Booking.firabaseRealTimeDataBase + `?auth=${token}`, {
            method: 'POST',
            body: JSON.stringify(booking),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                booking.id = response.name;
                return booking;
            })
            // .then((booking) => addToLocalStorage(booking))
            .then(Booking.renderList(Booking.getBookingFrtomRemoteStorage(token, user)));
    }

    //
    static renderList(bookings) {

        console.log('[renderList] bookings: ', bookings);
        console.log('[renderList] bookings.length: ', bookings.length);
        const html = (typeof bookings == 'string')
            ? '<div class="mui--text-headline">Вы не авторизованы</div>'
            : bookings.length
                ? bookings.map((booking) => toBookingCard(booking)).join('')
                : '<div class="mui--text-headline">Пока броней нет</div>';

        const list = document.querySelector('#booking-list');

        // console.log('[renderList] html: ', html);
        list.innerHTML = html;

        [...document.getElementsByClassName("collapsible")].forEach(collapsedItem => {
            collapsedItem.addEventListener("click", (event) => {
                event.target.classList.toggle("active");
                var content = event.target.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        });
    }

    //
    static getBookingFrtomRemoteStorage(idToken, user) {
        if (!idToken) {
            console.log('[getBookingFrtomRemoteStorage] Нет токена: ', idToken);
            return Promise.resolve(`<p class="error">Вы не авторизованы</p>`)
        } else {
            let queryParams = user
                ? `&orderBy="user"&equalTo="${user}"&print=pretty`
                : `&orderBy="user"&print=pretty`;

            console.log('[getBookingFrtomRemoteStorage] user: ', user);
            return fetch(Booking.firabaseRealTimeDataBase + `?auth=${idToken}${queryParams}`)
                .then((response) => response.json())
                .then((bookings) => {
                    if (bookings && bookings.error) {
                        return `<p class="error">Ошибка при получении данных (${bookings.error})</p>`;
                    }
                    console.log('[getBookingFrtomRemoteStorage] bookings: ', bookings);
                    return bookings 
                        ? Object.values(bookings) 
                        : [];
                });
        }
    }

    // static getBookingFrtomLocalStorage() {
    //     // if local storage returns an array then we get it
    //     // if local storage returns null then we will get [] - empty array
    //     return JSON.parse(localStorage.getItem('bookings') || '[]');
    // }
}

//
function addToLocalStorage(booking) {
    let bookings = Booking.getBookingFrtomLocalStorage();
    bookings.push(booking);
    localStorage.setItem(
        'bookings', 
        JSON.stringify(bookings)
    );
}

//
export function renderBookings(token, user) {
    console.log('[renderBookings] user: ', user);
    Booking.getBookingFrtomRemoteStorage(token, user)
        .then((content) => {
            if (typeof content == 'string') {   // error message
                createModalWindow(
                    'Вы не авторизованы', 
                    renderModalAfterAuth(content),
                    'modal-window',
                );
            } else {                            // bookings arraye
                console.log('[renderBookings] bookings: ', content);
                closeModalWindow();
                Booking.renderList(content);
            }
        });
}

//
function toBookingCard(booking) {
    let dateStart = new Date(booking.date);
    let dateEnd = new Date(booking.date);
    dateEnd.setHours(dateStart.getHours() + parseInt(booking.dauration));
    let bookingUser = `<div class="mui--text-subhead">${booking.user}</div>`;
    return `
        <div class="mui--text-headline">${dateStart.toLocaleDateString()}</div>
        <div class="mui--text-title">
            ${dateStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            -
            ${dateEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            (${booking.dauration} ${declOfHours(booking.dauration)})
        </div>
        <div class="mui--text-subhead"><a href="#">${booking.address}</a></div>
        <div class="mui--text-subhead">${booking.workDescription}</div>
        <div class="mui--text-subhead">${booking.status}</div>
        ${bookingUser}
        <div class="mui--text-subhead">${toCommentCard(booking.comments)}</div>
        <br>
    `
}

//
function toCommentCard(comments) {
    if (comments && comments.length) {
        console.log('[toCommentCard] comments: ', comments);
        return `
            <button type="button" class="collapsible">Комментарии к брони</button>
            <div class="collapsible-content">
                ${comments.map(comment => `<p>${comment}</p>`).join('')}
            </div>
        `
    } else {
        return '<button type="button" class="collapsible-empty">Комментариев нет</button>';
    }
}