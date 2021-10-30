import { defaultFunction, itemToArray } from './common.helper.js';

class JS_Selector {
	constructor(what, selectorSource) {
		selectorSource = selectorSource || document;
		const item = typeof(what) === 'string' 
						? Array.from(selectorSource.querySelectorAll(what))
						: what;

		this.item = item.length === 1 ? item[0] : item;
		this.itemsArray = itemToArray(this.item);
	}

	get length() {
		return this.itemsArray.length;
	}

	get node() {
		return this.item;
	}

	get nodes() {
		return this.itemsArray;
	}

	get isJS_Selector() {
		return true;
	}

	addClass(className) {
		className = className.split(' ');
		this.each((item) => {
			for (let i = 0, len = className.length; i < len; i++) {
				item.classList.add(className[i]);
			}
		});
	}

	append(what) {
		if (what.isJS_Selector) {
			what.each((item) => {
				let elementsCopy = item.cloneNode(true);
				this.itemsArray[0].append(elementsCopy);
			});
		} else {
			this.itemsArray[0].append(what);
		}
	}

	class(className) {
		this.addClass(className);
	}

	each(f) {
		f = f || defaultFunction;
		for (let i = 0, len = this.itemsArray.length; i < len; i++) {
			f(this.itemsArray[i], i);
		}
	}

	find(what) {
		if (!what) return null;
		let elementsArray = [];
		this.each((item) => {
			let foundItems = new JS_Selector(what, item);
			foundItems = itemToArray(foundItems);
			elementsArray = [...elementsArray, ...foundItems];
		});

		return elementsArray.length === 0 
					? null
					: elementsArray.length === 1
						? elementsArray[0]
						: elementsArray;
	}

	hasClass(className) {
		return this.itemsArray[0].classList.contains(className);
	}

	hide() {
		this.each((item) => {
			item.style.display = 'none';
		});
	}

	html(content) {
		if (content === undefined) {
			return this.itemsArray[0].innerHTML;
		} else {
			this.each((item) => {
				item.innerHTML = content;
			});
			return true;
		}
	}

	nthParent(n) {
		let nodeToReturn = new JS_Selector(this.item);
		for (let i = 0; i < n; i++) {
			nodeToReturn = nodeToReturn.parent();
		}

		return nodeToReturn;
	}

	on(action, f) {
		action = action || 'click';
		f = f || defaultFunction;
		this.each((item) => {
			item.addEventListener(action, e => f(e))
		});
	}

	parent() {
		if (!Array.isArray(this.item) && this.item !== document) {
			return new JS_Selector(this.item.parentNode);
		}

		return null;
	}

	prepend(what) {
		if (what.isJS_Selector) {
			what.each((item) => {
				let elementsCopy = item.cloneNode(true);
				this.itemsArray[0].prepend(elementsCopy);
			});
		} else {
			this.itemsArray[0].prepend(what);
		}
	}

	removeClass(className) {
		className = className.split(' ');
		this.each((item) => {
			for (let i = 0, len = className.length; i < len; i++) {
				item.classList.remove(className[i]);
			}
		});
	}

	show() {
		this.each((item) => {
			item.style.display = 'block';
		});
	}

	text(content) {
		if (content === undefined) {
			let contentToReturn = '';
			this.each((item) => {
				contentToReturn += item.textContent;
			});
			return contentToReturn;
		} else {
			this.each((item) => {
				item.textContent = content;
			});
			return true;
		}
	}

	toggle(className) {
		className = className.split(' ');
		this.each((item) => {
			for (let i = 0, len = className.length; i < len; i++) {
				item.classList.toggle(className[i]);
			}
		});
	}
}

export const $ = (what) => new JS_Selector(what);