$(document).ready(function() {
  console.log('js attached');
  $('#pause').prop('disabled', true);

  // SC.initialize({
  //   client_id: 'fd4e76fc67798bfa742089ed619084a6';
  // })
  //
  // var track_url = 'http://soundcloud.com/forss/flickermood';
  // SC.oEmbed(track_url, {
  //   auto_play: true
  // }).then(function(oEmbed) {
  //   console.log('oEmbed response: ', oEmbed);
  // });

function Jukebox() {
  this.playlist = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']
  this.currentIndex = 0
  this.audio = $('#audioPlayer')[0]
  // console.log(this.audio)

  this.play = function(){
      this.audio.src = this.playlist[this.currentIndex]
      this.audio.play();
      // console.log(this.currentIndex)
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
$('li').click(function(event){
  thisIsMyJukebox.currentIndex = event.target.id
  thisIsMyJukebox.pause();
  thisIsMyJukebox.play();
})
});
