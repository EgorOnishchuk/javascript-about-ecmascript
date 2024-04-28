'use strict';

/*
	1. Реализуйте объект Book, представляющий книгу, со следующими свойствами и методами:
	Свойство title (название) - строка, название книги.
	Свойство author (автор) - строка, имя автора книги.
	Свойство pages (количество страниц) - число, количество страниц в книге.
	Метод displayInfo() - выводит информацию о книге (название, автор и количество страниц).
 */

/**
 * Книга.
 * @type {{pages: number, author: string, introduce(): string, title: string}}
 */
const book = {
	title: 'Современный учебник JavaScript',
	author: 'Илья Кантор',
	pages: 1500,

	introduce() {
		return `${this.title}, ${this.author}, ${this.pages} с.`;
	},
};

console.log(book.introduce());

/*
	2. Реализуйте класс Student, представляющий студента, со следующими свойствами и методами:
	Свойство name (имя) - строка, имя студента.
	Свойство age (возраст) - число, возраст студента.
	Свойство grade (класс) - строка, класс, в котором учится студент.
	Метод displayInfo() - выводит информацию о студенте (имя, возраст и класс).
 */

/**
 * Ученик.
 */
class Student {
	/**
	 * Создаёт ученика. Если значение какого-либо свойства является недействительным, указывает null.
	 * @param {string | null} name Имя.
	 * @param {number | bigint | null} age Возраст.
	 * @param {string | null} grade Класс, состоящий из номера и литеры.
	 */
	constructor(name, age, grade) {
		/^[\p{L}\s]+$/u.test(name) ? (this.name = name) : (this.name = null);
		isFinite(age) && age >= 0 ? (this.age = age) : (this.age = null);
		if (isFinite(parseInt(grade))) {
			let gradeNumber = parseInt(grade);
			gradeNumber >= 1 && gradeNumber <= 11
				? (this.grade = grade)
				: (this.grade = null);
		} else {
			this.grade = null;
		}
	}

	/**
	 * Формирует базовое представление ученика.
	 * @returns {string}
	 */
	introduce() {
		return `Имя: ${this.name ? this.name : 'Нет данных'}
				Возраст: ${this.age ? this.age : 'Нет данных'}
				Класс: ${this.grade ? this.grade : 'Нет данных'}`;
	}
}

const student = new Student('Иван Иванов', 16, '9А');
console.log(student.introduce());
