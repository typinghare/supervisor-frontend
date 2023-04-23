import { FunctionComponent } from 'react';
import { ChangelogSection } from '../Changelog';

export const Changelog_2_1_1: FunctionComponent = () => {
  return <ChangelogSection version='v2.1.2' publishDate='09/12/2022'>
    <ul>
      <li>Fixed the issue where task cards sometimes didn't display the time properly</li>
    </ul>
  </ChangelogSection>;
};