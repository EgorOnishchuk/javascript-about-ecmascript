/**
 * Запрашивает псевдопользователей по API JSONPlaceholder.
 * @returns {[Object] | null} Псеводопользователи-объекты, если ответ от сервера получен успешно, иначе — null.
 */
const getUsers = async () => {
	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);
		return response.data;
	} catch {
		return null;
	}
};

/**
 * Создаёт список карточек пользователей внутри HTML блока.
 * @param api {Function} Функция или метод, возвращающий перебираемую структуру объектов-пользователей.
 * @param container {HTMLElement} Базовый блок.
 */
const createUsersList = async (api, container) => {
	const users = await api();
	if (users) {
		container.insertAdjacentHTML(
			'beforebegin',
			`
			<h1 class="h2 text-center">Пользователи</h1>
			`
		);
		for (let user of users) {
			container.insertAdjacentHTML(
				'beforeend',
				`
				<div class="col">
					<div class="card text-center h-100">
  						<div class="card-header d-flex">
							<span>${user.id}</span>
							<i class="bi bi-x-lg d-block ms-auto" role="button"></i>
						</div>
  						<div class="card-body">
  							<h2 class="h3 card-title">${user.username},
  								<a href="http://${user.website}">${user.website}</a>
  							</h2>
  							<p class="card-text">Настоящее имя: ${user.name}.<br> Живет по&nbsp;адресу
							${user.address.street}, ${user.address.suite}, ${user.address.city} (почтовый индекс
							${user.address.zipcode}, координаты ${user.address.geo.lat} ш.,
							${user.address.geo.lng} д.).<br> Работает в ${user.company.name},
							${user.company.catchPhrase}&nbsp;&mdash; ${user.company.bs}.</p>
  						</div>
  						<div class="card-footer d-flex justify-content-between">
  							<span>Электронная почта:
  								<a href="mailto:${user.email}">${user.email}</a>
  							</span>
  							<span>Телефон:
  								<a href="tel:${user.phone}">${user.phone}</a>
  							</span>
						</div>
  					</div>
  				</div>
				`
			);
		}
		for (let card of document.querySelectorAll('div.card')) {
			card.addEventListener('click', (event) => {
				if (event.target.classList.contains('bi-x-lg')) {
					event.currentTarget.remove();
				}
			});
		}
	} else {
		container.insertAdjacentHTML(
			'beforebegin',
			`
			<h1 class="h2 text-center">Не удалось получить информацию о пользователях</h1>
			`
		);
	}
};

createUsersList(getUsers, document.querySelector('div.row'));
