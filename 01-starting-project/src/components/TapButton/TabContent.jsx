import { useState } from 'react';
import TabButton from './TabButton';
import { EXAMPLES } from '../../data';
import Section from '../Section';
import Tabs from './Tabs';

export default function TabContent() {
  const [selectedTopic, setSelectedTopic] = useState();

  const handleSelect = (selectedButton) => {
    setSelectedTopic(selectedButton);
  }

  return (
    <Section id="examples" title="Examples">
      <Tabs buttons={
        <>
          <TabButton isSelected={selectedTopic === 'components'} onSelect={() => handleSelect('components')}>Components</TabButton>
          <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleSelect('jsx')}>JSX</TabButton>
          <TabButton isSelected={selectedTopic === 'props'} onSelect={() => handleSelect('props')}>Props</TabButton>
          <TabButton isSelected={selectedTopic === 'state'} onSelect={() => handleSelect('state')}>State</TabButton>
        </>
      } buttonsContainer={"menu"}>
        {
          !selectedTopic ? <p>Please select a topic</p> :
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
        }
      </Tabs>
    </Section>
  )
}