/*
	1. Дан массив const arr = [1, 5, 7, 9] с помощью Math.min и spread оператора, найти минимальное число в массиве,
	решение задания должно состоять из одной строки.
 */

/**
 * Определяет минимальное число массива.
 * @param {Array[number]} array Массив.
 * @returns {number} Минимальное число.
 */
const getMinimalNumber = (array) => Math.min(...array);

console.log(getMinimalNumber([1, 5, 7, 9]));

/*
	2. Напишите функцию createCounter, которая создает счетчик и возвращает объект с двумя методами: increment и
	decrement. Метод increment должен увеличивать значение счетчика на 1, а метод decrement должен уменьшать значение
	счетчика на 1. Значение счетчика должно быть доступно только через методы объекта, а не напрямую.
 */

/**
 * Создаёт экземпляр счётчика, имеющего функциональность инкрементации, декрементации и возврата числа value.
 * @param {number | bigint} value Первоначальное значение, замыкаемое в функции.
 * @returns {*|{decrement(): void, increment(): void, getCount(): number | bigint}} Счётчик в виде объекта.
 */
const createCounter = (value) => {
	let count = value;
	return {
		getCount() {
			return count;
		},
		increment() {
			count++;
		},
		decrement() {
			count--;
		},
	};
};

const counter = createCounter(3);
console.log(counter.getCount());
counter.increment();
console.log(counter.getCount());
counter.decrement();
console.log(counter.getCount());

/*
	3. Напишите рекурсивную функцию findElementByClass, которая принимает корневой элемент дерева DOM и название класса
	в качестве аргументов и возвращает первый найденный элемент с указанным классом в этом дереве.
 */

/**
 * Находит первый HTML элемент с классом targetClass, обходя DOM дерево с корнем root в глубину.
 * @param {HTMLElement} root Корень.
 * @param {string} targetClass Искомый класс.
 * @returns {HTMLElement | null} Первый элемент с искомым классом, если он существует, и null — если не существует.
 */
const findElement = (root, targetClass) => {
	if (root.classList.contains(targetClass)) {
		return root;
	}
	for (let child of [...root.children]) {
		const current_root = findElement(child, targetClass);
		if (current_root) {
			return current_root;
		}
	}
	return null;
};

console.log(findElement(document.body, 'product__price_highlighted'));
