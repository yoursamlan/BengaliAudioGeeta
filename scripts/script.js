new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "অর্জুন বিষাদ-যোগ",
          artist: "প্রথম অধ্যায়",
          cover: "./img/1.PNG",
          source: "./mp3/1.mp3",
          favorited: false
        },
        {
          name: "সাংখ্য যোগ",
          artist: "দ্বিতীয় অধ্যায়",
          cover: "./img/2.PNG",
          source: "./mp3/2.mp3",
          favorited: true
        },
        {
          name: "কর্ম যোগ",
          artist: "তৃতীয় অধ্যায়",
          cover: "./img/3.PNG",
          source: "./mp3/3.mp3",
          favorited: false
        },
          {
          name: "জ্ঞান যোগ",
          artist: "চতুর্থ অধ্যায়",
          cover: "./img/4.PNG",
          source: "./mp3/4.mp3",
          favorited: false
        },
        {
          name: "কর্ম-সন্ন্যাস যোগ",
          artist: "পঞ্চম অধ্যায়",
          cover: "./img/5.PNG",
          source: "./mp3/5.mp3",
          favorited: false
        },
          {
          name: "ধ্যান যোগ",
          artist: "ষষ্ঠ অধ্যায়",
          cover: "./img/6.PNG",
          source: "./mp3/6.mp3",
          favorited: false
        },
          {
          name: "জ্ঞান-বিজ্ঞান যোগ",
          artist: "সপ্তম অধ্যায়",
          cover: "./img/7.PNG",
          source: "./mp3/7.mp3",
          favorited: false
        },
          {
          name: "অক্ষর ব্রহ্ম যোগ",
          artist: "অষ্টম অধ্যায়",
          cover: "./img/8.PNG",
          source: "./mp3/8.mp3",
          favorited: false
        },
         {
          name: "রাজবিদ্যা-রাজগুহ্য যোগ",
          artist: "নবম অধ্যায়",
          cover: "./img/9.PNG",
          source: "./mp3/9.mp3",
          favorited: false
        },
           {
          name: "বিভূতি যোগ",
          artist: "দশম অধ্যায়",
          cover: "./img/10.PNG",
          source: "./mp3/10.mp3",
          favorited: false
        },
           {
          name: "বিশ্বরূপ দর্শন যোগ",
          artist: "একাদশ অধ্যায়",
          cover: "./img/11.PNG",
          source: "./mp3/11.mp3",
          favorited: false
        },
           {
          name: "ভক্তি যোগ",
          artist: "দ্বাদশ অধ্যায়",
          cover: "./img/12.PNG",
          source: "./mp3/12.mp3",
          favorited: false
        },
           {
          name: "ক্ষেত্র-ক্ষেত্রজ্ঞ বিভাগ যোগ",
          artist: "ত্রয়োদশ অধ্যায়",
          cover: "./img/13.PNG",
          source: "./mp3/13.mp3",
          favorited: false
        },
           {
          name: "গুণত্রয় বিভাগ যোগ",
          artist: "চতুর্দশ অধ্যায়",
          cover: "./img/14.PNG",
          source: "./mp3/14.mp3",
          favorited: false
        },
           {
          name: "পুরুষোত্তম যোগ",
          artist: "পঞ্চদশ অধ্যায়",
          cover: "./img/15.PNG",
          source: "./mp3/15.mp3",
          favorited: false
        },
           {
          name: "দৈবাসুর সম্পদ বিভাগ যোগ",
          artist: "ষোড়শ অধ্যায়",
          cover: "./img/16.PNG",
          source: "./mp3/16.mp3",
          favorited: false
        },
           {
          name: "শ্রদ্ধাত্রয় বিভাগ যোগ",
          artist: "সপ্তদশ অধ্যায়",
          cover: "./img/17.PNG",
          source: "./mp3/17.mp3",
          favorited: false
        },
           {
          name: "মোক্ষ যোগ",
          artist: "অষ্টাদশ অধ্যায়",
          cover: "./img/18.PNG",
          source: "./mp3/18.mp3",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
