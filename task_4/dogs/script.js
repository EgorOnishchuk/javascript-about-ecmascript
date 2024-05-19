/**
 * Приостанавливает выполнение программного кода асинхронной функции или метода, в которой вызван, на заданное время.
 * Если вызван за пределами такой функции или метода, приостаналивает только своё выполнение.
 * @param milliseconds Время задержки, миллисекунд.
 * @returns {Promise} Техническое обещание, необходимое для задержки кода.
 */
const setDelay = (milliseconds) =>
	new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * Запрашивает изображения собак по API Dog CEO.
 * @param count {number} Количество изображений, не более 50.
 * @returns {[] | null} Гиперссылки на изображения собак, если ответ от сервера получен успешно, иначе — null.
 */
const getDogs = async (count) => {
	try {
		const response = await axios.get(
			`https://dog.ceo/api/breeds/image/random/${count}`
		);
		return response.data.message;
	} catch {
		return null;
	}
};

/**
 * Создаёт список изображений собак внутри HTML блока с задержкой.
 * @param api Функция или метод, возвращающая перебираемую структуру гиперссылок изображений собак.
 * @param container Базовый блок.
 * @param delay Задержка отрисовки, миллисекунд.
 * @param arguments Аргументы, передаваемые в api.
 */
const createDogsList = async (api, container, delay, ...arguments) => {
	const dogs = await api(...arguments);
	if (dogs) {
		container.insertAdjacentHTML(
			'beforebegin',
			`
			<h1 class="h2 text-center">Собаки</h1>
			`
		);
		for (let dog of dogs) {
			container.insertAdjacentHTML(
				'beforeend',
				`
				<div class="col">
					<div class="card justify-content-center align-items-center h-100">
						<img src="${dog}" alt="Собака" class="w-100 h-100 rounded">
					</div>
				</div>
				`
			);
			await setDelay(delay);
		}
	} else {
		container.insertAdjacentHTML(
			'beforebegin',
			`
			<h1 class="h2 text-center">Не удалось получить изображения собак</h1>
			`
		);
	}
};

createDogsList(getDogs, document.querySelector('div.row'), 3000, 10);
