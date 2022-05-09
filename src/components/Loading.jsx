import './styles.css'
export default function Loading ({ isLightMode = false }) {
  return (
    <div className={isLightMode ? 'loading small' : 'loading'}>
      <div className='wrapper'>
        <div className={isLightMode ? 'circle black' : 'circle'} />
        <div className={isLightMode ? 'circle black' : 'circle'} />
        <div className={isLightMode ? 'circle black' : 'circle'} />
        <div className='shadow' />
        <div className='shadow' />
        <div className='shadow' />
      </div>
    </div>
  )
}
