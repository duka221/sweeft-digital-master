import { HistoryPreviewDialog } from 'components/dialogs/history-preview'
import { useState } from 'react'
import 'styles/History/styles.css'

type Props = {
  title: string
}

export const HistoryBox = ({title }: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)



  return (
    <>
    <div className='history-item'
        onClick={() => setIsPreviewOpen(true)}
      >
        <div>
        {title}

        </div>
      </div>
     
        <HistoryPreviewDialog
          open={isPreviewOpen}
          title={title}
          onClose={() => setIsPreviewOpen(false)}
          isOpen = {isPreviewOpen}
        />
      
    </>
  )
}
