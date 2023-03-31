const noteArea = document.querySelector('.note-eria');
const notetext = document.querySelector('#note-text');
const title = document.querySelector('.title');
const notes = document.querySelector('.notes');
const note = document.querySelector('.note');

const hidenarea = () => {
  notetext.style = 'display:none';
  noteArea.classList.remove('note-now');
};

const getnotefromthelocalstroge = () => {
  let oldnote;
  if (localStorage.getItem('notes') === null) {
    oldnote = [];
  } else {
    oldnote = JSON.parse(localStorage.getItem('notes'));
  }
  oldnote.forEach((note) => {
    // console.log(note);
    notes.innerHTML += `<div class="note">
          <h3 class="title-text" id="title-text">${note[0]}</h3>
          <p class="note-blog">
           ${note[1]}
          </p>
          <i class="fa fa-trash"></i>
        </div>`;
  });
};
const deletethelocalstorege = (deletenote) => {
  let oldnote;
  if (localStorage.getItem('notes') === null) {
    oldnote = [];
  } else {
    oldnote = JSON.parse(localStorage.getItem('notes'));
  }
  oldnote.forEach((note, index) => {
    if (
      note[0] == deletenote.children[0].textcontent.trim() &&
      note[1] == deletenote.children[1].textcontent.trim()
    ) {
      console.log('yees');
    }
  });
};
document.addEventListener('DOMContentLoaded', getnotefromthelocalstroge);

const shownoteArea = () => {
  notetext.style = 'display:block';

  noteArea.classList.add('note-now');
  title.setAttribute('placeholder');
  title.style = 'font-size:20px  ';
};
const addnote = (t, n) => {
  notes.innerHTML += `
    <div class="note">
      <h3 class="title-text" id="title-text">${t}</h3>
      <p class="note-blog">
       ${n}
      </p>
      <i class="fa fa-trash"></i>
    </div>`;
  title.value = '';
  notetext.value = '';
};

const addnotetolocalstroge = (note) => {
  if (note.length < 0) {
    return;
  }
  console.log(note);
  let oldnote;
  if (localStorage.getItem('notes') === null) {
    oldnote = [];
  } else {
    oldnote = JSON.parse(localStorage.getItem('notes'));
  }
  oldnote.push(note);

  localStorage.setItem('notes', JSON.stringify(oldnote));
};

noteArea.addEventListener('click', shownoteArea);
document.addEventListener('click', (event) => {
  let isclicked = noteArea.contains(event.target);
  if (!isclicked) {
    hidenarea();
    if (title.value.length === 0 && notetext.value.length === 0) {
      return;
    } else {
      addnotetolocalstroge([title.value, notetext.value]);
      addnote(title.value, notetext.value);
    }
  }
});
document.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('note')) {
    event.target.querySelector('i').classList.add('show');
  }
});

document.addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('note')) {
    event.target.querySelector('i').classList.remove('show');
  }
});
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash')) {
    event.target.parentElement.remove();
    deletethelocalstorege(event.target.parentElement);
  }
});
