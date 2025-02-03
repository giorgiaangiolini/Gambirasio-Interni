
const VideoSection = ({link, poster, videoID}) => {

  if(link){
    return (
      <div className='section_video'>
         <video
          className='video_element'
          width="100%"
          height="100%"
          poster={poster}
          controls
          playsInline>
          <source src={link} type="video/mp4" />
        </video>
      </div>
    )
  }
  if(videoID){
    return (
      <div className='custom-aspect-video'>
      <iframe className='video min-w-full min-h-full'
        title='Youtube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://youtube.com/embed/${videoID}?autoplay=0`}>
      </iframe>
      </div>    
    )
  }

}

export default VideoSection
