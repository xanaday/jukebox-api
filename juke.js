$(document).ready(function() {
  console.log('js attached');
  $('#pause').prop('disabled', true);

  SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });

  // var track_url = 'http://soundcloud.com/forss/flickermood';
  // SC.oEmbed(track_url, {
  //   auto_play: true
  // }).then(function(oEmbed) {
  //   console.log('oEmbed response: ', oEmbed);
  // });

  function Jukebox(audio) {
    var _this = this;
    this.player = null;
    this.audio = audio;
    this.songs = ['https://bit.ly/2sXBeXS', 'https://bit.ly/2tvIFmG'];
    this.currentSongIndex = 0;
    this.currentSongID = 0;

    this.renderSong = function(song) {
      var $songTitleElem = document.getElementById('song-title');
      $songTitleElem.innerHTML = song.title;
    }

    this.renderTracks = function(list) {
      var _this = this;
      var display = document.getElementById('display');
      display.innerHTML = '';

      list.forEach(function(item) {
        var $item = document.createElement('li');
        $item.innerHTML = item.title;
        // $item.classList.add('track');
        // $item.setAttribute('id', item.id);
        // $item.setAttribute('index', i);
        // $item.addEventListener('click', function(){
        //   _this.currentSongIndex =  $item.getAttribute('index');
        //   _this.play();
        // })
        display.appendChild($item);

      })
    }

    this.search = function(){
      console.log("clicked here")
      var userInput = $('#q').val()
      // this.search = function(query) {
      var self = this;
      SC.get('/tracks', {
        q: userInput
        }).then(function(tracks) {
          console.log(tracks);

        self.songs = tracks;
        self.renderTracks(self.songs);
      });
      // };
    }

    this.play = function() {
      var song = this.songs[this.currentSongIndex];
      if(this.currentSongID !== song.id) {
        this.currentSongID = song.id;
        let self = this;
        SC.stream('/tracks/' + song.id).then(function(player){
          self.audio = player;
          console.log(player)
          self.renderSong(song);
          player.play();
        });
      }
    }

  this.pause = function(){
      this.audio.pause();
  }

  this.stop = function(){
      this.audio.pause();
      this.audio.currentTime = 0;
  }

  this.next = function(){
      this.audio.pause();
      this.currentIndex++;
      if(this.currentIndex == this.playlist.length){
        this.currentIndex = 0
      };
      this.audio.src = this.playlist[this.currentIndex];
      this.play();
  }

  this.prev = function(){
      this.audio.pause();
      this.currentIndex--;
      if(this.currentIndex <= 0){
        this.currentIndex = this.playlist.length - 1
      };
      this.audio.src = this.playlist[this.currentIndex];
      this.play();
  }
}

var thisIsMyJukebox = new Jukebox()

//pass the play function by reference
$('#playBtn').click(function(){
  thisIsMyJukebox.play()
})
$('#pauseBtn').click(function(){
  thisIsMyJukebox.pause()
})
$('#stopBtn').click(function(){
  thisIsMyJukebox.stop()
})
$('#prevBtn').click(function(){
  thisIsMyJukebox.prev()
})
$('#nextBtn').click(function(){
  thisIsMyJukebox.next()
})
$('#searchButton').click(function(){
 thisIsMyJukebox.search()
})
// input.addEventListener('keyup', function() {
//   myJukebox.search(input.value);
// });

//myJukebox.search('');})
});
