import { Image, getImages } from 'api/images'
import { keys } from 'api/keys';
import { ImageList } from 'components/image-list'
import {  useRef, useState } from 'react';
import { useQuery } from 'react-query';
import 'styles/Modal/styles.css'


type Props = { open: boolean; onClose: () => void; title: string, isOpen: boolean}

export const HistoryPreviewDialog = ({  open, onClose, title, isOpen }: Props) => {
  const [page] = useState(1)
  const [fetchedHistory, setFetchedHistory] = useState<Array<Image>>([])
  
  const containerRef = useRef<HTMLDivElement | null>(null)

  isOpen && (document.body.style.overflow = 'hidden')
  !isOpen && (document.body.style.overflow = 'unset')




  const {
    data: images,
  } = useQuery(keys.images.history(title,page), () =>
    getImages({debouncedSearchQuery: title, page }),{
      enabled: isOpen,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: images => setFetchedHistory(prev => [...prev, ...images])
    }
  )

  if (!open) {
    return null;
  }


  return (
    <div id='myModal' className={`modal ${open ? '' : 'hide'}`}>
      <div className='modal-content ' ref={containerRef}>
        <span className='close' onClick={() => onClose()}>
          &times;
        </span>
        <h3>Images</h3>
        {images && 
        <ImageList images={fetchedHistory} />}
      </div>
    </div>
  );
};
