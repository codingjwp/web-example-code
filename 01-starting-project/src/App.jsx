import Header from './components/Header/Header';
import TabContent from './components/TapButton/TabContent';
import CoreConcepts from './components/CoreConcept/CoreConcepts';

function App() {

  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <TabContent />
      </main>
    </>
  );
}

export default App;
