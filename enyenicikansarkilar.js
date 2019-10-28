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
    25: &#39;#eceaf7&#39;,
    50: &#39;#fff&#39;,
    80: &#39;#fff&#39;,
  },
  metal: {
    5: &#39;#F3F3F1&#39;,
    20: &#39;#CFD0C8&#39;,
    50: &#39;#868975&#39;,
    80: &#39;#36372F&#39;,
    90: &#39;#272822&#39;,
  },
};

// Control button elements
const buttons = {
  shuffle: document.querySelector(&#39;#controls .shuffle&#39;),
  previous: document.querySelector(&#39;#controls .previous&#39;),
  playPause: document.querySelector(&#39;#controls .play-pause&#39;),
  next: document.querySelector(&#39;#controls .next&#39;),
  repeat: document.querySelector(&#39;#controls .repeat&#39;),
};

// Range &amp; Time elements
const songCurrentTime = document.querySelector(&#39;.song-current-time&#39;);
const songLength = document.querySelector(&#39;.song-length&#39;);
const trackingSlider = document.querySelector(&#39;.tracking-slider&#39;);
const volumeSlider = document.querySelector(&#39;.volume-slider&#39;);

// Playlist
const playlistBody = document.querySelector(&#39;#playlist tbody&#39;);
let playlistPlay = document.querySelectorAll(&#39;#playlist .play-pause&#39;);
let listItems = document.querySelectorAll(&#39;#playlist tbdoy tr&#39;);

// Audio Element
const audio = document.getElementById(&#39;player&#39;);

/**
 * A base list of songs and the meta data for them.
 *
{
  title: &#39;&#39;,
  artist: &#39;&#39;,
    art: {
      square: &#39;&#39;,
    },
  },
  url: `${archiveBase}`,
},
 */
const songList = [
  {
    title: &#39;Ebru Yaşar - Alev Alev&#39;,
    duration: 180,
    album: {
      art: {
        square: &#39;https://1.bp.blogspot.com/-zWY4yg5LrWY/XbcfUpDVEjI/AAAAAAAABjE/aLqzRn_NSc46T6ixiJrqYd8H8Xf0CznkgCLcBGAsYHQ/s1600/alev-alev.jpg&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrzRQOhj53jXurJv001%2F-LrzS0LrsMM_c-bHzBWO%2Falevalev.mp3?alt=media&amp;token=57d6c9d2-37bf-4a0b-a6da-3183f8161b6c`,
  },
  {
    title: &#39;Fettah Can - Bırak Ağlayayım&#39;,
    duration: 229,
    album: {
      art: {
        square: &#39;https://1.bp.blogspot.com/-5bLPuT-EfnA/XbcfUrXlKMI/AAAAAAAABjM/BxHRHPQhLUQEiVCNHmJEbvcfK_BK4RqJQCLcBGAsYHQ/s1600/birak-aglayayim.jpg&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrzPjObqLRCicx8Cjec%2F-LrzQEFZ7pbilsRaQwwT%2Fbirakaglayayim.mp3?alt=media&amp;token=1cc0202a-59ba-41c2-b2e0-d972a03f64f4`,
  },
  {
    title: &#39;Ayşe Hatun Önal - Efsane&#39;,
    duration: 192,
    album: {
      art: {
        square: &#39;https://1.bp.blogspot.com/-KXHXvLD8Yi0/XbcfUulM69I/AAAAAAAABjI/Lb7JiPHjmwcI5oxe9wlzzsXImJxbfN6OgCLcBGAsYHQ/s1600/efsane.jpg&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrePI7Rx4CN-na5E_3f%2F-LrePLSj2UlVh2LseJjd%2Fefsane.mp3?alt=media&amp;token=b5531b1a-f587-462e-90b8-d0475fbda853`,
  },
  {
    title: &#39;Simge - Yalnız Başına&#39;,
    duration: 192,
    album: {
      art: {
        square: &#39;https://1.bp.blogspot.com/--ZAFrZXmI-M/XbcfWZjhhKI/AAAAAAAABjY/aI9jXAVFcQ44CvQSqQ3fOlcL32l2c1FJQCLcBGAsYHQ/s1600/simge-yalniz-basina.jpg&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LrzOnzz28wGj_eIRp6X%2F-LrzP8DxvCePJA7mdPyu%2Fyalnizbasina.mp3?alt=media&amp;token=8875b4a9-18e2-4164-bc9a-eda0fee6727c`,
  },
  {
    title: &#39;Tuğçe Kandemir - Yelkovan&#39;,
    duration: 192,
    album: {
      art: {
        square: &#39;https://1.bp.blogspot.com/-MXxAUC-P9X4/XbcfWxhQgzI/AAAAAAAABjc/m0J4jGdcrFsHwttYJZI8p7dgZOSwTNKKACLcBGAsYHQ/s1600/yelkovan.jpg&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LqzKmeYBD7-EhOhsjnD%2F-LqzLokW3DjZd_t8IWZQ%2Fyelkovan.mp3?alt=media&amp;token=d38311f8-4fbb-42da-bd5a-cb7f177abbcf`,
  },
  {
    title: &#39;Mustafa Ceceli - Bedel&#39;,
    duration: 192,
    album: {
      art: {
        square: &#39;https://1.bp.blogspot.com/-AF_IITns9KQ/XbcfV41JkQI/AAAAAAAABjU/NxjBLi894lQPHq0G2G5NxA8NMKLWyU2hwCLcBGAsYHQ/s1600/mustafa-ceceli-bedel.jpg&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LreNfb1ol7aPPTYJQBC%2F-LreOdcAOnMIWB71U9zv%2Fbedel.mp3?alt=media&amp;token=153214cb-2416-49b8-938d-d19b219a4349`,
  },
  {
    title: &#39;Cem Belevi - Farkında mısın&#39;,
    duration: 192,
    album: {
      art: {
        square: &#39;&#39;,
      },
    },
    url: `https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-Lpdr52D2axjjm7pA8Aa%2F-LreNfb1ol7aPPTYJQBC%2F-LreOGWz-lXdmR1el3ny%2Ffarkindamisin.mp3?alt=media&amp;token=165c6249-ee36-4ef1-a94a-3b9d6cc92179`,
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
  const newClasses = (_.isString(classes)) ? classes.split(&#39; &#39;) : classes;

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

  if (time.hours &amp;&amp; time.hours &lt; 10) {
    time.hours = `0${time.hours}`;
  }
  if (time.minutes &amp;&amp; time.minutes &lt; 10) {
    time.minutes = `0${time.minutes}`;
  }
  if (time.seconds &amp;&amp; time.seconds &lt; 10) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.hours !== &#39;00&#39;) {
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
    this.playing = (new Set(buttons.playPause.classList).has(&#39;on&#39;));
    this.shuffle = (new Set(buttons.shuffle.classList).has(&#39;on&#39;));
    this.repeat = (new Set(buttons.repeat.classList).has(&#39;on&#39;));

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

    document.querySelector(`tr[data-index=&quot;${this.previousSong}&quot;]`).classList.remove(&#39;playing&#39;);
    toggleClasses(document.querySelector(`tr[data-index=&quot;${this.songIndex}&quot;]`), &#39;playing&#39;);
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
    toggleClasses(buttons.playPause, &#39;on fa-play fa-pause&#39;);

    const currentClasses = new Set(buttons.playPause.classList);

    if (currentClasses.has(&#39;on&#39;)) {
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

    toggleClasses(document.querySelector(`tr[data-index=&quot;${this.songIndex}&quot;]`), &#39;playing&#39;);

    if (this.shuffle) {
      this.randomIndex++;

      if (this.randomIndex &gt;= this.randomOrder.size) {
        this.randomIndex = 0;

        playNext = (this.repeat);
      }

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      this.songIndex++;

      if (this.songIndex &gt;= songList.length) {
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
    toggleClasses(document.querySelector(`tr[data-index=&quot;${this.songIndex}&quot;]`), &#39;playing&#39;);

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
    toggleClasses(buttons.shuffle, &#39;on&#39;);
    const currentClasses = new Set(buttons.shuffle.classList);

    if (currentClasses.has(&#39;on&#39;)) {
      this.randomOrder = new Set();
      this.randomIndex = 0;

      let randomIndex = this.songIndex;

      for (let index = 0; index &lt; songList.length; index++) {if (window.CP.shouldStopExecution(3)){break;}if (window.CP.shouldStopExecution(3)){break;}
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
    toggleClasses(buttons.repeat, &#39;on&#39;);
  }
}


// Instantiate the controls
const controls = new Controls();

// Add event listeners for the buttons
buttons.playPause.addEventListener(&#39;click&#39;, () =&gt; {
  controls.playPause();
});
buttons.next.addEventListener(&#39;click&#39;, () =&gt; {
  controls.next();
});
buttons.previous.addEventListener(&#39;click&#39;, () =&gt; {
  controls.previous();
});
buttons.shuffle.addEventListener(&#39;click&#39;, () =&gt; {
  controls.toggleShuffle();
});
buttons.repeat.addEventListener(&#39;click&#39;, () =&gt; {
  controls.toggleRepeat();
});


audio.onended = () =&gt; {
  // Once a song is over play next song.
  controls.next();
};
audio.ontimeupdate = () =&gt; {
  trackingSlider.value = audio.currentTime;
  controls.updateSongRangeValues();
};

// Update the range values on change or moving the scrubber.
trackingSlider.addEventListener(&#39;change&#39;, () =&gt; {
  controls.updateSongRangeValues();
  controls.seek();
});
trackingSlider.addEventListener(&#39;mousemove&#39;, () =&gt; {
  controls.updateSongRangeValues();
});

volumeSlider.addEventListener(&#39;change&#39;, () =&gt; {
  controls.adjustVolume();
});
volumeSlider.addEventListener(&#39;mousemove&#39;, () =&gt; {
  controls.adjustVolume();
});

// That&#39;s right ... hotkeys!
document.onkeypress = (event) =&gt; {
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
  let html = &#39;&#39;;
  songList.forEach((song, index) =&gt; {
    html += `
&lt;tr data-index=&quot;${index}&quot;&gt;
  &lt;td class=&quot;play-pause&quot;&gt;&lt;img src=&quot;${song.album.art.square}&quot;&gt;&lt;/td&gt;
  &lt;td&gt;${song.title}&lt;/td&gt;
  &lt;td&gt;${song.title}&lt;/td&gt;
&lt;/tr&gt;
`;
  });
  playlistBody.innerHTML = html;

  // Update the list items
  listItems = document.querySelectorAll(&#39;#playlist tbody tr&#39;);
  playlistPlay = document.querySelectorAll(&#39;#playlist .play-pause&#39;);

  // Add event listeners to the list items
  for (const listItem of listItems) {if (window.CP.shouldStopExecution(4)){break;}if (window.CP.shouldStopExecution(4)){break;}
    listItem.addEventListener(&#39;click&#39;, (event) =&gt; {
      const songIndex = event.target.parentElement.dataset.index;
      controls.updateSong(songIndex);

      if (controls.playing) {
        controls.play();
      }
    });

    listItem.addEventListener(&#39;dblclick&#39;, (event) =&gt; {
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
    playlistPlayButton.addEventListener(&#39;click&#39;, (event) =&gt; {
      if (!controls.playing) {
        controls.playPause();
      }
    });
  }
window.CP.exitedLoop(5);

window.CP.exitedLoop(5);

}


// Initiate the setup.
window.onload = () =&gt; {
  buildPlaylist();
  controls.updateSong();
  controls.adjustVolume();
};

"use strict";"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(o){this._loopExits[o]=!0},shouldStopLoop:function(o){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[o])return!1;var t=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=t,!1;var i=t-this.timeOfFirstCallToShouldStopLoop;if(i<this.start_monitoring_after)return!1;if(i>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(o,t)}catch(o){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var o={action:"infinite-loop",line:this._findAroundLineNumber()};parent.postMessage(JSON.stringify(o),"*")}else this._throwAnErrorToStopPen()}catch(o){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@yenisarkilarlistesi.com"},_findAroundLineNumber:function(){var o=new Error,t=0;if(o.stack){var i=o.stack.match(/boomerang\S+:(\d+):\d+/);i&&(t=i[1])}return t},_checkOnInfiniteLoop:function(o,t){if(!this._loopTimers[o])return this._loopTimers[o]=t,!1;var i=t-this._loopTimers[o];if(i>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+o},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(o){var t=window.CP.PenTimer.shouldStopLoop(o);return t===!0&&console.warn("[Yenisarkilarlistesi]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"),t},window.CP.exitedLoop=function(o){window.CP.PenTimer.exitedLoop(o)};
