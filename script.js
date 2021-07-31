const addButton = document.querySelector('#add')

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea')
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
        // console.log(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes))

}


const addNewNode = (text = '') => {

    const note = document.createElement('div')
    note.classList.add('note')

    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class=" ${text ? "hidden" : ""}" name="" id="" cols="30" rows="10"></textarea>`;


    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    //gettin the reffernces
    const editButton = note.querySelector('.edit')
    const delButton = note.querySelector('.delete')
    const mainDiv = note.querySelector('.main')
    const textArea = note.querySelector('textarea')


    //deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })


    //toggle using editButton

    textArea.value = text;
    mainDiv.innerHTML = text

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden')
    })


    textArea.addEventListener('change', (event) => {
        const value = event.target.value
        // console.log(value);
        mainDiv.innerHTML = value


        updateLSData();
    })


    //it will add the node as the last child 
    document.body.appendChild(note);



}


//getting back data from local storage
const notes = JSON.parse(localStorage.getItem('notes'))


if (notes){
    notes.forEach((note) => {
        addNewNode(note)

    })
}
addButton.addEventListener('click', () => {
        addNewNode();
    })

