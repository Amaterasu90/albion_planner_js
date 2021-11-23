import './App.css';
import React from 'react';
import CrudComponent from './components/CrudComponent'
import TableOptionsFactory from './factories/TableOptionsFactory';
import TableColumnFactory from './factories/TableColumnFactory';
import ApiActionColumnFactory from './factories/ApiActionColumnFactory';
import RequestDataFactory from './factories/RequestDataFactory';
import CrudRequestDataFactory from './factories/CrudRequestDataFactory';

function App() {
  const requestDataFactory = new RequestDataFactory();
  const artifactRequestDataFactory = new CrudRequestDataFactory("artifact",
    requestDataFactory);
  const itemTypeRequestDataFactory = new CrudRequestDataFactory("item/type",
    requestDataFactory);
  const journalTypeRequestDataFactory = new CrudRequestDataFactory("journal",
    requestDataFactory);
  const resourceTypeRequestDataFactory = new CrudRequestDataFactory("resource",
    requestDataFactory);

  return (
    <div className="App">
      <header className="App-header">
        <CrudComponent
          optionsFactory={new TableOptionsFactory()}
          columnsFactory={new TableColumnFactory()}
          actionFactory={new ApiActionColumnFactory(artifactRequestDataFactory, "Edit artifact", "Some products are related with this artifact")}
          requestDataFactory={artifactRequestDataFactory}
          propertyDefinitions={[
            { name: "externalId", width: "0%", hidden: true },
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
          }}
          createBtnText="Add artifact"
          createFormatHeaderText="Add new artifact" />

        <CrudComponent
          optionsFactory={new TableOptionsFactory()}
          columnsFactory={new TableColumnFactory()}
          actionFactory={new ApiActionColumnFactory(itemTypeRequestDataFactory, "Edit item type", "Some products or refine product are related with this item type")}
          requestDataFactory={itemTypeRequestDataFactory}
          propertyDefinitions={[
            { name: "externalId", width: "0%", hidden: true },
            { name: "name", width: "49%" },
            { name: "actions", width: "1%" },
            { name: "product", width: "0%", hidden: true },
            { name: "refineProduct", width: "0%", hidden: true }
          ]}
          createFormFields={[
            { id: "name", name: "name", type: "text", placeholder: "Name" }
          ]}
          editFormFields={(item) => {
            return {
              fields: [
                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
              ]
            }
          }}
          deleteRelatedFields={(item) => {
            return {
              properties: [item.product, item.refineProduct]
            }
          }}
          createBtnText="Add item type"
          createFormatHeaderText="Add new item type" />

        <CrudComponent
          optionsFactory={new TableOptionsFactory()}
          columnsFactory={new TableColumnFactory()}
          actionFactory={new ApiActionColumnFactory(journalTypeRequestDataFactory, "Edit item type", "Some products are related with this item type")}
          requestDataFactory={journalTypeRequestDataFactory}
          propertyDefinitions={[
            { name: "externalId", width: "0%", hidden: true },
            { name: "name", width: "49%" },
            { name: "tier", width: "1%" },
            { name: "fameCapacity", width: "5%" },
            { name: "actions", width: "1%" },
            { name: "product", width: "0%", hidden: true }
          ]}
          createFormFields={[
            { id: "name", name: "name", type: "text", placeholder: "Name" },
            { id: "fameCapacity", name: "fameCapacity", type: "range", placeholder: "Fame Capacity", defaultValue: 1200, min: 800, max: 50000, step: 100 },
            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
          ]}
          editFormFields={(item) => {
            return {
              fields: [
                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                { id: "fameCapacity", name: "fameCapacity", type: "range", placeholder: "Fame Capacity", defaultValue: item.fameCapacity, min: 800, max: 50000, step: 100 },
                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
              ]
            }
          }}
          deleteRelatedFields={(item) => {
            return {
              properties: [item.product]
            }
          }}
          createBtnText="Add journal"
          createFormatHeaderText="Add new journal" />

        <CrudComponent
          optionsFactory={new TableOptionsFactory()}
          columnsFactory={new TableColumnFactory()}
          actionFactory={new ApiActionColumnFactory(resourceTypeRequestDataFactory, "Edit item type", "Some product resources are related with this item type")}
          requestDataFactory={resourceTypeRequestDataFactory}
          propertyDefinitions={[
            { name: "externalId", width: "0%", hidden: true },
            { name: "name", width: "49%" },
            { name: "tier", width: "1%" },
            { name: "enhancement", width: "5%" },
            { name: "actions", width: "1%" },
            { name: "productResources", width: "0%", hidden: true }
          ]}
          createFormFields={[
            { id: "name", name: "name", type: "text", placeholder: "Name" },
            { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
            { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: 4, min: 1, max: 8, step: 1 }
          ]}
          editFormFields={(item) => {
            return {
              fields: [
                { id: "name", name: "name", type: "text", placeholder: "Name", defaultValue: item.name },
                { id: "tier", name: "tier", type: "range", placeholder: "Tier", defaultValue: item.tier, min: 1, max: 8, step: 1 },
                { id: "enhancement", name: "enhancement", type: "range", placeholder: "Enhancement", defaultValue: 0, min: 0, max: 3, step: 1 },
                { id: "externalId", name: "externalId", type: "hidden", placeholder: "externalId", defaultValue: item.externalId }
              ]
            }
          }}
          deleteRelatedFields={(item) => {
            return {
              properties: [item.productResources]
            }
          }}
          createBtnText="Add resource"
          createFormatHeaderText="Add new resource" />
      </header >
    </div >
  );
}

export default App;
