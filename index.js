const buttons = document.querySelectorAll('.button');
const main = document.querySelector('.main');

const originalWidth = 1920;
const originalHeight = 1080;

function handle(event) {
  const button = event.target.closest('.button');

  if (button && button.classList.contains('button--clicked')) {
    button.classList.remove('button--clicked');
  } else {
    buttons.forEach((b) => {
      if (b.classList.contains('button--clicked'))
        b.classList.remove('button--clicked');
    });

    if (button) {
      button.classList.add('button--clicked');
    }
  }
}

function placeItems() {
  let scaleFactor;

  if ((window.innerWidth / 16) * 9 > window.innerHeight) {
    scaleFactor = window.innerWidth / originalWidth;
  } else {
    scaleFactor = window.innerHeight / originalHeight;
  }

  const maxSize = {
    width: main.getBoundingClientRect().width,
    height: main.getBoundingClientRect().height
  };

  buttons.forEach((button) => {
    if (
      button.dataset.x * scaleFactor > maxSize.width ||
      button.dataset.y * scaleFactor > maxSize.height
    ) {
      button.style.display = 'none';
    } else if (button.style.display === 'none') {
      button.style.display = 'flex';
    }

    button.style.left = button.dataset.x * scaleFactor + 'px';
    button.style.top = button.dataset.y * scaleFactor + 'px';
  });
}

placeItems();

main.addEventListener('click', handle, false);

window.addEventListener('resize', placeItems);
