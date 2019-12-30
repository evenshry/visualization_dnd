import { ItemConfig } from '@/components/ItemPort/entity';
import { uuid } from '@/utils';

export const elementsTypeConfig: Array<Comp.EleType> = [
  {
    id: uuid(),
    type: ItemConfig.BACKGROUND,
    name: '背景框',
  },
  {
    id: uuid(),
    type: ItemConfig.TITLE,
    name: '标题栏',
  },
  {
    id: uuid(),
    type: 'block',
    name: 'Image',
  },
  {
    id: uuid(),
    type: 'block',
    name: 'Slideshow',
  },
  {
    id: uuid(),
    type: 'block',
    name: 'Quote',
  },
];
