import { BsBarChartLine, BsJournalBookmark } from 'react-icons/bs'
import { IoBookOutline } from 'react-icons/io5'
import { MdOutlineAccountBalance } from 'react-icons/md'
import { FaBalanceScale } from 'react-icons/fa'

export interface Navigation {
  name: String
  icon: React.ReactNode
  link: string
}

export const navigation: Navigation[] = [
  {
    name: 'Chart of Accounts',
    icon: <BsBarChartLine className="w-5 h-5" />,
    link: '/chart-of-accounts',
  },
  {
    name: 'Journal Entries',
    icon: <BsJournalBookmark className="w-5 h-5" />,
    link: '/journal-entries',
  },
  {
    name: 'Adjusting Entries',
    icon: <FaBalanceScale className="w-5 h-5" />,
    link: '/adjusting-entries',
  },
  {
    name: 'Buku Besar',
    icon: <IoBookOutline className="w-5 h-5" />,
    link: '/buku-besar',
  },
  {
    name: 'Trial Balance',
    icon: <MdOutlineAccountBalance className="w-5 h-5" />,
    link: '/trial-balance',
  },
]
