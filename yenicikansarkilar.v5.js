'use strict';

/**
 * A music player ... cause why not.
 * Hotkeys:
 *   a - previous
 *   d / n - next
 *   s / p - play / pause
 *   e / r - repeat
 *   q - shuffle
 *
 * @author Holly Springsteen
 */

const colors = {
  aqua: {
    25: '#eceaf7',
    50: '#fff',
    80: '#fff',
  },
  metal: {
    5: '#F3F3F1',
    20: '#CFD0C8',
    50: '#868975',
    80: '#36372F',
    90: '#272822',
  },
};

// Control button elements
const buttons = {
  shuffle: document.querySelector('#controls .shuffle'),
  previous: document.querySelector('#controls .previous'),
  playPause: document.querySelector('#controls .play-pause'),
  next: document.querySelector('#controls .next'),
  repeat: document.querySelector('#controls .repeat'),
};

// Range & Time elements
const songCurrentTime = document.querySelector('.song-current-time');
const songLength = document.querySelector('.song-length');
const trackingSlider = document.querySelector('.tracking-slider');
const volumeSlider = document.querySelector('.volume-slider');

// Playlist
const playlistBody = document.querySelector('#playlist tbody');
let playlistPlay = document.querySelectorAll('#playlist .play-pause');
let listItems = document.querySelectorAll('#playlist tbdoy tr');

// Audio Element
const audio = document.getElementById('player');

/**
 * A base list of songs and the meta data for them.
 *
{
  title: '',
  artist: '',
    art: {
      square: '',
    },
  },
  url: `${archiveBase}`,
},
 */
const songList = [
{
    title: 'Bilal SONSES - Neyim Olacaktın?',
    duration: 174,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-mDGZSKIiLEM/XbdF_9liMBI/AAAAAAAABkM/PIWqRTsWk1Ex6E_5Q-XHJnTxFUe39flbwCLcBGAsYHQ/s1600/neyim-olacaktin.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LsIujdJHlIIyVSckGrb%2F-LsIun1MCp9gzkhiwwn9%2Fneyimolacaktin.mp3?alt=media&token=d686b482-609d-47b9-9e27-0a983a389004`,
  },{
    title: 'Cem Adrian & Hande Mehan - Kum Gibi',
    duration: 244,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-WAHJBEGFvB8/XbiQZ8JkhsI/AAAAAAAABlE/BH9SqoGm5rw97RjbkX74lkQPsJZhA1lIwCLcBGAsYHQ/s1600/kum-gibi.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LsNvzsHmm53ECGGl6DR%2F-LsNw5L8tIkbYqve16jj%2Fkumgibi.mp3?alt=media&token=ab27e330-3bc1-4920-8fb7-67ae92a5eb79`,
  },{
    title: 'Ceren Cennet - Kördüğüm',
    duration: 221,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-RLQIw5GO6iM/XbiO8hoLlBI/AAAAAAAABk4/ioJHobpqnEErhklqajhxxIBgE68RBj4dQCLcBGAsYHQ/s1600/kordugum.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LsNvEoNqAD7fNIKO56S%2F-LsNvHiAFPJX1HRwO_LO%2Fkordugum.mp3?alt=media&token=bb3baacf-62a1-4d03-b404-6076ab9f9c0b`,
  },{
    title: 'Ebru Yaşar - Alev Alev',
    duration: 223,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-zWY4yg5LrWY/XbcfUpDVEjI/AAAAAAAABjE/aLqzRn_NSc46T6ixiJrqYd8H8Xf0CznkgCLcBGAsYHQ/s1600/alev-alev.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrzRQOhj53jXurJv001%2F-LrzS0LrsMM_c-bHzBWO%2Falevalev.mp3?alt=media&token=57d6c9d2-37bf-4a0b-a6da-3183f8161b6c`,
  },
  {
    title: 'Fettah Can - Bırak Ağlayayım',
    duration: 173,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-5bLPuT-EfnA/XbcfUrXlKMI/AAAAAAAABjM/BxHRHPQhLUQEiVCNHmJEbvcfK_BK4RqJQCLcBGAsYHQ/s1600/birak-aglayayim.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrzPjObqLRCicx8Cjec%2F-LrzQEFZ7pbilsRaQwwT%2Fbirakaglayayim.mp3?alt=media&token=1cc0202a-59ba-41c2-b2e0-d972a03f64f4`,
  },
  {
    title: 'Mabel Matiz - Gözlerine',
    duration: 262,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-bCsZd2MOT2Y/XbdF_8gpdmI/AAAAAAAABkE/kGni5EkkBnwkcO4L5VLloy_O0gOST4hUACLcBGAsYHQ/s1600/gozlerine.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LsItprVLnqLy5x9dVU7%2F-LsItsutewrF7EkyBP2d%2Fgozlerine.mp3?alt=media&token=ad5153df-c337-4477-8088-5764d0cc87dd`,
  },
  {
    title: 'Jehan Barbur - Kusura Bakmasınlar',
    duration: 247,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-VOCo5xmdb4w/XbdF_wxUYuI/AAAAAAAABkI/Noq8Ze8TNaUQxx78dKzWWBAydt5q3irkQCLcBGAsYHQ/s1600/kusura-bakmasinlar.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LsIujdJHlIIyVSckGrb%2F-LsIv7waA08YN36xSgov%2Fkusurabakmasinlar.mp3?alt=media&token=dd7da2c3-f1dc-4a25-a114-aa91af9f6d5c`,
  },
  {
    title: 'Ayşe Hatun Önal - Efsane',
    duration: 218,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-KXHXvLD8Yi0/XbcfUulM69I/AAAAAAAABjI/Lb7JiPHjmwcI5oxe9wlzzsXImJxbfN6OgCLcBGAsYHQ/s1600/efsane.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrePI7Rx4CN-na5E_3f%2F-LrePLSj2UlVh2LseJjd%2Fefsane.mp3?alt=media&token=b5531b1a-f587-462e-90b8-d0475fbda853`,
  },
  {
    title: 'Simge - Yalnız Başına',
    duration: 190,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/--ZAFrZXmI-M/XbcfWZjhhKI/AAAAAAAABjY/aI9jXAVFcQ44CvQSqQ3fOlcL32l2c1FJQCLcBGAsYHQ/s1600/simge-yalniz-basina.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrzOnzz28wGj_eIRp6X%2F-LrzP8DxvCePJA7mdPyu%2Fyalnizbasina.mp3?alt=media&token=8875b4a9-18e2-4164-bc9a-eda0fee6727c`,
  },
  {
    title: 'Tuğçe Kandemir - Yelkovan',
    duration: 239,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-MXxAUC-P9X4/XbcfWxhQgzI/AAAAAAAABjc/m0J4jGdcrFsHwttYJZI8p7dgZOSwTNKKACLcBGAsYHQ/s1600/yelkovan.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LqzKmeYBD7-EhOhsjnD%2F-LqzLokW3DjZd_t8IWZQ%2Fyelkovan.mp3?alt=media&token=d38311f8-4fbb-42da-bd5a-cb7f177abbcf`,
  },
  {
    title: 'Mustafa Ceceli - Bedel',
    duration: 200,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-AF_IITns9KQ/XbcfV41JkQI/AAAAAAAABjU/NxjBLi894lQPHq0G2G5NxA8NMKLWyU2hwCLcBGAsYHQ/s1600/mustafa-ceceli-bedel.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LreNfb1ol7aPPTYJQBC%2F-LreOdcAOnMIWB71U9zv%2Fbedel.mp3?alt=media&token=153214cb-2416-49b8-938d-d19b219a4349`,
  },
  {
    title: 'Cem Belevi - Farkında mısın',
    duration: 214,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/--Z3IsTVMXKg/XbclsqvvgxI/AAAAAAAABj4/LW2j9BNg5aIzc3xe7K7e2o5XnOSxArkLgCLcBGAsYHQ/s1600/farkinda-misin.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LreNfb1ol7aPPTYJQBC%2F-LreOGWz-lXdmR1el3ny%2Ffarkindamisin.mp3?alt=media&token=165c6249-ee36-4ef1-a94a-3b9d6cc92179`,
  }
,
  {
    title: 'Irmak Arıcı - Mevzum Derin',
    duration: 130,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-oYxW_-f07Bo/XbgWZorlo0I/AAAAAAAABkg/K3Autx8BY3oy721isB47bdPaLIA7TdykACLcBGAsYHQ/s1600/mevzum-derin.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LqzKmeYBD7-EhOhsjnD%2F-LqzLClVmTE91yJVAgIb%2Fmevzumderin.mp3?alt=media&token=6f2ff932-d5dd-44b8-bf5f-86af76f3f694`,
  }
,
  {
    title: 'Can Bonomo - Ruhum Bela',
    duration: 165,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-kOkaljuOEb4/XbgWZnwXiKI/AAAAAAAABkk/zsjJC8pGb1EFCQJ4kY9PmqSlRz1UHn8yACLcBGAsYHQ/s1600/ruhum-bela.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LsM4xpKNIGV7fViA4Cr%2F-LsM50t0cfo778YNtY4n%2Fruhumbela.mp3?alt=media&token=eba6512f-ca55-44f8-80c8-38930d9b573b`,
  }
,
  {
    title: 'İlyas Yalçıntaş - Farzet',
    duration: 252,
    album: {
      art: {
        square: 'https://1.bp.blogspot.com/-yk_TFMY4AnI/XbgWZrv5g7I/AAAAAAAABko/75MkbJvS_l8vE1CGHUne5fXoBOQJ_4VGgCLcBGAsYHQ/s1600/farzet.jpg',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LqzKmeYBD7-EhOhsjnD%2F-LqzKp75B6RZz7A8GBTV%2Ffarzet.mp3?alt=media&token=732dbe32-a214-45dc-9f09-c71cfd6515f2`,
  }
,
  {
    title: 'Mehmet Erdem - Sen De Vur Gülüm',
    duration: 275,
    album: {
      art: {
        square: '',
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrAt4uFPiShOFKZzKzU%2F-LrAtO4xaOox9NYMcgPi%2Fsendevurgulum.mp3?alt=media&token=5dd5f6c0-cf35-421a-8c44-9a9b30486d8d`,
  }
];

/**
 * Based on the class list for a given element toggle the class(es) received.
 * Can accept both string with classes separated by spaces and an array of classes.
 *
 * @param {} element The dom element for which to toggle classes.
 * @param {string|string[]} classes The classes to be toggled on or off.
 */
function toggleClasses(element, classes) {
  const currentClasses = new Set(element.classList);
  // Separate string formatted classes into an array or accept array param
  const newClasses = (_.isString(classes)) ? classes.split(' ') : classes;

  for (const className of newClasses) {if (window.CP.shouldStopExecution(1)){break;}if (window.CP.shouldStopExecution(1)){break;}
    if (currentClasses.has(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
window.CP.exitedLoop(1);

window.CP.exitedLoop(1);

}

/**
 * Toggle a boolean value.
 *
 * @param {boolean} boolean The boolean value to be toggled true or false.
 * @return {boolean} Returns the opposite boolean value to the received.
 */
function toggleBoolean(boolean) {
  return (!boolean);
}

/**
 * Convert seconds into a usable format for time.
 *
 * @param {number|string} seconds The amount of seconds to convert.
 * @return {string} Returns a time formatted string (--:--:--).
 */
function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(seconds) / 3600)),
    minutes: String(Math.floor(Number(seconds) % 3600 / 60)),
    seconds: String(Math.floor(Number(seconds) % 3600 % 60)),
  };

  if (time.hours && time.hours < 10) {
    time.hours = `0${time.hours}`;
  }
  if (time.minutes && time.minutes < 10) {
    time.minutes = `0${time.minutes}`;
  }
  if (time.seconds && time.seconds < 10) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.hours !== '00') {
    return `${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    return `${time.minutes}:${time.seconds}`;
  }
}

/**
 * The base setup for any given audio player.
 */
class Player {
  constructor() {
    this.playing = (new Set(buttons.playPause.classList).has('on'));
    this.shuffle = (new Set(buttons.shuffle.classList).has('on'));
    this.repeat = (new Set(buttons.repeat.classList).has('on'));

    this.songIndex = 0;
    this.previousSong = songList.length - 1;

    this.song = songList[this.songIndex];

    this.randomOrder = new Set();
    this.randomIndex = 0;

    this.volume = 0.8;
  }

  /**
   * Update the meta data for the current song.
   *
   * @param {number} songIndex Optional param to force set the index of the song.
   */
  updateSong(songIndex) {
    this.previousSong = this.songIndex;
    this.songIndex = songIndex || this.songIndex;
    this.song = songList[this.songIndex];
    const song = this.song;

    audio.src = song.url;
    trackingSlider.value = 0;
    this.updateSongRangeValues();
    songLength.innerHTML = secondsToHms(song.duration);
    trackingSlider.max = song.duration;

    document.querySelector(`tr[data-index="${this.previousSong}"]`).classList.remove('playing');
    toggleClasses(document.querySelector(`tr[data-index="${this.songIndex}"]`), 'playing');
  }

  /**
   * Play the audio.
   */
  play() {
    audio.play();
  }

  /**
   * Pause the audio.
   */
  pause() {
    audio.pause();
  }

  /**
   * Seek in the audio, update the time based on range value selected.
   */
  seek() {
    audio.currentTime = Number(trackingSlider.value);
    songCurrentTime.innerHTML = secondsToHms(audio.currentTime);
  }

  /**
   * Update the range values based on the current time in the song.
   */
  updateSongRangeValues() {
    const value = (trackingSlider.value / this.song.duration) * 100;
    const buffer = 0;

    songCurrentTime.innerHTML = secondsToHms(trackingSlider.value);

    trackingSlider.style.background = `linear-gradient(to right, ${colors.aqua[50]} 0%, ${colors.aqua[50]} ${value}%, ${colors.metal[50]} ${value}%, ${colors.metal[50]} ${buffer}%, ${colors.metal[80]} ${buffer}%, ${colors.metal[80]} 100%)`;
  }

  /**
   * Adjust the volume.
   */
  adjustVolume() {
    const {value} = volumeSlider;
    const buffer = 0;

    audio.volume = value;

    volumeSlider.style.background = `linear-gradient(to right, ${colors.aqua[80]} 0%, ${colors.aqua[80]} ${value * 100}%, ${colors.metal[50]} ${value * 100}%, ${colors.metal[50]} ${buffer}%, ${colors.metal[80]} ${buffer}%, ${colors.metal[80]} 100%)`;
  }
}

/**
 * The setup for any set of controls for the player.
 */
class Controls extends Player {
  /**
   * Play or pause the current list item.
   */
  playPause() {
    this.playing = toggleBoolean(this.playing);
    toggleClasses(buttons.playPause, 'on fa-play fa-pause');

    const currentClasses = new Set(buttons.playPause.classList);

    if (currentClasses.has('on')) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * Go to the next item in the list.
   */
  next() {
    this.previousSong = this.songIndex;
    let playNext = true;

    toggleClasses(document.querySelector(`tr[data-index="${this.songIndex}"]`), 'playing');

    if (this.shuffle) {
      this.randomIndex++;

      if (this.randomIndex >= this.randomOrder.size) {
        this.randomIndex = 0;

        playNext = (this.repeat);
      }

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      this.songIndex++;

      if (this.songIndex >= songList.length) {
        this.songIndex = 0;

        playNext = (this.repeat);
      }
    }

    this.updateSong();

    if (this.playing) {
      if (playNext) {
        this.play();
      } else {
        this.playPause();
      }
    }
  }

  /**
   * Go to the previous item in the list.
   */
  previous() {
    toggleClasses(document.querySelector(`tr[data-index="${this.songIndex}"]`), 'playing');

    if (this.shuffle) {
      if (this.randomIndex === 0) {
        this.randomIndex = this.randomOrder.size;
      }
      this.randomIndex--;

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      if (this.songIndex === 0) {
        this.songIndex = songList.length;
      }
      this.songIndex--;
    }

    this.updateSong();

    if (this.playing) {
      this.play();
    }
  }

  /**
   * Shuffle the list, play in a random order.
   */
  toggleShuffle() {
    this.shuffle = toggleBoolean(this.shuffle);
    toggleClasses(buttons.shuffle, 'on');
    const currentClasses = new Set(buttons.shuffle.classList);

    if (currentClasses.has('on')) {
      this.randomOrder = new Set();
      this.randomIndex = 0;

      let randomIndex = this.songIndex;

      for (let index = 0; index < songList.length; index++) {if (window.CP.shouldStopExecution(3)){break;}if (window.CP.shouldStopExecution(3)){break;}
        // While loop to ensure that the index being added to the random order is unique, else changes the index value
        while (this.randomOrder.has(randomIndex)) {if (window.CP.shouldStopExecution(2)){break;}if (window.CP.shouldStopExecution(2)){break;}
          randomIndex = Math.floor(Math.random() * songList.length);
        }
window.CP.exitedLoop(2);

window.CP.exitedLoop(2);


        this.randomOrder.add(randomIndex);
      }
window.CP.exitedLoop(3);

window.CP.exitedLoop(3);

    }
  }

  /**
   * Repeat/loop the list that is currently playing.
   */
  toggleRepeat() {
    this.repeat = toggleBoolean(this.repeat);
    toggleClasses(buttons.repeat, 'on');
  }
}


// Instantiate the controls
const controls = new Controls();

// Add event listeners for the buttons
buttons.playPause.addEventListener('click', () => {
  controls.playPause();
});
buttons.next.addEventListener('click', () => {
  controls.next();
});
buttons.previous.addEventListener('click', () => {
  controls.previous();
});
buttons.shuffle.addEventListener('click', () => {
  controls.toggleShuffle();
});
buttons.repeat.addEventListener('click', () => {
  controls.toggleRepeat();
});


audio.onended = () => {
  // Once a song is over play next song.
  controls.next();
};
audio.ontimeupdate = () => {
  trackingSlider.value = audio.currentTime;
  controls.updateSongRangeValues();
};

// Update the range values on change or moving the scrubber.
trackingSlider.addEventListener('change', () => {
  controls.updateSongRangeValues();
  controls.seek();
});
trackingSlider.addEventListener('mousemove', () => {
  controls.updateSongRangeValues();
});

volumeSlider.addEventListener('change', () => {
  controls.adjustVolume();
});
volumeSlider.addEventListener('mousemove', () => {
  controls.adjustVolume();
});

// That's right ... hotkeys!
document.onkeypress = (event) => {
  switch (event.keyCode) {
    // a - previous
    case 97: {
      controls.previous();
      break;
    }
    // d / n - next
    case 100:
    case 110: {
      controls.next();
      break;
    }
    // s / p - play / pause
    case 115:
    case 112: {
      controls.playPause();
      break;
    }
    // e / r - repeat
    case 101:
    case 114: {
      controls.toggleRepeat();
      break;
    }
    // q - shuffle
    case 113: {
      controls.toggleShuffle();
      break;
    }
  }
};


/**
 * Build the playlist from the give array of songs.
 */
function buildPlaylist() {
  // Add the songs to the dom
  let html = '';
  songList.forEach((song, index) => {
    html += `
<tr data-index="${index}">
  <td class="play-pause"><img src="${song.album.art.square}"></td>
  <td>${song.title}</td>
  <td>${song.title}</td>
</tr>
`;
  });
  playlistBody.innerHTML = html;

  // Update the list items
  listItems = document.querySelectorAll('#playlist tbody tr');
  playlistPlay = document.querySelectorAll('#playlist .play-pause');

  // Add event listeners to the list items
  for (const listItem of listItems) {if (window.CP.shouldStopExecution(4)){break;}if (window.CP.shouldStopExecution(4)){break;}
    listItem.addEventListener('click', (event) => {
      const songIndex = event.target.parentElement.dataset.index;
      controls.updateSong(songIndex);

      if (controls.playing) {
        controls.play();
      }
    });

    listItem.addEventListener('dblclick', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!controls.playing) {
        controls.playPause();
      }
    });
  }
window.CP.exitedLoop(4);

window.CP.exitedLoop(4);

  
  for (const playlistPlayButton of playlistPlay) {if (window.CP.shouldStopExecution(5)){break;}if (window.CP.shouldStopExecution(5)){break;}
    playlistPlayButton.addEventListener('click', (event) => {
      if (!controls.playing) {
        controls.playPause();
      }
    });
  }
window.CP.exitedLoop(5);

window.CP.exitedLoop(5);

}


// Initiate the setup.
window.onload = () => {
  buildPlaylist();
  controls.updateSong();
  controls.adjustVolume();
};
"use strict";"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(o){this._loopExits[o]=!0},shouldStopLoop:function(o){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[o])return!1;var t=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=t,!1;var i=t-this.timeOfFirstCallToShouldStopLoop;if(i<this.START_MONITORING_AFTER)return!1;if(i>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(o,t)}catch(o){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var o={action:"infinite-loop",line:this._findAroundLineNumber()};parent.postMessage(JSON.stringify(o),"*")}else this._throwAnErrorToStopPen()}catch(o){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@yenisarkilarlistesi.com"},_findAroundLineNumber:function(){var o=new Error,t=0;if(o.stack){var i=o.stack.match(/boomerang\S+:(\d+):\d+/);i&&(t=i[1])}return t},_checkOnInfiniteLoop:function(o,t){if(!this._loopTimers[o])return this._loopTimers[o]=t,!1;var i=t-this._loopTimers[o];if(i>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+o},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(o){var t=window.CP.PenTimer.shouldStopLoop(o);return t===!0&&console.warn("[Yenisarkilarlistesi]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"),t},window.CP.exitedLoop=function(o){window.CP.PenTimer.exitedLoop(o)};
