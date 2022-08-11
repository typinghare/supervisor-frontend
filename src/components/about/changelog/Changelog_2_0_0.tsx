import { FunctionComponent } from 'react';
import { ChangelogSection } from '../Changelog';

export const Changelog_2_0_0: FunctionComponent = () => {
  return <ChangelogSection version='v2.0.0' publishDate='03/18/2022'>
    <ul>
      <li>Refactoring code by <b>ReactJS</b>, <b>Material UI</b>, and <b>NestJS</b>.</li>
      <li>Re-optimize front-end styles.</li>
      <li>Data are no longer stored in JSON files and are put into a database.</li>
      <li>Better responsive design for devices of all scales.</li>
      <li>
        No more operations through commands on Console.
        Now use a series of forms to control and monitor tasks.
      </li>
      <li>Now a task can be removed.</li>
      <li>
        Every <i>category</i> has an expected duration, and the progress bar will reach 100% when duration
        beyonds its expectation.
      </li>
    </ul>
  </ChangelogSection>;
};