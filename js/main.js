let menu = document.querySelector('.header__menu')
let burger = document.querySelector('.burger')

burger.addEventListener('click', handleBurger)

function handleBurger(e) {
	let target = e.currentTarget	
	target.classList.toggle('close')
	menu.classList.toggle('active')
}

//slider
let slider = document.querySelector('.slider')
if (slider) {	
	let slidesLength = document.querySelectorAll('.slider__slide').length
	let pagination = document.querySelector('.slider__pagination')
	for (let i = 0; i < slidesLength; i++){
		let div = document.createElement('div')
		div.classList.add('slider__pagination-item')
		div.setAttribute('data-index', i)
		if (i === 0) {
			div.classList.add('current')
		}
		pagination.appendChild(div)
	}
	
	let prev = document.querySelector('.slider__arrow.prev')
	let next = document.querySelector('.slider__arrow.next')
	
	let number, list, styles, gap, perPage, slideW
	
	prev.addEventListener('click', () => {
		next.classList.remove('hidden')
		if (number === 1) {		
			prev.classList.add('hidden')
		}
		if (number === 0) return
		number--
		moveSlides()
		disactivatePaginationItems()
		paginationItems[number].classList.add('current')
	})
	next.addEventListener('click', () => {
		prev.classList.remove('hidden')
		if (slidesLength === number + perPage + 1) {		
			next.classList.add('hidden')
		}
		if (slidesLength === number + perPage) return
		number++
		moveSlides()
		disactivatePaginationItems()
		paginationItems[number].classList.add('current')
	})

	let paginationItems = document.querySelectorAll('.slider__pagination-item')
	paginationItems.forEach(item => {
		item.addEventListener('click', handlePaginationItem)
	})
	
	init()
	
	function init() {
		number = 0
		prev.classList.add('hidden')
		slideW = document.querySelector('.slider__slide').offsetWidth
		list = document.querySelector('.slider__list')
		list.style.transform = "translateX(0)"
		styles = window.getComputedStyle(list)
		gap = parseInt(styles.getPropertyValue('--gap'))
		perPage = parseInt(styles.getPropertyValue('--per-page'))
	}
	function moveSlides() {
		list.style.transform = `translateX(${-number * (slideW + gap)}px)`
	}
	function activateArrows() {
		next.classList.remove('hidden')
		prev.classList.remove('hidden')
	}
	function handlePaginationItem(e) {
		disactivatePaginationItems()
		activateArrows()
		let target = e.currentTarget
		target.classList.add('current')
		let index = parseInt(target.getAttribute('data-index'))
		if (index === 0) {
			prev.classList.add('hidden')
		}
		if (index === slidesLength - 1 || index === slidesLength - 2) {
			next.classList.add('hidden')
		}
		if (window.innerWidth > 1200) {			
			if (index === slidesLength - 1) {			
				list.style.transform = `translateX(${-(index - 1) * (slideW + gap)}px)`
				return
			}
		}
		list.style.transform = `translateX(${-index * (slideW + gap)}px)`
	}
	function disactivatePaginationItems() {
		paginationItems.forEach(item => item.classList.remove('current'))
	}
	
	window.addEventListener('resize', () => {
		init()
	})
}