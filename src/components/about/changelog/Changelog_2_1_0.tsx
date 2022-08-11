import { FunctionComponent } from 'react';
import { ChangelogSection } from '../Changelog';

export const Changelog_2_1_0: FunctionComponent = () => {
  return <ChangelogSection version='v2.1.0' publishDate='08/11/2022'>
    <ul>
      <li>Database has been redesigned.</li>
      <li>Employ <b>Nginx</b> as reverse proxy.</li>
      <li>User system has been added to Supervisor.</li>
      <li>Refactor frontend with <b>Redux</b>.</li>
      <li>Employ <b>React Router</b> to manage pages.</li>
      <li>A more modern and beautiful navigation.</li>
      <li>Now users can easily switch tasks at the console.</li>
      <li>Employ <b>Recharts</b> to manufacture some data charts.</li>
    </ul>
  </ChangelogSection>;
};