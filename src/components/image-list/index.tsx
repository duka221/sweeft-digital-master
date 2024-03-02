import { Image } from 'api/images'
import { PhotoDetailsDialog } from 'components/dialogs/photo-details'
import {  useState } from 'react'

type ImageListProps = {
  images: Array<Image>
}

export const ImageList = ({ images }: ImageListProps) => {
  const [open,setOpen] = useState<boolean>(false)
  const [photoId,setPhotoId] = useState('')
  
  return (
    <div className='image-list'>
      {images.map((image) => (

      <>
        <div key={image.id} className='image-item'>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            onClick={() => {
              setPhotoId(image.id)
              setOpen(true)
            }}
          />
        </div>
            
      </>
      ))}
      <PhotoDetailsDialog open={open} onClose={()=> setOpen(false)} imageId= {photoId} isOpen={open}/>
    </div>
  )
}
