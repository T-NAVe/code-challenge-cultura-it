import './styles.css'
export default function Loading ({ isLightMode = false }) {
  return (
    <div className='loading'>
      <div className='wrapper'>
        <div className='circle' />
        <div className='circle' />
        <div className='circle' />
        <div className='shadow' />
        <div className='shadow' />
        <div className='shadow' />
      </div>
    </div>
  )
}
