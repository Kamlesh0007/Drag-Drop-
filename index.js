const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const container = document.querySelector('.container');
const resetButton = document.getElementById('reset-button');

// Add event listeners to each container for drag over, enter, and leave,etc
container1.addEventListener('dragstart', dragStart);
container2.addEventListener('dragover', dragOver);
container2.addEventListener('dragenter', dragEnter);
container2.addEventListener('dragleave', dragLeave);
container2.addEventListener('drop', drop);

// Reset button click event handler
resetButton.addEventListener('click', resetContainers);
resetButton.disabled=true; 

// Store the initial items of the source container
const sourceContainerItems = Array.from(container1.querySelectorAll('.item'));

let draggedItem = null;

// Add dragstart event listeners to items
function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', draggedItem.innerHTML);
}

// Add dragover event listeners to containers
function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

// Function triggered when dragging item enters a container
function dragEnter(event) {
  event.preventDefault();
  event.target.classList.add('drag-over'); // add dragover class to  target container
}

// Function triggered when dragging item leaves a container
function dragLeave(event) {
  event.preventDefault();
  event.target.classList.remove('drag-over'); // remove dragover class from target container
}

// Function triggered when dragging item is dropped into a target container
function drop(event) {
  event.preventDefault();
  resetButton.disabled=false;
  const data = event.dataTransfer.getData('text/html');

  // Create a new item div
  const newItemDiv = document.createElement('div');
  newItemDiv.classList.add('item');
  newItemDiv.innerHTML = data;

  // Create a new item container
  const newItemContainer = document.createElement('div');
  newItemContainer.classList.add('item-container');
  newItemContainer.appendChild(newItemDiv);
  newItemContainer.style.width = '90%';

  // Append the new item container to the target container
  event.target.appendChild(newItemContainer);

  draggedItem.classList.remove('dragging');
  event.target.classList.remove('drag-over');
  event.target.classList.add('success');
  // Add shake effect to container2
  container2.classList.add('shake');
  // Remove shake effect after the animation ends
  container2.addEventListener('animationend', removeShakeEffect);

  displaySuccessMessage();
  draggedItem.parentNode.removeChild(draggedItem); //remove the item from source container

}

//function to remove shakeeffect
function removeShakeEffect() {
    container2.classList.remove('shake');
  }
  
// Display success message when an item is dropped 
function displaySuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerText = 'Item dropped successfully!';
  
    container.appendChild(successMessage);
  
    // Hide the success message after 1 second
    setTimeout(() => {
        successMessage.style.display = 'none';
      }, 2000);

    setTimeout(() => {
      container2.classList.remove('success'); 
    }, 1000);
    
  }
  
// Reset function
function resetContainers() {
    // Clear container2 items
  container2.innerHTML = '';
    // Reset container1 with the initial items
    container1.innerHTML = '';
    sourceContainerItems.forEach(item => container1.appendChild(item));
    resetButton.disabled=true;

}
