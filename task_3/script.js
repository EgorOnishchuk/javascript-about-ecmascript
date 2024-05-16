'use strict';

/*
	1. Реализуйте класс Employee (сотрудник), который имеет следующие свойства и методы:
	Свойство name (имя) - строка, имя сотрудника.
	Метод displayInfo() - выводит информацию о сотруднике (имя).
	
	Реализуйте класс Manager (менеджер), который наследует класс Employee и имеет дополнительное свойство и метод:
	Свойство department (отдел) - строка, отдел, в котором работает менеджер.
	Метод displayInfo() - переопределяет метод displayInfo() родительского класса и выводит информацию о менеджере (имя
	и отдел).
*/

/**
 * Сотрудник.
 */
class Employee {
	/**
	 * Создаёт сотрудника. Вызывает TypeError при недействительных данных.
	 * @param {string} name Имя.
	 */
	constructor(name) {
		if (/^[\p{L}\s]+$/u.test(name)) {
			this._name = name;
		} else {
			throw new TypeError(
				'Имя включает неалфавитные символы или является пустой строкой'
			);
		}
	}

	/**
	 * Формирует характеристику сотрудника.
	 * @returns {string} Имя.
	 */
	getInfo() {
		return this._name;
	}
}

/**
 * Управленец организации.
 */
class Manager extends Employee {
	/**
	 * Создаёт управленца. Вызывает TypeError при недействительных данных.
	 * @param {string} name Имя.
	 * @param {string} department Отдел.
	 */
	constructor(name, department) {
		super(name);
		if (department) {
			this._department = department;
		} else {
			throw new TypeError('Отдел является пустой строкой');
		}
	}

	/**
	 * Формирует характеристику управленца.
	 * @returns {string} Характеристика в виде свойств, разделённых запятой.
	 */
	getInfo() {
		return `${super.getInfo()}, ${this._department}`;
	}
}

console.log(new Employee('Иван').getInfo());
console.log(new Manager('Иван', 'Разработка').getInfo());

/*
	2. Реализуйте класс Order (заказ), который имеет следующие свойства и методы:
	Свойство orderNumber (номер заказа) - число, уникальный номер заказа.
	Свойство products (продукты) - массив, содержащий список продуктов в заказе.
	Метод addProduct(product) - принимает объект product и добавляет его в список продуктов заказа.
	Метод getTotalPrice() - возвращает общую стоимость заказа, основанную на ценах продуктов.
*/

/**
 * Заказ продуктов.
 */
class Order {
	/**
	 * Уникальные номера заказов.
	 * @type {[int | bigint]}
	 * @private
	 */
	static _numbers = [];

	/**
	 * Создаёт заказ и регистрирует его уникальный номер. Вызывает TypeError при недействительных данных.
	 * @param {number | bigint} number Уникальный номер.
	 * @param {[Object]} products Продукты.
	 */
	constructor(number, products) {
		if (Order._numbers.includes(number)) {
			throw TypeError('Номер заказа не уникален');
		} else {
			this._number = number;
			Order._numbers.push(number);
		}
		if (products.length) {
			this._products = products;
		} else {
			throw TypeError('Массив продуктов пуст');
		}
	}

	/**
	 * Добавляет продукт в заказ.
	 * @param {Object} product Продукт.
	 */
	addProduct(product) {
		this._products.push(product);
	}

	/**
	 * Высчитывает общую цену продуктов, пропуская объекты, не имеющие цены.
	 * @returns {int} Общая цена.
	 */
	getTotalPrice() {
		return this._products.reduce((total, product) => {
			if (product.price === undefined) {
				return total;
			}
			return total + product.price;
		}, 0);
	}
}

const order = new Order(12345, [
	{
		name: 'WebStorm',
		price: 10,
	},
	{
		name: 'PyCharm',
		price: 15,
	},
]);
order.addProduct({
	name: 'Figma',
	price: 5,
});
console.log(order.getTotalPrice());

/*
	3. Вам нужно создать класс ZooAnimal, который будет иметь следующие характеристики:
	Приватные поля:
	#name: имя животного (строка).
	#age: возраст животного (число).
	#gender: пол животного (строка).
	
	Публичные методы:
	constructor(name, age, gender): конструктор класса, который инициализирует поля #name, #age и #gender.
	changeName(newName): изменяет имя животного на новое.
	changeAge(newAge): изменяет возраст животного на новый.
	
	Статическое поле:
	MAX_AGE: максимально допустимый возраст для всех создаваемых объектов (число).
*/

/**
 * Животное из зоопарка.
 */
class ZooAnimal {
	/**
	 * Максимальный возраст животного.
	 * @type {number | bigint}
	 * @private
	 */
	static _maxAge = 150;

	/**
	 * Создаёт животное. Вызывает TypeError при недействительных данных.
	 * @param {string} name Имя или кличка.
	 * @param {int | bigint} age Возраст.
	 * @param {string} gender Пол: "Мужской" или "Женский" (без кавычек).
	 */
	constructor(name, age, gender) {
		if (/^[\p{L}\s]+$/u.test(name)) {
			this._name = name;
		} else {
			throw new TypeError(
				'Имя включает неалфавитные символы или является пустой строкой'
			);
		}
		if (age <= ZooAnimal._maxAge) {
			this._age = age;
		} else {
			throw new TypeError('Возраст слишком велик');
		}
		gender = `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`;
		if (['Мужской', 'Женский'].includes(gender)) {
			this._gender = gender;
		} else {
			throw new TypeError('Пол не существует');
		}
	}

	/**
	 * Возвращает имя.
	 * @returns {string}
	 */
	get name() {
		return this._name;
	}

	/**
	 * Устанавливает имя. Вызывает TypeError при недействительном значении.
	 * @param {string} name
	 */
	set name(name) {
		if (/^[\p{L}\s]+$/u.test(name)) {
			this._name = name;
		} else {
			throw new TypeError('Имя включает неалфавитные символы');
		}
	}

	/**
	 * Возвращает возраст.
	 * @returns {int | bigint}
	 */
	get age() {
		return this._age;
	}

	/**
	 * Устанавливает возраст. Вызывает TypeError при недействительном значении.
	 * @param {int | bigint} age
	 */
	set age(age) {
		if (age <= ZooAnimal._maxAge) {
			this._age = age;
		} else {
			throw new TypeError('Возраст слишком велик');
		}
	}
}

const zooAnimal = new ZooAnimal('Барсик', 8, 'Мужской');
zooAnimal.name = 'Пушистик';
zooAnimal.age = 9;
console.log(zooAnimal.name, zooAnimal.age);
