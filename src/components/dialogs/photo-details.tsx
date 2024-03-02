import { getImage } from 'api/images'
import { useQuery } from 'react-query';
import { keys } from 'api/keys'
import 'styles/Modal/styles.css'



type Props = { open: boolean; onClose: () => void; imageId: string , isOpen:boolean}

export const PhotoDetailsDialog = ({ imageId, open, onClose, isOpen }: Props) => {
    const {
        data,
      } = useQuery(keys.images.detail(imageId),() => getImage(imageId),{
        enabled: isOpen
      })
  if (!open) {
    return null
  }
  return (
    <div id='myModal' className={`modal ${open ? '' : 'hide'}`}>
      <div className='modal-content modal-content-small'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <div className='modalPhoto'>
        <h4>{data?.alt_description}</h4>
        <img src={data?.urls.regular} alt={data?.alt_description} />
        <p>Likes:{data?.likes}</p>
        <p>Downloads:{data?.downloads}</p>
        <p>Views:{data?.views}</p>
        </div>
      </div>
    </div>
  )
}
