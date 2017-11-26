import { isEmpty, sortBy, filter, get } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";

export const getTournaments = () => async (dispatch, getState) => {
    try {
      const response = await fetch("/api/turnaj/read.php");
  
      if (response.status === 200) {
        const content = await response.json();
  
        const filterAll = getState().filter;
  
        const list = !isEmpty(content.items)
          ? sortBy(
              filter(
                content.items,
                c =>
                  get(c, filterAll.select) &&
                  get(c, filterAll.select).indexOf(filterAll.search) !== -1
              ),
              [filterAll.select]
            )
          : content.items;
  
        if (!filterAll.ascDesc) list.reverse();
  
        dispatch({
          type: c.TOURNAMENT,
          payload: { list, count: content.count }
        });
      }
  
      return response.status === 200;
    } catch (err) {
      console.log(err);
      return false;
    }
  };