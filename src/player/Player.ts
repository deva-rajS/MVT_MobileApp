import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback', false);

interface WithKey extends Sound {
  _key: string;
}

export class PodcastPlayer {
  private sound = null;
  private currentKey = null;
  private isMouted = true;
  private songEnd = false;

  public updateMouteState = (status: boolean) => {
    this.isMouted = status;
  };

  private loadSound = (fileName: string, from: string = ''): Promise<any> =>
    new Promise((resolve, reject) => {
      const ret = new Sound(fileName, from, (error: any) => {
        const isMeet =
          !error && (ret as WithKey)?._key === this.currentKey && this.isMouted;
        isMeet ? resolve(ret) : reject(error);
      });
      this.currentKey = (ret as WithKey)._key;
    });

  public seekTo = (value: number) => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
    }
  };

  public checkLoaded = () => {
    if (this.sound) {
      return this.sound.isLoaded();
    }
    return false;
  };

  public releaseSound = () => {
    if (this.sound) {
      this.sound.stop();
      this.sound.release();
      this.sound = null;
    }
  };

  public stopSound = () => {
    if (this.sound) {
      this.sound.stop();
    }
  };

  public getDuration = () => {
    if (this.sound) {
      return this.sound.getDuration();
    }
    return 0;
  };

  public loadAudio = async (fileName: string) => {
    try {
      this.releaseSound();
      this.sound = await this.loadSound(fileName);
      if (this.sound) {
        return this.sound;
      }
      return null;
    } catch (err) {
      console.log('err..', err);
      return null;
    }
  };

  public onPlayPress = async (fileName: string, from = '') => {
    try {
      this.releaseSound();
      this.sound = await this.loadSound(fileName, from);
      if (this.sound) {
        this.songEnd = false;
        return this.playAudio();
      }
      return {playing: false, duration: 0};
    } catch (err) {
      console.log('err..', err);
      return {playing: false, duration: 0};
    }
  };

  public playAudio = async (): Promise<{
    playing: boolean;
    duration: number;
  }> => {
    if (this.sound) {
      this.sound.play(this.onComplete);
      const duration = this.getDuration();
      return {playing: true, duration};
    }
    return {playing: false, duration: 0};
  };

  public onComplete = () => {
    if (this.sound) {
      this.sound.setCurrentTime(0);
      this.songEnd = true;
    }
  };

  public async onResume(url?: string) {
    if (this.sound) {
      this.sound.play(this.onComplete);
    } else {
      if (url) {
        this.onPlayPress(url, '');
      }
    }

    return true;
  }

  public onPlayingPausePress = () => {
    if (this.sound) {
      this.sound.pause();
    }
  };

  public getCurrentTime = async (): Promise<number> => {
    return new Promise(resolve => this.sound.getCurrentTime(resolve));
  };

  public audioEnd = () => {
    return this.songEnd;
  };
}
