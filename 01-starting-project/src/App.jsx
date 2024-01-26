import { useState } from 'react';
import { CORE_CONCEPTS, EXAMPLES } from './data';
import Header from './components/Header/Header';
import TapButton from './components/TapButton/TapButton';
import CoreConcept from './components/CoreConcept/CoreConcept';

function App() {
  const [selectedTopic, setSelectedTopic ] = useState();
  const handleSelect = (selectedButton) => {
    setSelectedTopic(selectedButton);
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => <CoreConcept key={conceptItem.title} {...conceptItem}/>)}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TapButton isSelected={selectedTopic === 'components'} onSelect={() => handleSelect('components')}>Components</TapButton>
            <TapButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleSelect('jsx')}>JSX</TapButton>
            <TapButton isSelected={selectedTopic === 'props'} onSelect={() => handleSelect('props')}>Props</TapButton>
            <TapButton isSelected={selectedTopic === 'state'} onSelect={() => handleSelect('state')}>State</TapButton>
          </menu>
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
        </section>
      </main>
    </div>
  );
}

export default App;
