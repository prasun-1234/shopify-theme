const accSection = document.querySelector('.accordion-items');

if (accSection) {
    const accordionToggle = (section) => {
        let accordionItems = section.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            item.querySelector('.accordion-heading').addEventListener('click', () => {
                accordionItems.forEach(item => {
                    item.classList.remove('active');
                })
                item.classList.add('active');
            });
        });
    }
    accordionToggle(accSection)
}