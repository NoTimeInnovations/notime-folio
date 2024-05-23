import {blockContent} from './schemaTypes/blockContent'
import studentProject from './schemaTypes/studentProject'
import frequentlyAskedQues from './schemaTypes/frequentlyAskedQues'
import review from './schemaTypes/review'
import subContents from './schemaTypes/subContents'
import youtubeVideo from './schemaTypes/youtubeVideo'
import CourseLevels from './schemaTypes/CourseLevels'
import Pricing from './schemaTypes/Pricing'

export const schema = {
  types: [studentProject, Pricing ,CourseLevels , subContents , youtubeVideo , review , frequentlyAskedQues , blockContent],
}
