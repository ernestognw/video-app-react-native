import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, ProgressBarAndroid } from 'react-native';
import Video from 'react-native-video';
import Layout from '../components/player-layout';
import ControlLayout from '../components/control-layout';
import PlayPause from '../components/play-pause';
import ProgressBar from '../components/progress-bar';
import TimeLeft from '../components/time-left';
import FullScreen from '../components/fullscreen';
import { connect } from 'react-redux';
import { store, persistor } from '../../../store';

class Player extends Component {
  onLoad = () => {
    store.dispatch({
      type: 'VIDEO_STOP_LOADING',
      payload: {
        videoLoading: false,     
      }
    })
  }
  PlayPause = () => {
    store.dispatch({
      type: 'PLAY_PAUSE_VIDEO',
      payload: {
        paused: !this.props.paused,    
      }
    })
  }
  setTime = payload => {
    let currentTime = timeReadable(payload.currentTime);
    store.dispatch({
      type: 'UPDATE_PROGRESS',
      payload: {
        currentTime,
        progress: (payload.currentTime / payload.seekableDuration),
        duration: payload.seekableDuration,
      }
    })
  }
  changeSliderStarted = (value) => {
    store.dispatch({
      type: 'CHANGE_SLIDER_STARTED',
      payload: {
        progress: value,
        currentTime: timeReadable(this.props.duration * value),
        changeActive: true,
      }
    })
  }
  changeSliderFinished = (value) => {
    store.dispatch({
      type: 'CHANGE_SLIDER_FINISHED',
      payload: {
        changeActive: false,
      }
    })
    this.player.seek(this.props.duration * value)
  }
  setFullScreenPromise = () => {
    return new Promise((resolve, reject) => {
      resolve(
        store.dispatch({
          type: 'SET_FULLSCREEN',
          payload: {
            fullscreen: !this.props.fullscreen,     
          }
        })
      )
    }).catch(error => console.error(error))
  }
  FullScreen = event => {
    this.setFullScreenPromise()
      .then(() => {
        if(this.props.fullscreen) {
          this.player.presentFullscreenPlayer();
        }
        else {
          this.player.dismissFullscreenPlayer();
        }
      });
  }
  render() { 
    return (
      <Layout
      loading={this.props.loading}
      video={
        <Video
          ref={(ref) => {
            this.player = ref
          }} 
          source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' }}
          style={styles.video}
          resizeMode='contain'
          onLoad={this.onLoad}
          paused={
            this.props.changeActive ?
            true :
            this.props.paused
            }
          onProgress={this.setTime}
        />
      }
      loader={
        <ActivityIndicator color="white"/>
      }
      controls={
        <ControlLayout>
          <PlayPause 
            onPress={this.PlayPause}
            paused={this.props.paused}
          />
          <ProgressBar 
            progress={this.props.progress}
            onChangeStarted={this.changeSliderStarted}
            onChangeFinished={this.changeSliderFinished}
          />
          <TimeLeft 
            currentTime={this.props.currentTime}
            duration={this.props.duration}            
          />
          <FullScreen
            onPress={this.FullScreen}
          />
        </ControlLayout>
      }
      />
    )
  }
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    left: 0,            
    right: 0,
    bottom: 0,
    top: 0,
  }
})

function timeReadable (time) {
  let duration = time / 60;
  let mins = Math.floor(duration);
  let seconds = duration % 1;
  seconds = (seconds * 60) / 1000;
  let currentTime = (mins + seconds * 10).toFixed(2);
  return currentTime;
}

function mapStateToProps (state) {
  return { 
    loading: state.videoLoading,        
    paused: state.paused,
    progress: state.progress,
    currentTime: state.currentTime,
    duration: state.duration,
    changeActive: state.changeActive,
    fullscreen: state.fullscreen,
  }
}

export default connect(mapStateToProps)(Player);