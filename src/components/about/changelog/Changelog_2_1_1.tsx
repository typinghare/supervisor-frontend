import { FunctionComponent } from 'react';
import { ChangelogSection } from '../Changelog';

export const Changelog_2_1_1: FunctionComponent = () => {
  return <ChangelogSection version='v2.1.1' publishDate='08/14/2022'>
    <ul>
      <li>Now after a task is created, either the dashboard accordion or the switch task accordion opens.</li>
      <li>Pie chart is added to the graph section.</li>
      <li>Fix a bug that time wrongly displays in task card expanded content.</li>
      <li>Fix a bug that task is created when the category has not been selected.</li>
    </ul>
  </ChangelogSection>;
};