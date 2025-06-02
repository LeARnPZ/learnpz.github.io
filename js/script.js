const hamburger = document.querySelector('.nav-hamburger');
const linksContainer = document.querySelector('.nav-menu');
const links = document.querySelectorAll('.nav-menu-link');
const pageTitle = document.querySelector('.logo-text');

const scheduleContainer = document.querySelector('.schedule-cards');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const navBar = document.querySelector('.nav');



hamburger.addEventListener('click', (e) => {
	e.preventDefault();
	linksContainer.classList.toggle('active');
	hamburger.classList.toggle('active');
});

function removeActiveClass() {
	linksContainer.classList.remove('active');
	hamburger.classList.remove('active');
}

function closeMenu() {
	links.forEach((link) => {
		link.addEventListener('click', removeActiveClass);
	});

	pageTitle.addEventListener('click', removeActiveClass);
}

window.addEventListener('resize', () => {
	if (window.matchMedia('(max-width: 1100px)').matches) {
		closeMenu();
	}
});

if (window.matchMedia('(max-width:1245px)').matches) {
	closeMenu();
}

function getThresholdFromCSS() {
	return parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			'--scroll-threshold'
		)
	);
}

window.addEventListener('scroll', () => {
	const scrollPosition = window.scrollY;
	const getThreshold = getThresholdFromCSS();
	const screenWidth = window.innerWidth;

	if (screenWidth > 576) {
		if (scrollPosition > getThreshold) {
			navBar.style.backgroundColor = 'rgba(18,22,43)';
		} else {
			navBar.style.backgroundColor = 'transparent';
		}
	} else {
		navBar.style.backgroundColor = 'rgba(18,22,43)';
	}
});

let scrollAmount = 0;

function scrollNext() {
	const card = document.querySelector('.card');
	const computedStyle = window.getComputedStyle(card);

	const marginLeft = parseFloat(computedStyle.marginLeft);
	const marginRight = parseFloat(computedStyle.marginRight);

	let cardWidth = card.clientWidth + marginLeft + marginRight;

	if (
		scrollAmount >=
		scheduleContainer.scrollWidth - scheduleContainer.clientWidth
	) {
		scrollAmount = 0;
	} else {
		scrollAmount += cardWidth;
	}

	scheduleContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}

function scrollPrev() {
	const card = document.querySelector('.card');
	const computedStyle = window.getComputedStyle(card);

	const marginLeft = parseFloat(computedStyle.marginLeft);
	const marginRight = parseFloat(computedStyle.marginRight);

	let cardWidth = card.clientWidth + marginLeft + marginRight;

	if (scrollAmount <= 0) {
		scrollAmount =
			scheduleContainer.scrollWidth - scheduleContainer.clientWidth;
	} else {
		scrollAmount -= cardWidth;
	}

	scheduleContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}

prevButton.addEventListener('click', scrollPrev);
nextButton.addEventListener('click', scrollNext);

const meetingTableButton = document.getElementById('expandButton');
const tableRows = document.querySelectorAll('.meetings-table tr');
const chevronDown = document.querySelector('.chevron-down-icon');
const chevronUp = document.querySelector('.chevron-up-icon');

let isExpanded = true;

function expandMeetingsSection() {
	for (let i = tableRows.length - 1; i >= tableRows.length - 14; i--) {
		tableRows[i].style.display = 'table-row';
	}
	chevronDown.style.display = 'none';
	chevronUp.style.display = 'block';
	
}

function collapseMeetingSection() {
	for (let i = tableRows.length - 1; i >= tableRows.length - 14; i--) {
		tableRows[i].style.display = 'none';
	}
	chevronDown.style.display = 'block';
	chevronUp.style.display = 'none';
}

meetingTableButton.addEventListener('click', () => {
	isExpanded = !isExpanded;
	if (isExpanded) {
		collapseMeetingSection();
	} else {
		expandMeetingsSection();
	}
});

