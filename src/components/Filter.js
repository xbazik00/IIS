import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { map } from "lodash";
import { FormControl, Button, Glyphicon } from "react-bootstrap";

import { setFilter } from "../actions/appActions";

const Filter = ({
  history,
  filter,
  selectOptions,
  setFilter,
  handleUpdate
}) => (
  <div className="flex-row flex-center filter">
    {selectOptions && (
      <FormControl
        className="field"
        componentClass="select"
        onChange={e => {
          setFilter({ select: e.target.value });
          if (handleUpdate) handleUpdate();
        }}
        value={filter.select}
      >
        {map(selectOptions, (o, i) => (
          <option key={i} value={o.value}>
            {o.label}
          </option>
        ))}
      </FormControl>
    )}
    <Button
      onClick={() => {
        setFilter({ ascDesc: !filter.ascDesc });
        if (handleUpdate) handleUpdate();
      }}
    >
      <Glyphicon
        glyph={filter.ascDesc ? "sort-by-alphabet" : "sort-by-alphabet-alt"}
      />
    </Button>
    <FormControl
      onChange={e => {
        setFilter({ search: e.target.value });
        if (handleUpdate) handleUpdate();
      }}
      className="field"
      type="text"
      placeholder="Hledej"
      value={filter.search}
    />
  </div>
);

export default compose(
  connect(({ filter }) => ({ filter }), { setFilter }),
  lifecycle({
    componentWillUnmount() {
      const { setFilter } = this.props;

      setFilter({ select: "name", ascDesc: true, search: "" });
    }
  })
)(Filter);
