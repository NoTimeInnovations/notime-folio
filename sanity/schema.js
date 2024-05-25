import {blockContent} from './schemaTypes/blockContent'
import studentProject from './schemaTypes/studentProject'
import frequentlyAskedQues from './schemaTypes/frequentlyAskedQues'
import review from './schemaTypes/review'
import subContents from './schemaTypes/subContents'
import youtubeVideo from './schemaTypes/youtubeVideo'
import CourseLevels from './schemaTypes/CourseLevels'
import Pricing from './schemaTypes/Pricing'
import BestDev from './schemaTypes/BestDev'
import Founder from './schemaTypes/Founder'
import Odometer from './schemaTypes/Odometer'
import Images from './schemaTypes/Images'

export const schema = {
  types: [studentProject, Images , Founder, Odometer , BestDev ,Pricing ,CourseLevels , subContents , youtubeVideo , review , frequentlyAskedQues , blockContent],
}
