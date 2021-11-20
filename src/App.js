import './App.css';
import React from 'react';
import ArtifactComponent from './components/ArtifactComponent'
import TableOptionsFactory from './factories/TableOptionsFactory';
import TableColumnFactory from './factories/TableColumnFactory';
import ApiActionColumnFactory from './factories/ApiActionColumnFactory';
import RequestDataFactory from './factories/RequestDataFactory';
import ArtifactRequestDataFactory from './factories/Artifact/ArtifactRequestDataFactory';

function App() {
  const requestDataFactory = new RequestDataFactory();
  const artifactRequestDataFactory = new ArtifactRequestDataFactory(
    "https://localhost:44348/artifact/list",
    "https://localhost:44348/artifact/create",
    "https://localhost:44348/artifact/delete",
    "https://localhost:44348/artifact/edit",
    requestDataFactory);

  return (
    <div className="App">
      <header className="App-header">
        <ArtifactComponent
          optionsFactory={new TableOptionsFactory()}
          columnsFactory={new TableColumnFactory()}
          actionFactory={new ApiActionColumnFactory(artifactRequestDataFactory, "Some products are related with this artifact")}
          requestDataFactory={artifactRequestDataFactory}
          propertyDefinitions={[
            { name: "externalId", width: "10%", hidden: true },
            { name: "name", width: "49%" },
            { name: "tier", width: "1%" },
            { name: "actions", width: "1%" },
            { name: "product", width: "0%", hidden: true }
          ]}
          createFormFields={[
            { id: "name", name: "name", type: "text", placeholder: "Name" },
            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
          ]}
          editFormFields={(item) => {
            return {
              fields: [
                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
              ]
            }
          }}
          deleteRelatedFields={(item) => {
            return {
              properties: [item.product]
            }
          }} />
      </header>
    </div>
  );
}

export default App;
