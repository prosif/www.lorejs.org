import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        set
      </h1>
      <p>
        This ...
      </p>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      // Update a collection by \`set\`-ing a new list of models, adding new ones,
      // removing models that are no longer present, and merging models that
      // already exist in the collection, as necessary. Similar to **Model#set**,
      // the core operation for updating the data contained by the collection.
      set: function(models, options) {
        if (models == null) return;

        options = options || {};

        // parse the models
        models = this.parse(models, options) || [];

        if (!_.isArray(models)) {
          console.error('Expected models to be an array but got ', models, '. Did you forget to override parse to extract the models?');
        }

        const singular = !_.isArray(models);
        models = singular ? [models] : models.slice();

        // Turn bare objects into model references, and prevent invalid models
        // from being added.
        let model;
        let i;
        for (i = 0; i < models.length; i++) {
          model = models[i];

          // convert attributes to models, which will each be parsed during
          // the creation process
          model = this._prepareModel(model, options);

          models[i] = model;
        }

        // save the models in the collection
        this.models.length = 0;
        splice(this.models, models, 0);
        this.length = this.models.length;

        // Return the added model (or models).
        return singular ? models[0] : models;
      },
      `}/>
    </Template>
  );
};
